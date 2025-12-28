import Link from "next/link";
import { Menu, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function SiteHeader({ className }: { className?: string }) {
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

          {/* Mobile Menu Trigger (Simple) */}
          <Button variant="ghost" size="icon" className="md:hidden text-slate-900 dark:text-white">
            <Menu className="h-6 w-6" />
          </Button>
        </div>

      </div>
    </header>
  );
}
