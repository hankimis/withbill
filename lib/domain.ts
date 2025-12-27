export type SubmissionStatus = "접수" | "분석완료" | "결제완료" | "피드백완료";

export type SubmissionSource =
  | { type: "file"; fileName: string }
  | { type: "url"; url: string };

export type AiReport = {
  scores: {
    timing: number; // 0-100
    accuracy: number;
    angle: number;
    energy: number;
  };
  issues: Array<{
    title: string;
    detail: string;
  }>;
  summary: string;
  nextDrills: string[];
};

export type Submission = {
  id: string;
  createdAtISO: string;
  status: SubmissionStatus;
  source: SubmissionSource;
  report?: AiReport;
  selectedCoachId?: string;
  orderId?: string;
  feedback?: {
    updatedAtISO: string;
    text?: string;
    videoUrl?: string;
  };
};

export type Order = {
  id: string;
  createdAtISO: string;
  submissionId: string;
  coachId: string;
  product: {
    coachFeedback: true;
    masterReviewUpgrade: boolean; // 업그레이드 선택 시 총액 80,000원
  };
  amountKRW: number;
  payment: {
    status: "성공" | "실패";
    method: "모킹";
  };
  revenueShare: {
    academyAmountKRW: number;
    instructorAmountKRW: number;
    note: "예시: 학원 4 : 강사 6";
  };
};

export type Coach = {
  id: string;
  displayName: string;
  genre: string;
  purpose: string[];
  certifications: string[];
  headline: string;
  tags: string[];
  baseProduct: string;
  priceCoachFeedbackKRW: number;
};


