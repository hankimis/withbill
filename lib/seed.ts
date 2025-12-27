import seed from "@/data/seed/coaches.json";
import type { Coach } from "@/lib/domain";

export function getSeedCoaches(): Coach[] {
  return seed.coaches as Coach[];
}

export function getSeedProducts() {
  return seed.products as {
    coachFeedback: { id: string; name: string; priceKRW: number };
    masterReviewUpgrade: { id: string; name: string; priceKRW: number };
    tiers: Array<{ id: string; name: string; includes: string[] }>;
  };
}

export function getRevenueShareExample() {
  return seed.revenueShareExample as { academy: number; instructor: number };
}


