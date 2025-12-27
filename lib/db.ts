import { promises as fs } from "node:fs";
import path from "node:path";

import type { Order, Submission } from "@/lib/domain";

const DB_DIR = path.join(process.cwd(), "data", "db");
const SUBMISSIONS_FILE = path.join(DB_DIR, "submissions.json");
const ORDERS_FILE = path.join(DB_DIR, "orders.json");

async function ensureDbFiles() {
  await fs.mkdir(DB_DIR, { recursive: true });
  await Promise.all([
    ensureJsonFile(SUBMISSIONS_FILE, { submissions: [] as Submission[] }),
    ensureJsonFile(ORDERS_FILE, { orders: [] as Order[] })
  ]);
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
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw) as T;
}

async function writeJson<T>(filePath: string, value: T) {
  await ensureDbFiles();
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


