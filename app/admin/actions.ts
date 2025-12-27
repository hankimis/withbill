"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import type { Submission } from "@/lib/domain";
import { getSubmission, upsertSubmission } from "@/lib/db";

const FeedbackSchema = z.object({
  submissionId: z.string().min(1),
  text: z.string().trim().optional(),
  videoUrl: z.string().trim().optional()
});

export async function markFeedbackDoneAction(formData: FormData) {
  const parsed = FeedbackSchema.safeParse({
    submissionId: String(formData.get("submissionId") ?? "").trim(),
    text: String(formData.get("text") ?? "").trim() || undefined,
    videoUrl: String(formData.get("videoUrl") ?? "").trim() || undefined
  });

  if (!parsed.success) {
    redirect("/admin?error=입력값을%20확인해%20주세요");
  }

  const submission = await getSubmission(parsed.data.submissionId);
  if (!submission) {
    redirect("/admin?error=제출%20ID를%20찾을%20수%20없습니다");
  }

  const updated: Submission = {
    ...submission,
    status: "피드백완료",
    feedback: {
      updatedAtISO: new Date().toISOString(),
      text: parsed.data.text,
      videoUrl: parsed.data.videoUrl
    }
  };
  await upsertSubmission(updated);
  redirect(`/admin?ok=피드백%20완료%20처리됨`);
}


