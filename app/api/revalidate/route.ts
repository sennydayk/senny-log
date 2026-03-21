import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const NOTION_POSTS_TAG = "notion-posts";

function getUnauthorizedResponse() {
  return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
}

function revalidateFromRequest(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const slug = request.nextUrl.searchParams.get("slug");

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return getUnauthorizedResponse();
  }

  revalidateTag(NOTION_POSTS_TAG);

  if (slug) {
    revalidateTag(`notion-post:${slug}`);
  }

  return NextResponse.json({
    revalidated: true,
    slug: slug ?? null,
    tag: NOTION_POSTS_TAG,
  });
}

export async function GET(request: NextRequest) {
  return revalidateFromRequest(request);
}

export async function POST(request: NextRequest) {
  return revalidateFromRequest(request);
}
