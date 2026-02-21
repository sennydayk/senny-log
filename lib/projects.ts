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
  {
    slug: "senny-log",
    title: "Senny Log",
    description: "Notion API 기반 개인 기술 블로그 및 포트폴리오 사이트",
    longDescription: `Notion을 CMS로 활용한 개인 기술 블로그입니다.
    
Notion API를 통해 글을 가져오고, Next.js의 ISR로 빌드 타임에 정적 페이지를 생성합니다.
다크/라이트 테마 지원과 반응형 디자인으로 모든 디바이스에서 쾌적하게 읽을 수 있습니다.`,
    url: "https://senny-log.vercel.app",
    github: "https://github.com/senny/senny-log",
    tags: ["Next.js", "Notion API", "Tailwind CSS", "TypeScript"],
    year: 2025,
    emoji: "📝",
    features: [
      "Notion CMS 연동",
      "ISR 정적 페이지 생성",
      "다크/라이트 테마",
      "반응형 디자인",
      "SEO 최적화",
      "Markdown 렌더링",
    ],
    techStack: [
      {
        category: "Frontend",
        items: ["Next.js 15", "TypeScript", "Tailwind CSS"],
      },
      {
        category: "CMS",
        items: ["Notion API", "notion-to-md"],
      },
      {
        category: "Deploy",
        items: ["Vercel"],
      },
    ],
  },
  {
    slug: "component-kit",
    title: "Component Kit",
    description: "재사용 가능한 React UI 컴포넌트 라이브러리 및 디자인 시스템",
    longDescription: `프로젝트 간 일관된 UI를 위해 만든 개인 컴포넌트 라이브러리입니다.

Storybook으로 문서화하고, Chromatic으로 비주얼 테스트를 진행합니다.
Radix UI 기반의 접근성 높은 컴포넌트와 Tailwind CSS로 스타일링합니다.`,
    url: "https://component-kit.vercel.app",
    github: "https://github.com/senny/component-kit",
    tags: ["React", "Storybook", "Radix UI", "Tailwind CSS"],
    year: 2025,
    emoji: "🧩",
    features: [
      "Storybook 문서화",
      "Chromatic 비주얼 테스트",
      "접근성 (WAI-ARIA) 준수",
      "다크/라이트 테마",
      "Tree-shaking 지원",
      "TypeScript strict mode",
    ],
    techStack: [
      {
        category: "Frontend",
        items: ["React 18", "TypeScript", "Tailwind CSS", "Radix UI"],
      },
      {
        category: "Tooling",
        items: ["Storybook", "Chromatic", "tsup"],
      },
      {
        category: "Testing",
        items: ["Vitest", "Testing Library"],
      },
    ],
  },
  {
    slug: "focus-timer",
    title: "Focus Timer",
    description: "뽀모도로 기법 기반의 집중 타이머 웹앱으로 통계와 알림 기능 제공",
    longDescription: `뽀모도로 기법을 활용한 집중 타이머 웹 애플리케이션입니다.

25분 집중 / 5분 휴식 사이클을 관리하고, 일별·주별 집중 통계를 시각화합니다.
브라우저 알림과 사운드로 타이머 종료를 알려줍니다.`,
    url: "https://focus-timer-app.vercel.app",
    tags: ["React", "TypeScript", "Chart.js", "PWA"],
    year: 2024,
    emoji: "⏱️",
    features: [
      "뽀모도로 타이머",
      "집중 통계 시각화",
      "브라우저 알림",
      "사운드 알림",
      "PWA 오프라인 지원",
      "로컬 스토리지 데이터 저장",
    ],
    techStack: [
      {
        category: "Frontend",
        items: ["React", "TypeScript", "Tailwind CSS"],
      },
      {
        category: "Visualization",
        items: ["Chart.js", "react-chartjs-2"],
      },
      {
        category: "Deploy",
        items: ["Vercel", "PWA"],
      },
    ],
  },
  {
    slug: "git-dash",
    title: "Git Dash",
    description: "GitHub 활동을 시각적으로 분석하는 개인 대시보드 서비스",
    longDescription: `GitHub 활동 데이터를 한눈에 볼 수 있는 개인 대시보드입니다.

커밋 히트맵, 언어별 통계, 리포지토리 트렌드 등을 시각화합니다.
GitHub API를 활용하여 실시간 데이터를 제공합니다.`,
    url: "https://git-dash.vercel.app",
    github: "https://github.com/senny/git-dash",
    tags: ["Next.js", "GitHub API", "Recharts", "TypeScript"],
    year: 2024,
    emoji: "📊",
    features: [
      "커밋 히트맵",
      "언어별 사용 통계",
      "리포지토리 트렌드",
      "활동 요약 카드",
      "GitHub OAuth 로그인",
      "반응형 대시보드",
    ],
    techStack: [
      {
        category: "Frontend",
        items: ["Next.js 14", "TypeScript", "Tailwind CSS"],
      },
      {
        category: "Visualization",
        items: ["Recharts", "D3.js"],
      },
      {
        category: "API",
        items: ["GitHub REST API", "GitHub GraphQL API"],
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
