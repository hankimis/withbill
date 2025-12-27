import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Stethoscope, Sparkles, Trophy, Activity, CheckCircle2, PlayCircle, BarChart3, Users, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50 dark:bg-slate-950/50">
      {/* Immersive Hero Section */}
      <section className="relative overflow-hidden w-full min-h-[90vh] flex items-center justify-center bg-black">
        {/* Background Visual */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Hero Background"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        </div>

        <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/10">
            <Sparkles className="mr-2 h-3.5 w-3.5 text-yellow-400" />
            <span className="opacity-90">AI Freemium + Human Premium</span>
          </div>

          <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl">
            내 춤의 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">문제를 진단</span>하고<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">처방까지 확실하게</span>
          </h1>

          <p className="max-w-2xl text-lg text-slate-300 md:text-xl font-light leading-relaxed">
            "댄스 병원" 컨셉의 정밀 AI 분석으로 시작해,<br className="hidden sm:inline" /> 
            SM/YG 트레이너 출신 마스터의 1:1 코칭으로 완성하세요.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
            <Button asChild size="lg" className="h-14 px-8 text-lg rounded-full bg-white text-black hover:bg-slate-200 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-transform hover:scale-105">
              <Link href="/diagnose">
                무료 AI 진단 시작하기 <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-white/20 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10 hover:text-white transition-transform hover:scale-105">
              <Link href="/coaches">
                <Users className="mr-2 h-5 w-5" />
                코치 마켓 둘러보기
              </Link>
            </Button>
          </div>

          {/* Social Proof Strip */}
          <div className="mt-12 w-full max-w-4xl rounded-2xl bg-white/80 backdrop-blur-md p-6 shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "세계 챔피언 노하우", icon: Trophy },
                { label: "실용무용 입시 시스템", icon: CheckCircle2 },
                { label: "SM/YG 트레이너", icon: StarIcon },
                { label: "3분내 진단 리포트", icon: Zap },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 text-slate-900">
                  <item.icon className="h-6 w-6 text-black" />
                  <span className="text-sm font-bold">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modern Bento Grid Features */}
      <section className="container py-24">
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <Badge variant="secondary" className="px-4 py-1.5 text-sm">Features</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl text-slate-900 dark:text-slate-100">과학적 분석, 예술적 코칭</h2>
          <p className="max-w-[800px] text-slate-600 dark:text-slate-400 md:text-lg">
            데이터와 감각의 완벽한 조화. Withbill은 춤을 배우는 가장 스마트한 방법을 제시합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {/* Feature 1: AI Freemium (Large) */}
          <div className="md:col-span-2 row-span-1 rounded-3xl bg-white dark:bg-slate-900 border p-8 flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="relative z-10 space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">AI Freemium Analysis</h3>
                <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-md">
                  영상 업로드 즉시 Timing, Accuracy, Angle, Energy 4대 지표를 분석합니다. 비용 부담 없이 내 춤의 객관적 점수를 확인하세요.
                </p>
              </div>
            </div>
            <div className="absolute right-0 top-10 w-[300px] h-[300px] bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
            <Image
               src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
               alt="AI Analysis"
               width={400}
               height={300}
               className="absolute -right-10 -bottom-10 rounded-tl-3xl shadow-2xl transition-transform duration-500 group-hover:-translate-x-2 group-hover:-translate-y-2 opacity-90 grayscale group-hover:grayscale-0"
            />
          </div>

          {/* Feature 2: Dance Clinic */}
          <div className="md:col-span-1 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border p-8 flex flex-col relative overflow-hidden group hover:shadow-lg transition-all duration-300">
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
             <div className="relative z-10 space-y-4">
               <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                  <Stethoscope className="h-6 w-6" />
               </div>
               <h3 className="text-xl font-bold text-slate-900 dark:text-white">댄스 병원 (진단/처방)</h3>
               <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                 "골반이 안 움직여요"가 아니라 "무게중심 이동 반경이 10cm 부족합니다"라고 진단합니다. 그리고 즉시 교정 루틴을 처방합니다.
               </p>
             </div>
          </div>

          {/* Feature 3: Human Premium */}
          <div className="md:col-span-1 rounded-3xl bg-slate-900 text-white p-8 flex flex-col justify-between relative overflow-hidden group hover:shadow-lg transition-all duration-300">
             <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500" />
             <div className="relative z-10 space-y-4">
               <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-sm">
                  <Trophy className="h-6 w-6" />
               </div>
               <h3 className="text-xl font-bold">Human Premium</h3>
               <p className="text-slate-300 text-sm leading-relaxed">
                 AI가 못 보는 "느낌"과 "표현력". 마스터 코치가 1:1로 정밀하게 다듬어드립니다.
               </p>
             </div>
             <Button variant="secondary" size="sm" className="w-fit mt-4" asChild>
               <Link href="/coaches">코치진 보기 <ArrowRight className="ml-2 h-3 w-3" /></Link>
             </Button>
          </div>

          {/* Feature 4: Roadmap */}
          <div className="md:col-span-2 rounded-3xl bg-white dark:bg-slate-900 border p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
             <div className="relative z-10 space-y-4 max-w-md">
               <div className="flex items-center gap-2 text-muted-foreground font-medium">
                  <Activity className="h-5 w-5" />
                  <span>Scaling Mastery</span>
               </div>
               <h3 className="text-2xl font-bold">성장 로드맵</h3>
               <p className="text-muted-foreground">
                 Project AI-JANVision은 단순 피드백을 넘어, 댄서의 생애주기별 성장을 관리하는 마스터 플랫폼으로 진화합니다.
               </p>
             </div>
             <div className="relative z-10">
                <Badge variant="outline" className="text-base px-4 py-2 border-dashed bg-slate-50">Early Access</Badge>
             </div>
             <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] dark:bg-grid-slate-800/20 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* CEO & Demo Image Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5" />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             
             {/* Left: Demo Image */}
             <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black aspect-video shadow-2xl">
                    <Image
                      src="/images/demo-coaching.jpg"
                      alt="코칭 데모 이미지"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                       <Badge className="bg-blue-600 hover:bg-blue-700 border-none text-white">Demo</Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                       <div className="font-semibold text-lg">코칭 데모</div>
                       <div className="text-sm opacity-80">실제 코칭 세션 예시</div>
                    </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
                   <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      <span>Coaching Demo Image</span>
                   </div>
                   <span className="font-mono text-xs opacity-50">src: public/images/demo-coaching.jpg</span>
                </div>
             </div>

             {/* Right: Profile */}
             <div className="space-y-8">
                <div className="space-y-4">
                   <div className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400 ring-1 ring-inset ring-blue-500/20">
                      Master Coach
                   </div>
                   <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                      "기술로 진단하고,<br />예술로 완성합니다."
                   </h2>
                   <p className="text-lg text-slate-300 leading-relaxed">
                      Withbill의 코칭은 감이 아닌 데이터에서 시작합니다.<br />
                      하지만 데이터가 춤의 전부는 아닙니다. <br />
                      현장 경험과 입시/오디션 기준을 더해, <span className="text-white font-semibold">"합격하는 춤"</span>을 만듭니다.
                   </p>
                </div>

                <div className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                   <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-2 ring-blue-500/50">
                      <Image
                        src="https://images.unsplash.com/photo-1550525811-e5869dd03032?q=80&w=256&auto=format&fit=crop"
                        alt="정인철 대표"
                        fill
                        className="object-cover"
                      />
                   </div>
                   <div>
                      <div className="font-bold text-lg">정인철 대표 (JAN)</div>
                      <div className="text-sm text-blue-400 font-medium">Withbill · JAN Master Insight CEO</div>
                      <div className="text-xs text-slate-400 mt-1">
                         SM/YG 트레이너 · 세계 챔피언 출신<br />
                         실용무용 입시 시스템 설계자
                      </div>
                   </div>
                </div>
             </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 container text-center">
         <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold sm:text-4xl">지금 바로 내 춤의 점수를 확인하세요</h2>
            <p className="text-lg text-muted-foreground">
               파일 업로드 한번으로 시작하는 가장 과학적인 댄스 트레이닝.<br />
               오늘의 진단이 내일의 무대를 바꿉니다.
            </p>
            <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/20" asChild>
               <Link href="/diagnose">무료로 진단받기 <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
         </div>
      </section>

    </div>
  );
}

function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
