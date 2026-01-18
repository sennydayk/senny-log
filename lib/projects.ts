export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  url: string;
  github?: string;
  tags: string[];
  year: number;
  emoji: string;
  thumbnail?: string;
  features: string[];
  techStack: {
    category: string;
    items: string[];
  }[];
}

export const projects: Project[] = [
  {
    slug: "dev-fortune-2026",
    title: "Dev Fortune 2026",
    description: "GitHub 데이터와 개발 성향을 분석해 개발자를 위한 신년 운세를 알려주는 서비스",
    longDescription: `Dev Fortune 2026은 개발자들을 위한 재미있는 신년 운세 서비스입니다. 
    
GitHub OAuth를 통해 로그인하면, 사용자의 GitHub 프로필과 활동 데이터를 분석합니다. 
3개의 간단한 질문에 답하면 16종의 개발자 유형 중 하나로 분류되고, Claude AI가 맞춤형 신년 운세를 작성해줍니다.

우주 테마의 다크 모드 디자인으로, 별이 반짝이는 배경과 귀여운 캐릭터들이 특징입니다.`,
    url: "https://dev-fortune.vercel.app",
    tags: ["Next.js", "GitHub OAuth", "Claude AI", "Vercel"],
    year: 2026,
    emoji: "🔮",
    features: [
      "GitHub OAuth 소셜 로그인",
      "3개 질문으로 1분 완료",
      "16종 개발자 유형 분류",
      "Claude AI 맞춤 운세 작성",
      "결과 공유 기능",
      "우주 테마 인터랙티브 UI",
    ],
    techStack: [
      {
        category: "Frontend",
        items: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion"],
      },
      {
        category: "Backend",
        items: ["Next.js API Routes", "NextAuth.js"],
      },
      {
        category: "AI",
        items: ["Claude API (Anthropic)"],
      },
      {
        category: "Deploy",
        items: ["Vercel"],
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjects(): Project[] {
  return projects;
}
