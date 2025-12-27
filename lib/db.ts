import { promises as fs } from "node:fs";
import path from "node:path";

import type { Order, Submission } from "@/lib/domain";

/**
 * 로컬 데모: repo/data/db 에 JSON 저장
 * Vercel 등 서버리스: 읽기 전용 FS일 수 있으므로 /tmp 사용
 * 그래도 실패하면(권한/런타임 제한) 메모리 저장소로 폴백
 */
const BASE_DIR =
  process.env.VERCEL === "1" || process.env.NEXT_RUNTIME === "edge"
    ? path.join("/tmp", "withbill-db")
    : path.join(process.cwd(), "data", "db");

const SUBMISSIONS_FILE = path.join(BASE_DIR, "submissions.json");
const ORDERS_FILE = path.join(BASE_DIR, "orders.json");

let memoryDb: { submissions: Submission[]; orders: Order[] } | null = null;
function getMemoryDb() {
  if (!memoryDb) memoryDb = { submissions: [], orders: [] };
  return memoryDb;
}

async function ensureDbFiles() {
  try {
    await fs.mkdir(BASE_DIR, { recursive: true });
    await Promise.all([
      ensureJsonFile(SUBMISSIONS_FILE, { submissions: [] as Submission[] }),
      ensureJsonFile(ORDERS_FILE, { orders: [] as Order[] })
    ]);
  } catch {
    // 서버리스/권한 문제 → 메모리 폴백
    getMemoryDb();
  }
}

async function ensureJsonFile<T extends object>(filePath: string, initial: T) {
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, JSON.stringify(initial, null, 2), "utf8");
  }
}

async function readJson<T>(filePath: string): Promise<T> {
  await ensureDbFiles();
  if (memoryDb) {
    if (filePath === SUBMISSIONS_FILE) return { submissions: getMemoryDb().submissions } as unknown as T;
    if (filePath === ORDERS_FILE) return { orders: getMemoryDb().orders } as unknown as T;
  }
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw) as T;
}

async function writeJson<T>(filePath: string, value: T) {
  await ensureDbFiles();
  if (memoryDb) {
    // value shape: { submissions: Submission[] } or { orders: Order[] }
    const db = getMemoryDb();
    if ((value as any)?.submissions) db.submissions = (value as any).submissions;
    if ((value as any)?.orders) db.orders = (value as any).orders;
    return;
  }
  await fs.writeFile(filePath, JSON.stringify(value, null, 2), "utf8");
}

export async function listSubmissions(): Promise<Submission[]> {
  const db = await readJson<{ submissions: Submission[] }>(SUBMISSIONS_FILE);
  return db.submissions.slice().sort((a, b) => b.createdAtISO.localeCompare(a.createdAtISO));
}

export async function getSubmission(id: string): Promise<Submission | undefined> {
  const all = await listSubmissions();
  return all.find((s) => s.id === id);
}

export async function upsertSubmission(submission: Submission) {
  const db = await readJson<{ submissions: Submission[] }>(SUBMISSIONS_FILE);
  const idx = db.submissions.findIndex((s) => s.id === submission.id);
  if (idx >= 0) db.submissions[idx] = submission;
  else db.submissions.push(submission);
  await writeJson(SUBMISSIONS_FILE, db);
}

export async function listOrders(): Promise<Order[]> {
  const db = await readJson<{ orders: Order[] }>(ORDERS_FILE);
  return db.orders.slice().sort((a, b) => b.createdAtISO.localeCompare(a.createdAtISO));
}

export async function createOrder(order: Order) {
  const db = await readJson<{ orders: Order[] }>(ORDERS_FILE);
  db.orders.push(order);
  await writeJson(ORDERS_FILE, db);
}

export async function getOrder(id: string): Promise<Order | undefined> {
  const all = await listOrders();
  return all.find((o) => o.id === id);
}


