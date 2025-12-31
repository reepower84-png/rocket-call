export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  inquiry: string;
  createdAt: string;
  status: "pending" | "contacted" | "completed";
}
