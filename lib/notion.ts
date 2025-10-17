import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import type { BlogPost } from "./posts";

// 메타데이터만 포함하는 타입 (content 제외)
export type BlogPostMetadata = Omit<BlogPost, "content"> & {
  pageId?: string; // 노션 페이지 ID (slug 조회용)
};

// In-Memory 캐시
const cache = {
  metadata: null as BlogPostMetadata[] | null,
  fullPosts: new Map<string, BlogPost>(),
  lastFetch: 0,
  CACHE_DURATION: 5 * 60 * 1000, // 5분
};

function getNotionClient() {
  const apiKey = process.env.NOTION_API_KEY;
  if (!apiKey) {
    throw new Error("NOTION_API_KEY가 설정되지 않았습니다.");
  }
  return new Client({ auth: apiKey });
}

type NotionDatabaseProperty = {
  id: string;
  type: string;
  title?: Array<{ plain_text: string }>;
  rich_text?: Array<{ plain_text: string }>;
  date?: { start: string };
  select?: { name: string };
  multi_select?: Array<{ name: string }>;
  files?: Array<{ file?: { url: string }; external?: { url: string } }>;
};

type NotionPage = {
  id: string;
  properties: Record<string, NotionDatabaseProperty>;
  cover?: {
    file?: { url: string };
    external?: { url: string };
  };
};

/**
 * 노션 데이터베이스에서 메타데이터만 가져오기 (content 제외)
 * 목록 페이지 등에서 사용
 */
export async function getNotionPostsMetadata(): Promise<BlogPostMetadata[]> {
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!apiKey || !databaseId) {
    return [];
  }

  // 캐시 확인
  const now = Date.now();
  if (cache.metadata && now - cache.lastFetch < cache.CACHE_DURATION) {
    return cache.metadata;
  }

  try {
    const notion = getNotionClient();

    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const posts = response.results.map((page: any) =>
      notionPageToMetadata(page as NotionPage)
    );

    const validPosts = posts.filter(
      (post: BlogPostMetadata | null): post is BlogPostMetadata => post !== null
    );

    // 캐시 업데이트
    cache.metadata = validPosts;
    cache.lastFetch = now;

    return validPosts;
  } catch (error: any) {
    if (
      error?.code === "validation_error" &&
      error?.message?.includes("is a page, not a database")
    ) {
      console.error(
        "\n❌ 오류: 제공된 ID는 페이지 ID입니다. 데이터베이스 ID를 입력해주세요."
      );
      console.error("💡 데이터베이스 뷰 URL에서 32자리 ID를 복사하세요.");
      console.error("   예: https://notion.so/DATABASE_ID?v=...\n");
    } else {
      console.error("노션 포스트 메타데이터 가져오기 실패:", error);
    }
    return [];
  }
}

/**
 * 노션 데이터베이스에서 모든 포스트 가져오기 (하위 호환성을 위해 유지)
 * @deprecated getNotionPostsMetadata()와 getNotionPostBySlug()를 사용하세요
 */
export async function getNotionPosts(): Promise<BlogPost[]> {
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!apiKey || !databaseId) {
    return [];
  }

  try {
    const notion = getNotionClient();
    const n2m = new NotionToMarkdown({ notionClient: notion });

    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const posts = await Promise.all(
      response.results.map((page: any) =>
        notionPageToBlogPost(page as NotionPage, n2m)
      )
    );

    return posts.filter(
      (post: BlogPost | null): post is BlogPost => post !== null
    );
  } catch (error: any) {
    if (
      error?.code === "validation_error" &&
      error?.message?.includes("is a page, not a database")
    ) {
      console.error(
        "\n❌ 오류: 제공된 ID는 페이지 ID입니다. 데이터베이스 ID를 입력해주세요."
      );
      console.error("💡 데이터베이스 뷰 URL에서 32자리 ID를 복사하세요.");
      console.error("   예: https://notion.so/DATABASE_ID?v=...\n");
    } else {
      console.error("노션 포스트 가져오기 실패:", error);
    }
    return [];
  }
}

/**
 * 특정 slug로 포스트 가져오기 (캐싱 포함)
 */
export async function getNotionPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!apiKey || !databaseId) {
    return null;
  }

  // 캐시에서 먼저 확인
  if (cache.fullPosts.has(slug)) {
    return cache.fullPosts.get(slug)!;
  }

  try {
    // 메타데이터에서 해당 slug의 페이지 ID 찾기
    const metadata = await getNotionPostsMetadata();
    const postMeta = metadata.find((p) => p.slug === slug);

    if (!postMeta || !postMeta.pageId) {
      return null;
    }

    // 해당 포스트만 전체 콘텐츠로 변환
    const notion = getNotionClient();
    const n2m = new NotionToMarkdown({ notionClient: notion });

    const page = await notion.pages.retrieve({ page_id: postMeta.pageId });
    const fullPost = await notionPageToBlogPost(page as any as NotionPage, n2m);

    if (fullPost) {
      // 캐시에 저장
      cache.fullPosts.set(slug, fullPost);
    }

    return fullPost;
  } catch (error) {
    console.error(`포스트 가져오기 실패 (slug: ${slug}):`, error);
    return null;
  }
}

/**
 * 노션 페이지를 메타데이터만 추출 (content 제외)
 */
