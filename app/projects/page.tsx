import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap } from "lucide-react";

export default function ProjectsPage() {
  return (
    <div className="min-h-full p-4 md:p-8 flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" className="h-10 w-10 p-0 rounded-full border-2 border-border hover:bg-secondary/20">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-black text-foreground">PROJECTS</h1>
        </div>
      </div>

      {/* Content */}
      <Card className="border-2 border-border rounded-2xl overflow-hidden bg-white shadow-[4px_4px_0px_#D4B2FF]">
        <CardHeader className="bg-[#FFF0F5] border-b-2 border-border p-4">
          <span className="font-display font-bold text-sm tracking-wide">🚀 My Works</span>
        </CardHeader>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground text-lg">
            프로젝트 목록이 곧 업데이트될 예정입니다.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}


