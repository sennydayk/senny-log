// 노션 API 연결 테스트 스크립트
require("dotenv").config({ path: ".env.local" });
const { Client } = require("@notionhq/client");

async function testNotion() {
  console.log("🔍 환경 변수 확인...");
  console.log(
    "NOTION_API_KEY:",
    process.env.NOTION_API_KEY ? "✅ 설정됨" : "❌ 없음"
  );
  console.log(
    "NOTION_DATABASE_ID:",
    process.env.NOTION_DATABASE_ID ? "✅ 설정됨" : "❌ 없음"
  );

  if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
    console.log(
      "\n❌ .env.local 파일에 API 키와 데이터베이스 ID를 설정해주세요."
    );
    return;
  }

  try {
    const notion = new Client({ auth: process.env.NOTION_API_KEY });

    console.log("\n🔍 노션 데이터베이스 조회 중...");
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
    });

    console.log(`✅ 성공! 총 ${response.results.length}개의 페이지 발견`);

    if (response.results.length > 0) {
      console.log("\n📄 페이지 목록:");
      response.results.forEach((page, index) => {
        const title =
          page.properties.Title?.title?.[0]?.plain_text ||
          page.properties.title?.title?.[0]?.plain_text ||
          page.properties.이름?.title?.[0]?.plain_text ||
          "제목 없음";
        const published = page.properties.Published?.checkbox || false;
        console.log(
          `${index + 1}. ${title} ${
            published ? "✅" : "❌ (Published 체크 안됨)"
          }`
        );
      });
    } else {
      console.log("\n⚠️ 데이터베이스에 페이지가 없습니다.");
    }
  } catch (error) {
    console.log("\n❌ 오류 발생:");
    console.log(error.message);

    if (error.code === "unauthorized") {
      console.log("\n💡 해결 방법:");
      console.log("1. API 키가 올바른지 확인");
      console.log("2. 노션 데이터베이스에 Integration 연결 확인");
    } else if (error.code === "object_not_found") {
      console.log("\n💡 해결 방법:");
      console.log("1. 데이터베이스 ID가 올바른지 확인");
      console.log(
        "2. Integration이 해당 데이터베이스에 접근 권한이 있는지 확인"
      );
    }
  }
}

testNotion();
