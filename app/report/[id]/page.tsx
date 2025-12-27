import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Activity, AlertTriangle, CheckCircle, ChevronRight, PlayCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getSubmission } from "@/lib/db";
import { getSeedCoaches, getSeedProducts } from "@/lib/seed";
import { formatKRW } from "@/lib/format";

export default async function ReportPage({ params }: { params: { id: string } }) {
  const submission = await getSubmission(params.id);
  if (!submission) return notFound();

  const coaches = getSeedCoaches();
  const products = getSeedProducts();
  const coach = submission.selectedCoachId
    ? coaches.find((c) => c.id === submission.selectedCoachId)
    : undefined;

  const report = submission.report;

  return (
    <div className="container py-10 space-y-8">
      {/* Header with Visual */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl">
        <div className="absolute inset-0 opacity-40">
           <Image 
             src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
             alt="Analysis Background"
             fill
             sizes="100vw"
             className="object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        </div>
        
        <div className="relative p-8 md:p-12 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
             <Badge variant={submission.status === "결제완료" || submission.status === "피드백완료" ? "default" : "secondary"} className="text-sm px-3 py-1">
              {submission.status}
            </Badge>
            <div className="text-slate-300 text-sm font-mono opacity-80">ID: {submission.id}</div>
          </div>
          
          <div className="space-y-2 max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">AI 진단 리포트</h1>
            <p className="text-slate-300 text-lg">
              제출하신 영상의 4대 핵심 지표 분석과<br className="hidden sm:block" /> 
              댄스 병원(진단/처방) 솔루션 결과입니다.
            </p>
          </div>

          <div className="pt-4 flex items-center gap-2 text-sm text-slate-400">
             <PlayCircle className="h-4 w-4" />
             <span>
                소스: {submission.source.type === "file" ? submission.source.fileName : submission.source.url}
             </span>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column: Scores */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="h-full border-none shadow-md ring-1 ring-slate-200 dark:ring-slate-800">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                4대 지표 분석
              </CardTitle>
              <CardDescription>Timing / Accuracy / Angle / Energy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {report ? (
                <>
                  <ScoreRow label="Timing" value={report.scores.timing} />
                  <ScoreRow label="Accuracy" value={report.scores.accuracy} />
                  <ScoreRow label="Angle" value={report.scores.angle} />
                  <ScoreRow label="Energy" value={report.scores.energy} />
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">종합 점수</span>
                        <span className="text-2xl font-bold text-primary">
                            {Math.round((report.scores.timing + report.scores.accuracy + report.scores.angle + report.scores.energy) / 4)}
                        </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-sm text-muted-foreground">리포트가 아직 없습니다.</div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Issues & Prescription */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-md ring-1 ring-slate-200 dark:ring-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                핵심 이슈 & 처방
              </CardTitle>
              <CardDescription>우선순위가 높은 3가지 개선점을 도출했습니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {report?.issues?.map((it, idx) => (
                <div key={idx} className="group rounded-xl border p-5 hover:bg-muted/30 transition-colors">
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold text-sm">
                        {idx + 1}
                    </div>
                    <div>
                        <div className="font-semibold text-lg mb-1">{it.title}</div>
                        <div className="text-muted-foreground leading-relaxed">{it.detail}</div>
                    </div>
                  </div>
                </div>
              ))}
              
              {report ? (
                <div className="mt-8 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 p-6 border border-blue-100 dark:border-blue-900">
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" /> 
                    Next Drills (연습 처방)
                  </h3>
                  <div className="text-blue-800/80 dark:text-blue-200/80 mb-4 text-sm leading-relaxed">
                    {report.summary}
                  </div>
                  <ul className="space-y-2">
                    {report.nextDrills.map((d, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </CardContent>
            <CardFooter className="flex flex-wrap gap-3 pt-2 pb-6">
              {submission.status === "결제완료" || submission.status === "피드백완료" ? (
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href={`/report/${submission.id}#feedback`}>피드백 보기</Link>
                </Button>
              ) : (
                <Button asChild size="lg" className="w-full sm:w-auto shadow-lg shadow-primary/20">
                  <Link href={`/coaches?submissionId=${submission.id}`}>
                    코치 피드백 받기 <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href="/diagnose">다시 진단하기</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card id="feedback" className={`transition-all duration-500 ${submission.status === "결제완료" || submission.status === "피드백완료" ? "ring-2 ring-primary/20 shadow-lg" : "opacity-80 grayscale"}`}>
            <CardHeader>
              <CardTitle>코치 피드백</CardTitle>
              <CardDescription>
                {submission.status === "결제완료" || submission.status === "피드백완료" 
                    ? "마스터 코치의 정밀 분석 결과입니다." 
                    : `결제 완료 후 활성화됩니다. (일반 ${formatKRW(products.coachFeedback.priceKRW)} · 마스터 검수 ${formatKRW(products.masterReviewUpgrade.priceKRW)})`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg border bg-muted/20">
                <div className="h-12 w-12 rounded-full bg-slate-200 overflow-hidden relative">
                    {/* Placeholder Avatar */}
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-bold">
                        {coach ? coach.displayName.substring(0,1) : "?"}
                    </div>
                </div>
                <div>
                    <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Selected Coach</div>
                    <div className="font-medium">{coach ? coach.displayName : "미선택"}</div>
                </div>
              </div>

              {submission.status === "결제완료" || submission.status === "피드백완료" ? (
                submission.feedback?.text || submission.feedback?.videoUrl ? (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {submission.feedback?.text ? (
                      <div className="rounded-xl border p-6 bg-background">
                        <div className="text-sm font-medium mb-2 text-primary">텍스트 피드백</div>
                        <div className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                          {submission.feedback.text}
                        </div>
                      </div>
                    ) : null}
                    {submission.feedback?.videoUrl ? (
                      <div className="rounded-xl border p-6 bg-background">
                        <div className="text-sm font-medium mb-2 text-primary">피드백 영상</div>
                        <div className="aspect-video rounded-lg bg-black/5 flex items-center justify-center border border-dashed border-slate-300">
                             <a href={submission.feedback.videoUrl} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 text-primary hover:underline">
                                <PlayCircle className="h-8 w-8" />
                                <span className="text-sm">{submission.feedback.videoUrl}</span>
                             </a>
                        </div>
                      </div>
                    ) : null}
                    <div className="text-xs text-muted-foreground text-right">
                      업데이트: {submission.feedback?.updatedAtISO}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed p-8 text-center space-y-2">
                    <Activity className="h-8 w-8 text-muted-foreground mx-auto" />
                    <div className="font-medium">피드백 작성 중</div>
                    <div className="text-sm text-muted-foreground">
                      결제가 완료되었습니다. 코치가 영상을 분석하고 있습니다.<br />
                      (데모: Admin에서 ‘피드백 완료’ 처리 시 표시됨)
                    </div>
                  </div>
                )
              ) : (
                <div className="rounded-xl bg-muted/30 p-8 text-center text-sm text-muted-foreground">
                  🔒 결제가 필요합니다.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ScoreRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <div className="font-medium">{label}</div>
        <div className="text-primary font-bold">{value}</div>
      </div>
      <Progress value={value} className="h-2" />
    </div>
  );
}
