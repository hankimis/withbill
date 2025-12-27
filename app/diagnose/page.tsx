import Link from "next/link";
import { UploadCloud, Link as LinkIcon, ArrowLeft, FileVideo, AlertCircle, Activity } from "lucide-react";

import { createSubmissionAction } from "@/app/diagnose/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function DiagnosePage({
  searchParams
}: {
  searchParams: { error?: string };
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-50">
      
      {/* Top Navigation Bar (Minimal) */}
      <div className="container py-6">
        <Button asChild variant="ghost" className="pl-0 hover:bg-transparent hover:text-slate-600">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="font-medium">메인으로 돌아가기</span>
          </Link>
        </Button>
      </div>

      <div className="container py-10 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left: Context & Guide */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-900/20 dark:text-blue-400 px-3 py-1">
                AI Freemium Analysis
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                영상을 업로드하고<br />
                <span className="text-slate-400">정밀 진단을 받으세요.</span>
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                Withbill의 분석 엔진이 4대 핵심 지표(Timing, Accuracy, Angle, Energy)를 기반으로 당신의 움직임을 초단위로 분석합니다.
              </p>
            </div>

            <div className="space-y-6 pt-8 border-t border-slate-200 dark:border-slate-800">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-600 dark:text-slate-400">1</div>
                <div>
                  <h3 className="font-semibold text-lg">영상 준비</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">MP4, MOV 포맷의 댄스 영상을 준비하거나 YouTube 링크를 복사하세요.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-600 dark:text-slate-400">2</div>
                <div>
                  <h3 className="font-semibold text-lg">자동 분석</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">업로드 즉시 AI가 분석을 시작하며, 약 10초 내로 리포트가 생성됩니다.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-600 dark:text-slate-400">3</div>
                <div>
                  <h3 className="font-semibold text-lg">처방 및 코칭</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">분석 결과에 따른 연습 루틴을 확인하고, 필요 시 마스터 코칭을 신청하세요.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Upload Card */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-bl from-blue-100 to-transparent dark:from-blue-900/20 rounded-[2rem] -z-10 blur-2xl opacity-50" />
            
            <Card className="border-0 shadow-2xl bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800">
              <CardContent className="p-8 lg:p-10 space-y-8">
                
                {searchParams?.error && (
                  <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 flex items-start gap-3 text-red-600 dark:text-red-400">
                    <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <p className="text-sm font-medium">{searchParams.error}</p>
                  </div>
                )}

                <form action={createSubmissionAction} className="space-y-8">
                  
                  {/* File Upload Area */}
                  <div className="space-y-4">
                    <Label htmlFor="videoFile" className="text-base font-semibold">영상 파일 업로드</Label>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-blue-50 dark:bg-blue-900/10 rounded-xl border-2 border-dashed border-blue-200 dark:border-blue-800 group-hover:border-blue-400 transition-colors" />
                      <div className="relative p-8 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer">
                        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          <UploadCloud className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-700 dark:text-slate-200">클릭하여 파일 선택</p>
                          <p className="text-sm text-slate-400 mt-1">MP4, MOV up to 100MB</p>
                        </div>
                        <Input 
                          id="videoFile" 
                          name="videoFile" 
                          type="file" 
                          accept="video/*" 
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-slate-200 dark:border-slate-800" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white dark:bg-slate-900 px-2 text-slate-400">Or</span>
                    </div>
                  </div>

                  {/* URL Input */}
                  <div className="space-y-4">
                    <Label htmlFor="videoUrl" className="text-base font-semibold">영상 URL 입력</Label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                      <Input
                        id="videoUrl"
                        name="videoUrl"
                        type="url"
                        placeholder="https://youtube.com/..."
                        className="pl-10 h-12 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 focus:ring-blue-500"
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-200 dark:shadow-none transition-transform hover:scale-[1.02]">
                    <Activity className="mr-2 h-5 w-5" />
                    무료 AI 진단 시작하기
                  </Button>
                  
                  <p className="text-xs text-center text-slate-400">
                    데모 버전에서는 파일을 실제로 저장하지 않고 시뮬레이션 처리됩니다.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
