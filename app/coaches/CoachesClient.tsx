"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Verified } from "lucide-react";

import type { Coach } from "@/lib/domain";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatKRW } from "@/lib/format";

type Props = {
  coaches: Coach[];
  submissionId?: string;
};

const COACH_IMAGES = [
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583468982228-19f19164aee2?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=800&auto=format&fit=crop"
] as const;

export function CoachesClient({ coaches, submissionId }: Props) {
  const [genre, setGenre] = useState<string>("ALL");
  const [purpose, setPurpose] = useState<string>("ALL");
  const [cert, setCert] = useState<string>("ALL");

  const genres = useMemo(() => {
    const set = new Set(coaches.map((c) => c.genre));
    return ["ALL", ...Array.from(set)];
  }, [coaches]);

  const purposes = useMemo(() => {
    const set = new Set(coaches.flatMap((c) => c.purpose));
    return ["ALL", ...Array.from(set)];
  }, [coaches]);

  const certs = useMemo(() => {
    const set = new Set(coaches.flatMap((c) => c.certifications));
    return ["ALL", ...Array.from(set)];
  }, [coaches]);

  const filtered = useMemo(() => {
    return coaches.filter((c) => {
      if (genre !== "ALL" && c.genre !== genre) return false;
      if (purpose !== "ALL" && !c.purpose.includes(purpose)) return false;
      if (cert !== "ALL" && !c.certifications.includes(cert)) return false;
      return true;
    });
  }, [coaches, genre, purpose, cert]);

  const imageByCoachId = useMemo(() => {
    // 코치별 이미지가 "서로 다르게" 고정되도록, coaches 배열 순서대로 1:1 매핑
    const map = new Map<string, string>();
    coaches.forEach((c, idx) => {
      const url = COACH_IMAGES[idx % COACH_IMAGES.length];
      map.set(c.id, url);
    });
    return map;
  }, [coaches]);

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="rounded-xl border bg-background/50 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/20 sticky top-16 z-10 shadow-sm">
        <div className="grid gap-4 md:grid-cols-3">
          <FilterSelect label="장르" value={genre} onValueChange={setGenre} options={genres} />
          <FilterSelect label="목적" value={purpose} onValueChange={setPurpose} options={purposes} />
          <FilterSelect label="인증" value={cert} onValueChange={setCert} options={certs} />
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <Card key={c.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full border-muted/60">
            <div className="aspect-[4/3] relative bg-muted">
              <Image
                src={imageByCoachId.get(c.id) ?? COACH_IMAGES[0]}
                alt={c.displayName}
                fill
                className="object-cover transition-transform hover:scale-105 duration-500"
              />
              <div className="absolute top-3 right-3">
                <Badge className="bg-white/90 text-black hover:bg-white shadow-sm backdrop-blur-sm">
                  {c.genre}
                </Badge>
              </div>
            </div>
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-lg flex items-center justify-between">
                <span className="truncate">{c.displayName}</span>
                {c.certifications.includes("JAN 인증") && (
                  <Verified className="h-4 w-4 text-primary shrink-0" />
                )}
              </CardTitle>
              <CardDescription className="line-clamp-2 min-h-[40px]">
                {c.headline}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-1">
              <div className="flex flex-wrap gap-1.5">
                {c.certifications.map((x) => (
                  <Badge key={x} variant="secondary" className="text-[10px] px-1.5 py-0">
                    {x}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {c.tags.map((t) => (
                  <Badge key={t} variant="outline" className="text-[10px] px-1.5 py-0 border-dashed">
                    #{t}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-0 border-t bg-muted/20 p-4 flex items-center justify-between">
              <div className="text-sm font-semibold">
                {formatKRW(c.priceCoachFeedbackKRW)}
              </div>
              <Button asChild size="sm" className={submissionId ? "" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}>
                <Link
                  href={
                    submissionId
                      ? `/checkout?submissionId=${encodeURIComponent(submissionId)}&coachId=${encodeURIComponent(c.id)}`
                      : `/checkout?coachId=${encodeURIComponent(c.id)}`
                  }
                >
                  {submissionId ? "선택하기" : "예약하기"}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onValueChange,
  options
}: {
  label: string;
  value: string;
  onValueChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="space-y-1.5">
      <div className="text-xs font-medium text-muted-foreground ml-1">{label}</div>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="bg-background">
          <SelectValue placeholder={`${label} 선택`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o} value={o}>
              {o === "ALL" ? "전체" : o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
