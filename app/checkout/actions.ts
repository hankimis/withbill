"use server";

import { nanoid } from "nanoid";
import { redirect } from "next/navigation";
import { z } from "zod";

import type { Order, Submission } from "@/lib/domain";
import { createOrder, getSubmission, upsertSubmission } from "@/lib/db";
import { getRevenueShareExample, getSeedProducts } from "@/lib/seed";

const CheckoutSchema = z.object({
  submissionId: z.string().min(1),
  coachId: z.string().min(1),
  masterReviewUpgrade: z.enum(["on"]).optional(),
  paymentResult: z.enum(["success", "fail"])
});

export async function checkoutAction(formData: FormData) {
  const parsed = CheckoutSchema.safeParse({
    submissionId: String(formData.get("submissionId") ?? "").trim(),
    coachId: String(formData.get("coachId") ?? "").trim(),
    masterReviewUpgrade: formData.get("masterReviewUpgrade") ? "on" : undefined,
    paymentResult: String(formData.get("paymentResult") ?? "").trim()
  });

  if (!parsed.success) {
    redirect("/checkout?error=입력값을%20확인해%20주세요");
  }

  const { submissionId, coachId, masterReviewUpgrade, paymentResult } = parsed.data;

  const submission = await getSubmission(submissionId);
  if (!submission) {
    redirect(`/checkout?error=제출%20ID를%20찾을%20수%20없습니다&submissionId=${encodeURIComponent(submissionId)}&coachId=${encodeURIComponent(coachId)}`);
  }

  if (paymentResult === "fail") {
    redirect(`/checkout?error=결제가%20실패했습니다(모킹)&submissionId=${encodeURIComponent(submissionId)}&coachId=${encodeURIComponent(coachId)}`);
  }

  const products = getSeedProducts();
  const amountKRW = masterReviewUpgrade
    ? products.masterReviewUpgrade.priceKRW
    : products.coachFeedback.priceKRW;

  const share = getRevenueShareExample(); // 예: 학원 4 : 강사 6
  const academyAmountKRW = Math.round(amountKRW * share.academy);
  const instructorAmountKRW = amountKRW - academyAmountKRW;

  const order: Order = {
    id: nanoid(10),
    createdAtISO: new Date().toISOString(),
    submissionId,
    coachId,
    product: {
      coachFeedback: true,
      masterReviewUpgrade: Boolean(masterReviewUpgrade)
    },
    amountKRW,
    payment: { status: "성공", method: "모킹" },
    revenueShare: {
      academyAmountKRW,
      instructorAmountKRW,
      note: "예시: 학원 4 : 강사 6"
    }
  };

  await createOrder(order);

  const updated: Submission = {
    ...submission,
    status: "결제완료",
    selectedCoachId: coachId,
    orderId: order.id
  };
  await upsertSubmission(updated);

  redirect(`/report/${submissionId}#feedback`);
}


