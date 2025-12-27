import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function SiteHeader({ className }: { className?: string }) {
  return (
    <header className={cn("sticky top-0 z-50 w-full border-b bg-background/60 backdrop-blur-md supports-[backdrop-filter]:bg-background/60", className)}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-bold tracking-tight text-lg flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-primary flex items-center justify-center text-white text-xs">W</div>
            Withbill <span className="text-muted-foreground font-normal">/ JAN Insight</span>
          </Link>
          <Badge variant="secondary" className="hidden md:inline-flex text-[10px] h-5">Beta</Badge>
        </div>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link className="text-muted-foreground transition-colors hover:text-primary" href="/diagnose">
            진단하기
          </Link>
          <Link className="text-muted-foreground transition-colors hover:text-primary" href="/coaches">
            코치 마켓
          </Link>
          <Link className="text-muted-foreground transition-colors hover:text-primary" href="/admin">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
