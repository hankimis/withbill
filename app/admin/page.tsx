import Link from "next/link";

import { markFeedbackDoneAction } from "@/app/admin/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { listOrders, listSubmissions } from "@/lib/db";
import { formatKRW } from "@/lib/format";
import { getSeedCoaches } from "@/lib/seed";

export default async function AdminPage({
  searchParams
}: {
  searchParams: { error?: string; ok?: string };
}) {
  const [submissions, orders] = await Promise.all([listSubmissions(), listOrders()]);
  const coaches = getSeedCoaches();

  return (
    <div className="container py-10 space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Admin (상태 파이프라인)</h1>
          <p className="text-sm text-muted-foreground">
            submissions/orders 목록과 상태(접수/분석완료/결제완료/피드백완료)를 확인합니다.
          </p>
        </div>
        <Badge variant="outline">Local JSON DB</Badge>
      </div>

      {searchParams?.error ? (
        <Card className="border-destructive/40">
          <CardHeader>
            <CardTitle className="text-base">오류</CardTitle>
            <CardDescription className="text-destructive">{searchParams.error}</CardDescription>
          </CardHeader>
        </Card>
      ) : null}
      {searchParams?.ok ? (
        <Card className="border-primary/30">
          <CardHeader>
            <CardTitle className="text-base">완료</CardTitle>
            <CardDescription>{searchParams.ok}</CardDescription>
          </CardHeader>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Submissions</CardTitle>
          <CardDescription>영상 제출 및 분석/결제/피드백 상태</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {submissions.length === 0 ? (
            <div className="text-sm text-muted-foreground">
              아직 제출이 없습니다. <Link className="underline" href="/diagnose">/diagnose</Link>에서 제출을 생성하세요.
            </div>
          ) : (
            <div className="space-y-2">
              {submissions.map((s) => (
                <div key={s.id} className="flex flex-col gap-1 rounded-lg border p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm">
                      <span className="font-mono">{s.id}</span>
                      <span className="text-muted-foreground"> · {s.createdAtISO}</span>
                    </div>
                    <Badge variant={s.status === "피드백완료" ? "default" : "secondary"}>{s.status}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    소스:{" "}
                    {s.source.type === "file"
                      ? `파일(${s.source.fileName})`
                      : `URL(${s.source.url})`}
                    {s.selectedCoachId ? ` · coach=${s.selectedCoachId}` : ""}
                    {s.orderId ? ` · order=${s.orderId}` : ""}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/report/${s.id}`}>리포트 보기</Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/coaches?submissionId=${s.id}`}>코치 선택</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>결제 성공(모킹)으로 생성된 주문</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {orders.length === 0 ? (
            <div className="text-sm text-muted-foreground">아직 주문이 없습니다. /checkout에서 결제 성공(모킹)을 눌러보세요.</div>
          ) : (
            orders.map((o) => {
              const coach = coaches.find((c) => c.id === o.coachId);
              return (
                <div key={o.id} className="rounded-lg border p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm">
                      <span className="font-mono">{o.id}</span>
                      <span className="text-muted-foreground"> · {o.createdAtISO}</span>
                    </div>
                    <Badge>{o.payment.status}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    submission=<span className="font-mono">{o.submissionId}</span> · coach=
                    <span className="font-mono">{o.coachId}</span>
                    {coach ? `(${coach.displayName})` : ""}
                  </div>
                  <div className="text-sm mt-2">
                    금액: <span className="font-medium">{formatKRW(o.amountKRW)}</span>{" "}
                    <span className="text-muted-foreground">
                      (학원 {formatKRW(o.revenueShare.academyAmountKRW)} / 강사 {formatKRW(o.revenueShare.instructorAmountKRW)} · {o.revenueShare.note})
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>피드백 완료 처리</CardTitle>
          <CardDescription>결제 완료된 제출에 피드백 텍스트/영상URL을 입력하고 “피드백완료”로 변경</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={markFeedbackDoneAction} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="submissionId">제출 ID</Label>
              <Input id="submissionId" name="submissionId" placeholder="예: abc123xyz" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="text">텍스트 피드백(선택)</Label>
              <Input id="text" name="text" placeholder="예: 타이밍은 8카운트 루프부터..." />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="videoUrl">피드백 영상 URL(선택)</Label>
              <Input id="videoUrl" name="videoUrl" placeholder="예: https://..." />
            </div>
            <div className="flex flex-wrap gap-3">
              <Button type="submit">피드백 완료 처리</Button>
              <Button asChild variant="outline" type="button">
                <Link href="/">랜딩</Link>
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          상태 흐름: 접수 → 분석완료 → 결제완료 → 피드백완료
        </CardFooter>
      </Card>
    </div>
  );
}


