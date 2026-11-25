export type Role = 'admin' | 'warehouse' | 'supply' | 'boss' | 'foreman' | 'master';
export type Lang = 'uz' | 'ru';
export type RequestStatus = 'open' | 'approved' | 'received';
export type PaymentStatus = 'pending' | 'approved' | 'rejected' | 'paid';

export const ROLES: Role[] = ['admin', 'warehouse', 'supply', 'boss', 'foreman', 'master'];

/** Foremen and masters hand in requests and may change only their own. */
export const ownOnly = (role: Role) => role === 'foreman' || role === 'master';

export interface User {
  id: number;
  login: string;
  name: string;
  role: Role;
  lang: Lang;
  active: number;
}

export interface Ref {
  id: number;
  name: string;
}

export interface RequestItem {
  id: number;
  pos: number;
  name: string;
  unit: string;
  qty: number;
  spec: string;
  place: string;
  work: string;
  ordered_by: string;
  executor: string;
  received: number;
}

export interface Payment {
  id: number;
  request_id: number;
  request_number: string;
  object: string | null;
  supplier: string | null;
  amount: number;
  note: string;
  status: PaymentStatus;
  created_by_name: string | null;
  created_at: string;
  decided_by_name: string | null;
  decided_at: string | null;
  paid_at: string | null;
}

export interface RequestSummary {
  id: number;
  number: string;
  date: string;
  object_id: number | null;
  object: string | null;
  status: RequestStatus;
  note: string;
  created_by: number | null;
  created_by_name: string | null;
  item_count: number;
  pending_payments: number;
}

export interface FileInfo {
  id: number;
  name: string;
  mime: string;
  size: number;
  uploaded_by: number | null;
  uploaded_by_name: string | null;
  created_at: string;
}

export interface RequestDetail extends RequestSummary {
  items: RequestItem[];
  payments: Payment[];
  files: FileInfo[];
}

export interface Receipt {
  id: number;
  date: string;
  code: string;
  object_id: number | null;
  object: string | null;
  request_item_id: number | null;
  name: string;
  unit: string;
  qty: number;
  price: number | null;
  supplier: string | null;
  buyer: string;
  contract_no: string;
  invoice_no: string;
  vehicle: string;
  vehicle_date: string | null;
  currency: string;
  note: string;
}

export interface Dashboard {
  receipts: { sum: number; count: number; unpriced: number };
  payments: Record<PaymentStatus, { sum: number; count: number }>;
  objects: { id: number | null; name: string | null; sum: number; count: number }[];
  badges: { pending: number; to_pay: number; open_requests: number };
}

export interface ObjectFolder {
  id: number;
  name: string;
  prefix: string;
  active: number;
  requests: number;
  open_requests: number;
  receipts: number;
  sum: number;
}
