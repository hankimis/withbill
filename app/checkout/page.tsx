import Link from "next/link";

import { checkoutAction } from "@/app/checkout/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatKRW } from "@/lib/format";
import { getSeedCoaches, getSeedProducts, getRevenueShareExample } from "@/lib/seed";

export default function CheckoutPage({
  searchParams
}: {
  searchParams: { submissionId?: string; coachId?: string; error?: string };
}) {
  const coaches = getSeedCoaches();
  const products = getSeedProducts();
  const share = getRevenueShareExample();

  const submissionId = searchParams?.submissionId ?? "";
  const coachId = searchParams?.coachId ?? "";
  const coach = coachId ? coaches.find((c) => c.id === coachId) : undefined;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">결제(모킹)</h1>
          <p className="text-sm text-muted-foreground">
            결제 성공 시 주문이 생성되고, 리포트에서 “피드백 보기”가 활성화됩니다.
          </p>
        </div>
        <Badge variant="outline">Mock Payment</Badge>
      </div>

      {searchParams?.error ? (
        <Card className="border-destructive/40">
          <CardHeader>
            <CardTitle className="text-base">결제 진행 불가</CardTitle>
            <CardDescription className="text-destructive">{searchParams.error}</CardDescription>
          </CardHeader>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>주문 정보</CardTitle>
          <CardDescription>제출 ID + 코치를 기준으로 주문을 생성합니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <form action={checkoutAction} className="space-y-5">
            <div className="grid gap-2">
              <Label htmlFor="submissionId">제출 ID</Label>
              <Input id="submissionId" name="submissionId" defaultValue={submissionId} placeholder="예: abc123xyz" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="coachId">코치</Label>
              <Input
                id="coachId"
                name="coachId"
                defaultValue={coachId}
                placeholder="coaches에서 선택하면 자동 입력됩니다"
              />
              <div className="text-xs text-muted-foreground">
                선택 코치: <span className="font-medium text-foreground">{coach ? coach.displayName : "미확정"}</span>
              </div>
            </div>

            <div className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">{products.coachFeedback.name}</div>
                <div className="text-sm">{formatKRW(products.coachFeedback.priceKRW)}</div>
              </div>
              <label className="flex items-center justify-between gap-4 text-sm">
                <span className="flex items-center gap-2">
                  <input className="h-4 w-4" type="checkbox" name="masterReviewUpgrade" />
                  {products.masterReviewUpgrade.name}
                  <Badge variant="secondary">업셀</Badge>
                </span>
                <span>{formatKRW(products.masterReviewUpgrade.priceKRW)}</span>
              </label>
              <div className="text-xs text-muted-foreground">
                데모 기준: 업그레이드 선택 시 총액은 {formatKRW(products.masterReviewUpgrade.priceKRW)}로 처리합니다.
              </div>
            </div>

            <div className="rounded-lg bg-muted/40 p-4 text-sm text-muted-foreground space-y-1">
              <div className="font-medium text-foreground">수익배분(예시)</div>
              <div>
                학원 {Math.round(share.academy * 10)} : 강사 {Math.round(share.instructor * 10)} (예: 학원 4 : 강사 6)
              </div>
              <div>전문가 팀 플랫폼 운영을 위한 분배 예시를 Admin에서 확인할 수 있습니다.</div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button type="submit" name="paymentResult" value="success">
                결제 성공(모킹)
              </Button>
              <Button type="submit" name="paymentResult" value="fail" variant="outline">
                결제 실패(모킹)
              </Button>
              <Button asChild type="button" variant="ghost">
                <Link href={submissionId ? `/report/${submissionId}` : "/diagnose"}>돌아가기</Link>
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          티어 안내: Basic(텍스트/음성) · Premium(피드백영상) · VIP(줌) — 데모에서는 구조 소개만 노출합니다.
        </CardFooter>
      </Card>
    </div>
  );
}


