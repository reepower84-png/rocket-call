import { promises as fs } from "fs";
import path from "path";
import { Inquiry } from "./types";

const DATA_FILE = path.join(process.cwd(), "data", "inquiries.json");

async function ensureDataFile() {
  const dataDir = path.dirname(DATA_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }

  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));
  }
}

export async function getInquiries(): Promise<Inquiry[]> {
  await ensureDataFile();
  const data = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(data);
}

export async function addInquiry(
  inquiry: Omit<Inquiry, "id" | "createdAt" | "status">
): Promise<Inquiry> {
  await ensureDataFile();
  const inquiries = await getInquiries();

  const newInquiry: Inquiry = {
    ...inquiry,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "pending",
  };

  inquiries.unshift(newInquiry);
  await fs.writeFile(DATA_FILE, JSON.stringify(inquiries, null, 2));

  return newInquiry;
}

export async function updateInquiryStatus(
  id: string,
  status: Inquiry["status"]
): Promise<Inquiry | null> {
  await ensureDataFile();
  const inquiries = await getInquiries();
  const index = inquiries.findIndex((i) => i.id === id);

  if (index === -1) return null;

  inquiries[index].status = status;
  await fs.writeFile(DATA_FILE, JSON.stringify(inquiries, null, 2));

  return inquiries[index];
}

export async function deleteInquiry(id: string): Promise<boolean> {
  await ensureDataFile();
  const inquiries = await getInquiries();
  const filtered = inquiries.filter((i) => i.id !== id);

  if (filtered.length === inquiries.length) return false;

  await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2));
  return true;
}
