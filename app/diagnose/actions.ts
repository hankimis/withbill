"use server";

import { nanoid } from "nanoid";
import { redirect } from "next/navigation";
import { z } from "zod";

import type { Submission } from "@/lib/domain";
import { generateAiReport } from "@/lib/aiDummy";
import { upsertSubmission } from "@/lib/db";

const DiagnoseSchema = z.object({
  videoUrl: z.string().trim().optional(),
  fileName: z.string().trim().optional()
});

export async function createSubmissionAction(formData: FormData) {
  const file = formData.get("videoFile");
  const videoUrl = String(formData.get("videoUrl") ?? "").trim();

  const fileName =
    file && typeof file === "object" && "name" in file ? String((file as File).name) : "";

  const parsed = DiagnoseSchema.safeParse({
    videoUrl: videoUrl || undefined,
    fileName: fileName || undefined
  });

  if (!parsed.success || (!parsed.data.videoUrl && !parsed.data.fileName)) {
    // 데모: 실패 시에도 페이지를 깨지지 않게 diagnose로 복귀
    redirect("/diagnose?error=영상%20파일%20또는%20URL%20중%20하나를%20입력해%20주세요");
  }

  const id = nanoid(10);
  const createdAtISO = new Date().toISOString();

  const source: Submission["source"] = parsed.data.fileName
    ? { type: "file", fileName: parsed.data.fileName }
    : { type: "url", url: parsed.data.videoUrl! };

  // 1) 접수 저장
  const received: Submission = {
    id,
    createdAtISO,
    status: "접수",
    source
  };
  await upsertSubmission(received);

  // 2) 분석(데모: 즉시) → 분석완료 저장
  const report = generateAiReport(`${id}:${source.type === "file" ? source.fileName : source.url}`);
  const analyzed: Submission = { ...received, status: "분석완료", report };
  await upsertSubmission(analyzed);

  redirect(`/report/${id}`);
}


