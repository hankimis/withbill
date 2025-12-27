import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CoachesClient } from "@/app/coaches/CoachesClient";
import { getSeedCoaches } from "@/lib/seed";

export default function CoachesPage({
  searchParams
}: {
  searchParams: { submissionId?: string };
}) {
  const coaches = getSeedCoaches();
  const submissionId = searchParams?.submissionId;

  return (
    <div className="container py-10 space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">코치 마켓</h1>
          <p className="text-sm text-muted-foreground">
            전문가 팀 플랫폼(“정인철 시간 복제” 컨셉): 원하는 코치를 골라 피드백을 구매합니다.
          </p>
        </div>
        <Badge variant="outline">Human Premium</Badge>
      </div>

      {submissionId ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">현재 제출</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            제출 ID: <span className="font-mono">{submissionId}</span>
          </CardContent>
        </Card>
      ) : null}

      <CoachesClient coaches={coaches} submissionId={submissionId} />
    </div>
  );
}


