"use client";

import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function SiteHeader({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className={cn("sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-xl dark:bg-black/80 dark:border-slate-800", className)}>
      <div className="container flex h-16 items-center justify-between gap-4">
        
        {/* Logo Section */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-tight text-xl text-slate-900 dark:text-white whitespace-nowrap">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white dark:bg-white dark:text-black">
              <span className="text-sm font-extrabold">W</span>
            </div>
            <span>Withbill</span>
          </Link>
          <Badge variant="secondary" className="hidden sm:inline-flex bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 font-medium px-2 py-0.5 text-[10px] tracking-wider border-0">
            BETA
          </Badge>
        </div>

        {/* Desktop Navigation (Center) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
          <Link href="/diagnose" className="transition-colors hover:text-slate-900 dark:hover:text-white">
            AI 진단
          </Link>
          <Link href="/coaches" className="transition-colors hover:text-slate-900 dark:hover:text-white">
            코치 마켓
          </Link>
          <Link href="/admin" className="transition-colors hover:text-slate-900 dark:hover:text-white">
            Admin
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
          <Button variant="ghost" size="icon" className="hidden md:flex text-slate-500 hover:text-slate-900 dark:hover:text-white">
            <Search className="h-5 w-5" />
          </Button>
          
          <div className="hidden md:flex items-center gap-2">
            <Button asChild variant="ghost" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
              <Link href="/login">로그인</Link>
            </Button>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 shadow-sm">
              <Link href="/diagnose">무료 시작</Link>
            </Button>
          </div>

          {/* Mobile Menu Trigger (Sheet) */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-slate-900 dark:text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="text-left border-b pb-4 mb-4">
                <SheetTitle className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white dark:bg-white dark:text-black">
                    <span className="text-sm font-extrabold">W</span>
                  </div>
                  <span>Withbill</span>
                </SheetTitle>
              </SheetHeader>
              
              <div className="flex flex-col gap-6 mt-6">
                <div className="flex flex-col gap-4 text-base font-medium text-slate-600 dark:text-slate-400">
                  <Link 
                    href="/diagnose" 
                    className="flex items-center gap-2 hover:text-slate-900 dark:hover:text-white py-2 border-b border-slate-100 dark:border-slate-800"
                    onClick={() => setOpen(false)}
                  >
                    AI 진단
                  </Link>
                  <Link 
                    href="/coaches" 
                    className="flex items-center gap-2 hover:text-slate-900 dark:hover:text-white py-2 border-b border-slate-100 dark:border-slate-800"
                    onClick={() => setOpen(false)}
                  >
                    코치 마켓
                  </Link>
                  <Link 
                    href="/admin" 
                    className="flex items-center gap-2 hover:text-slate-900 dark:hover:text-white py-2 border-b border-slate-100 dark:border-slate-800"
                    onClick={() => setOpen(false)}
                  >
                    Admin
                  </Link>
                </div>

                <div className="flex flex-col gap-3 mt-auto">
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full h-12 text-lg">
                    <Link href="/diagnose" onClick={() => setOpen(false)}>무료 시작하기</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full rounded-full h-12 text-lg border-slate-200">
                    <Link href="/login" onClick={() => setOpen(false)}>로그인</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}
