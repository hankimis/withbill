import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Activity, BarChart3, Users, Zap, Layers } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black text-slate-900 dark:text-slate-50">
      
      {/* 1. Hero Section: Minimal & Impactful */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
              Tech-Enabled Dance Training
            </div>
            
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl text-slate-900 dark:text-white leading-[1.1]">
              기술로 진단하고<br />
              <span className="text-slate-400 dark:text-slate-500">예술로 완성하다.</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-light">
              Withbill은 데이터 기반 분석과 마스터의 정밀 코칭을 결합한<br className="hidden sm:inline" />
              차세대 댄스 트레이닝 플랫폼입니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button asChild size="lg" className="h-14 px-10 text-lg rounded-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200 transition-all">
                <Link href="/diagnose">
                  무료 진단 시작하기 <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-10 text-lg rounded-full border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900 transition-all">
                <Link href="/coaches">
                  코치 마켓 보기
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Hero Background Elements (Minimal) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 pointer-events-none opacity-50">
           <div className="absolute top-1/4 left-10 w-72 h-72 bg-slate-200/50 rounded-full blur-3xl mix-blend-multiply filter dark:bg-slate-800/30"></div>
           <div className="absolute top-1/3 right-10 w-72 h-72 bg-blue-100/50 rounded-full blur-3xl mix-blend-multiply filter dark:bg-blue-900/20"></div>
        </div>
      </section>

      {/* 2. Value Proposition (Grid) */}
      <section className="container py-24 border-t border-slate-100 dark:border-slate-900">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-slate-700 dark:text-slate-300" />
            </div>
            <h3 className="text-xl font-bold">정밀 데이터 분석</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              모호한 감이 아닌, Timing, Accuracy, Angle, Energy 4대 지표를 수치화하여 객관적인 실력을 진단합니다.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
              <Layers className="h-6 w-6 text-slate-700 dark:text-slate-300" />
            </div>
            <h3 className="text-xl font-bold">체계적 솔루션</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              "댄스 병원" 컨셉의 진단-처방 프로세스. 문제점을 발견하고 즉시 해결할 수 있는 맞춤형 연습 루틴을 제공합니다.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
              <Users className="h-6 w-6 text-slate-700 dark:text-slate-300" />
            </div>
            <h3 className="text-xl font-bold">마스터 코칭</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              데이터가 놓칠 수 있는 예술적 디테일은 SM/YG 트레이너 출신 마스터가 1:1로 완벽하게 다듬어드립니다.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Demo / Showcase Section (Split) */}
      <section className="bg-slate-50 dark:bg-slate-900 py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-slate-900 dark:text-white">
                업계 표준을 만드는<br />
                독보적인 진단 시스템.
              </h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                Withbill은 단순한 피드백을 넘어섭니다. 세계 챔피언의 노하우와 입시 시스템을 데이터로 구조화하여, 누구나 최상위 레벨의 트레이닝을 경험할 수 있습니다.
              </p>
              
              <div className="space-y-4 pt-4">
                {[
                  "영상 업로드 즉시 4대 지표 분석 (Freemium)",
                  "취약 구간 시각화 및 우선순위 도출",
                  "마스터 코치의 1:1 정밀 피드백 연동"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              {/* Image Frame */}
              <div className="rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-black border border-slate-200 dark:border-slate-800 p-2">
                 <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <Image
                      src="/images/demo-coaching.jpg"
                      alt="Coaching Demo Interface"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    {/* Minimal Overlay UI Mockup */}
                    <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/20">
                       <div className="flex justify-between items-center mb-2">
                          <div className="text-xs font-bold uppercase text-slate-500 tracking-wider">Analysis Result</div>
                          <Badge variant="default" className="bg-blue-600 hover:bg-blue-700">88/100</Badge>
                       </div>
                       <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 w-[88%]" />
                       </div>
                       <div className="flex justify-between mt-2 text-xs font-medium text-slate-700">
                          <span>Timing</span>
                          <span>Accuracy</span>
                          <span>Angle</span>
                       </div>
                    </div>
                 </div>
              </div>
              {/* Decorative Background */}
              <div className="absolute -inset-4 -z-10 bg-gradient-to-tr from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-[2rem]" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Authority / Trust */}
      <section className="container py-24">
        <div className="rounded-3xl bg-slate-900 text-white p-10 md:p-16 relative overflow-hidden">
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
             <div>
                <Badge variant="outline" className="border-white/30 text-white mb-6">Founder & CEO</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                   "데이터는 거짓말을 하지 않지만,<br />
                   감동은 사람만이 줄 수 있습니다."
                </h2>
                <div className="space-y-1 text-slate-300">
                   <div className="font-semibold text-white text-lg">정인철 (JAN)</div>
                   <div className="text-sm">Withbill Representative</div>
                   <div className="text-sm opacity-70 mt-2">
                      前 SM/YG 엔터테인먼트 트레이너<br />
                      세계 챔피언 및 실용무용 입시 시스템 총괄
                   </div>
                </div>
             </div>
             <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-white/5">
                {/* Image instead of Video for clean look */}
                <Image 
                   src="https://images.unsplash.com/photo-1550525811-e5869dd03032?q=80&w=800&auto=format&fit=crop"
                   alt="CEO Profile"
                   fill
                   sizes="(max-width: 768px) 100vw, 50vw"
                   className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                      <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1" />
                   </div>
                </div>
             </div>
          </div>
          {/* Subtle Texture */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
        </div>
      </section>

      {/* 5. Final CTA */}
      <section className="container py-24 text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-6">
          지금 바로, 당신의 춤을 진단하세요.
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-xl mx-auto">
          복잡한 절차 없이 영상 업로드만으로 시작할 수 있습니다.<br />
          전문가 수준의 분석 리포트를 무료로 경험해보세요.
        </p>
        <Button asChild size="lg" className="h-14 px-12 text-lg rounded-full shadow-xl shadow-slate-200 dark:shadow-none">
          <Link href="/diagnose">무료 진단 시작하기</Link>
        </Button>
      </section>

    </div>
  );
}
