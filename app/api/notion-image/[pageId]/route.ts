import { Client } from "@notionhq/client";
import { NextRequest, NextResponse } from "next/server";

type NotionPageCover = {
  cover?: {
    file?: { url: string };
    external?: { url: string };
  };
};

function getNotionClient() {
  const apiKey = process.env.NOTION_API_KEY;

  if (!apiKey) {
    throw new Error("NOTION_API_KEY가 설정되지 않았습니다.");
  }

  return new Client({ auth: apiKey });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ pageId: string }> }
) {
  try {
    const { pageId } = await params;
    const notion = getNotionClient();
    const page = (await notion.pages.retrieve({
      page_id: pageId,
    })) as NotionPageCover;

    const imageUrl = page.cover?.file?.url || page.cover?.external?.url;

    if (!imageUrl) {
      return NextResponse.redirect(new URL("/placeholder.svg", request.url));
    }

    return NextResponse.redirect(imageUrl, {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    console.error("노션 썸네일 가져오기 실패:", error);
    return NextResponse.redirect(new URL("/placeholder.svg", request.url));
  }
}