function notionPageToMetadata(page: NotionPage): BlogPostMetadata | null {
  try {
    const props = page.properties;

    // 제목
    const titleProperty = props.Title || props.title || props.이름;
    const title =
      titleProperty?.type === "title" && titleProperty.title?.[0]
        ? titleProperty.title[0].plain_text
        : "제목 없음";

    // Slug (URL용)
    const slugProperty = props.Slug || props.slug;
    let slug =
      slugProperty?.type === "rich_text" && slugProperty.rich_text?.[0]
        ? slugProperty.rich_text[0].plain_text
        : page.id; // 한글 제목일 경우 페이지 ID를 slug로 사용

    // 영어/숫자만 있는 경우에만 제목 기반 slug 생성
    if (!slugProperty && /^[a-zA-Z0-9\s-]+$/.test(title)) {
      slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    }

    // 날짜
    const dateProperty = props.Date || props.date || props.날짜;
    const date =
      dateProperty?.type === "date" && dateProperty.date?.start
        ? dateProperty.date.start
        : new Date().toISOString().split("T")[0];

    // 카테고리
    const categoryProperty = props.Category || props.category || props.카테고리;
    const category =
      categoryProperty?.type === "select" && categoryProperty.select?.name
        ? categoryProperty.select.name
        : "Develop";

    // 태그
    const tagsProperty = props.Tags || props.tags || props.태그;
    const tags =
      tagsProperty?.type === "multi_select"
        ? tagsProperty.multi_select?.map((tag) => tag.name) || []
        : [];

    // 요약
    const summaryProperty = props.Summary || props.summary || props.요약;
    const summary =
      summaryProperty?.type === "rich_text" && summaryProperty.rich_text?.[0]
        ? summaryProperty.rich_text[0].plain_text
        : "";

    // 한줄 소개
    const introductionProperty =
      props.Introduction || props.introduction || props.소개;
    const introduction =
      introductionProperty?.type === "rich_text" &&
      introductionProperty.rich_text?.[0]
        ? introductionProperty.rich_text[0].plain_text
        : "";

    // 썸네일 (커버 이미지만 사용, 본문 이미지는 content 변환 없이 불가능)
    const thumbnail =
      page.cover?.file?.url || page.cover?.external?.url || "/placeholder.svg";

    return {
      slug,
      title,
      date,
      category,
      tags,
      summary,
      introduction,
      thumbnail,
      pageId: page.id, // 페이지 ID 저장
    };
  } catch (error) {
    console.error("노션 페이지 메타데이터 추출 실패:", error);
    return null;
  }
}

/**
 * 노션 페이지를 BlogPost 형식으로 변환 (content 포함)
 */
async function notionPageToBlogPost(
  page: NotionPage,
  n2m: NotionToMarkdown
): Promise<BlogPost | null> {
  try {
    const props = page.properties;

    // 제목
    const titleProperty = props.Title || props.title || props.이름;
    const title =
      titleProperty?.type === "title" && titleProperty.title?.[0]
        ? titleProperty.title[0].plain_text
        : "제목 없음";

    // Slug (URL용)
    const slugProperty = props.Slug || props.slug;
    let slug =
      slugProperty?.type === "rich_text" && slugProperty.rich_text?.[0]
        ? slugProperty.rich_text[0].plain_text
        : page.id; // 한글 제목일 경우 페이지 ID를 slug로 사용

    // 영어/숫자만 있는 경우에만 제목 기반 slug 생성
    if (!slugProperty && /^[a-zA-Z0-9\s-]+$/.test(title)) {
      slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    }

    // 날짜
    const dateProperty = props.Date || props.date || props.날짜;
    const date =
      dateProperty?.type === "date" && dateProperty.date?.start
        ? dateProperty.date.start
        : new Date().toISOString().split("T")[0];

    // 카테고리
    const categoryProperty = props.Category || props.category || props.카테고리;
    const category =
      categoryProperty?.type === "select" && categoryProperty.select?.name
        ? categoryProperty.select.name
        : "Develop";

    // 태그
    const tagsProperty = props.Tags || props.tags || props.태그;
    const tags =
      tagsProperty?.type === "multi_select"
        ? tagsProperty.multi_select?.map((tag) => tag.name) || []
        : [];

    // 요약
    const summaryProperty = props.Summary || props.summary || props.요약;
    const summary =
      summaryProperty?.type === "rich_text" && summaryProperty.rich_text?.[0]
        ? summaryProperty.rich_text[0].plain_text
        : "";

    // 한줄 소개
    const introductionProperty =
      props.Introduction || props.introduction || props.소개;
    const introduction =
      introductionProperty?.type === "rich_text" &&
      introductionProperty.rich_text?.[0]
        ? introductionProperty.rich_text[0].plain_text
        : "";

    // 콘텐츠 (마크다운 변환)
    const mdblocks = await n2m.pageToMarkdown(page.id);
    const content = n2m.toMarkdownString(mdblocks).parent;

    // 썸네일 (우선순위: 커버 이미지 > 본문 첫 이미지 > 기본 이미지)
    let thumbnail = page.cover?.file?.url || page.cover?.external?.url || null;

    // 커버 이미지가 없으면 본문에서 첫 번째 이미지 찾기
    if (!thumbnail) {
      const imageMatch = content.match(/!\[.*?\]\((https?:\/\/[^\)]+)\)/);
      thumbnail = imageMatch ? imageMatch[1] : "/placeholder.svg";
    }

    return {
      slug,
      title,
      date,
      category,
      tags,
      summary,
      introduction,
      content,
      thumbnail,
    };
  } catch (error) {
    console.error("노션 페이지 변환 실패:", error);
    return null;
  }
}
