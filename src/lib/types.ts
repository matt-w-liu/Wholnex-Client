import type {
  ContactReason,
  ManagementPreference,
  OperatingSystemPreference,
  QuotePlanInterest,
  QuoteTimeline,
  RequestStatus,
  UserRole,
  UserStatus,
  VpsWorkload,
} from '@wholnex/shared';

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface Paginated<T> {
  items: T[];
  pagination: Pagination;
}

export interface User {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company?: string;
  reason: ContactReason;
  subject: string;
  message: string;
  consent: boolean;
  status: RequestStatus;
  internalNotes?: string;
  emailDeliveryStatus?: string;
  emailDeliveryError?: string;
  confirmationEmailStatus?: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuoteRequest {
  id: string;
  planInterest: QuotePlanInterest;
  workload: VpsWorkload;
  operatingSystem: OperatingSystemPreference;
  vcpu?: number;
  memoryGb?: number;
  storageGb?: number;
  quantity: number;
  managementPreference: ManagementPreference;
  regionPreference?: string;
  timeline?: QuoteTimeline;
  requirements?: string;
  companyName?: string;
  name: string;
  email: string;
  status: RequestStatus;
  internalNotes?: string;
  emailDeliveryStatus?: string;
  emailDeliveryError?: string;
  confirmationEmailStatus?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserStats {
  total: number;
  active: number;
  admins: number;
}

export interface RequestStats {
  total: number;
  new: number;
  inProgress: number;
  resolved: number;
}

export interface ContactStats extends RequestStats {
  recent: ContactMessage[];
}

export interface AdminDashboardStats {
  users: UserStats;
  contact: ContactStats;
  quoteRequests: RequestStats;
}
