import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import type { BlogPost } from "./posts";

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
 * 노션 데이터베이스에서 모든 포스트 가져오기
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
 * 특정 slug로 포스트 가져오기
 */
export async function getNotionPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const posts = await getNotionPosts();
  return posts.find((post) => post.slug === slug) || null;
}

/**
 * 노션 페이지를 BlogPost 형식으로 변환
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
