import Link from "next/link";

import { createSubmissionAction } from "@/app/diagnose/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DiagnosePage({
  searchParams
}: {
  searchParams: { error?: string };
}) {
  return (
    <div className="container py-10 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">무료 AI 진단</h1>
          <p className="text-sm text-muted-foreground">
            영상 제출 → AI 진단 리포트(댄스 병원: 진단/처방) → 코치 피드백으로 이어집니다.
          </p>
        </div>
        <Badge variant="outline">AI Freemium</Badge>
      </div>

      {searchParams?.error ? (
        <Card className="border-destructive/40">
          <CardHeader>
            <CardTitle className="text-base">입력 확인</CardTitle>
            <CardDescription className="text-destructive">{searchParams.error}</CardDescription>
          </CardHeader>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>영상 제출</CardTitle>
          <CardDescription>파일 업로드 또는 URL 입력 중 하나만 해도 됩니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createSubmissionAction} className="space-y-5">
            <div className="grid gap-2">
              <Label htmlFor="videoFile">영상 파일</Label>
              <Input id="videoFile" name="videoFile" type="file" accept="video/*" />
              <div className="text-xs text-muted-foreground">
                데모에서는 파일을 저장하지 않고 파일명만 기록합니다.
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="videoUrl">영상 URL</Label>
              <Input
                id="videoUrl"
                name="videoUrl"
                type="url"
                placeholder="예: https://..."
                autoComplete="off"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <Button type="submit">제출하고 AI 진단 받기</Button>
              <Button asChild type="button" variant="outline">
                <Link href="/">랜딩으로</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


