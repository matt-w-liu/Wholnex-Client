import { z } from 'zod';

export const userRoles = ['user', 'admin'] as const;
export type UserRole = (typeof userRoles)[number];

export const userStatuses = ['active', 'disabled'] as const;
export type UserStatus = (typeof userStatuses)[number];

// --- Request / inquiry enums -------------------------------------------------

export const requestStatuses = ['new', 'in-progress', 'resolved', 'archived'] as const;
export type RequestStatus = (typeof requestStatuses)[number];

export const contactReasons = ['sales', 'business-vpn', 'technical-support', 'general'] as const;
export type ContactReason = (typeof contactReasons)[number];

export const preferredContactMethods = ['email', 'phone', 'either'] as const;
export type PreferredContactMethod = (typeof preferredContactMethods)[number];

export const emailDeliveryStatuses = ['pending', 'sent', 'failed', 'skipped'] as const;
export type EmailDeliveryStatus = (typeof emailDeliveryStatuses)[number];

export const CONTACT_REASON_LABELS: Record<ContactReason, string> = {
  sales: 'Sales inquiry',
  'business-vpn': 'Business / team VPN inquiry',
  'technical-support': 'Technical support',
  general: 'General inquiry',
};

// --- VPN plan / quote request enums -------------------------------------------
// Plan identifiers are presentation tiers used to start a conversation with sales.
// They do not imply confirmed features or pricing.

export const vpnPlanIds = ['personal', 'plus', 'team', 'business'] as const;
export type VpnPlanId = (typeof vpnPlanIds)[number];

export const quotePlanInterests = [...vpnPlanIds, 'custom', 'not-sure'] as const;
export type QuotePlanInterest = (typeof quotePlanInterests)[number];

export const vpnUseCases = [
  'remote-work',
  'public-wifi',
  'online-privacy',
  'travel',
  'team-access',
  'other',
] as const;
export type VpnUseCase = (typeof vpnUseCases)[number];

export const devicePlatforms = ['windows', 'macos', 'ios', 'android', 'linux'] as const;
export type DevicePlatform = (typeof devicePlatforms)[number];

export const quoteTimelines = ['immediately', 'within-1-month', '1-3-months', 'exploring'] as const;
export type QuoteTimeline = (typeof quoteTimelines)[number];

export const QUOTE_PLAN_INTEREST_LABELS: Record<QuotePlanInterest, string> = {
  personal: 'Personal VPN',
  plus: 'Plus VPN',
  team: 'Team VPN',
  business: 'Business VPN',
  custom: 'Custom plan',
  'not-sure': 'Not sure yet',
};

export const VPN_USE_CASE_LABELS: Record<VpnUseCase, string> = {
  'remote-work': 'Remote work',
  'public-wifi': 'Public Wi-Fi protection',
  'online-privacy': 'Everyday online privacy',
  travel: 'Travel',
  'team-access': 'Secure team access',
  other: 'Other',
};

export const DEVICE_PLATFORM_LABELS: Record<DevicePlatform, string> = {
  windows: 'Windows',
  macos: 'macOS',
  ios: 'iPhone / iPad',
  android: 'Android',
  linux: 'Linux',
};

export const QUOTE_TIMELINE_LABELS: Record<QuoteTimeline, string> = {
  immediately: 'As soon as possible',
  'within-1-month': 'Within a month',
  '1-3-months': 'In 1–3 months',
  exploring: 'Just exploring',
};

// --- Auth schemas ------------------------------------------------------------

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must be at most 128 characters')
  .regex(/[A-Z]/, 'Password must include an uppercase letter')
  .regex(/[a-z]/, 'Password must include a lowercase letter')
  .regex(/[0-9]/, 'Password must include a number');

const phoneSchema = z
  .string()
  .trim()
  .max(30)
  .optional()
  .or(z.literal(''))
  .transform((v) => (v === '' ? undefined : v));

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .or(z.literal(''))
    .transform((v) => (v === '' ? undefined : v));

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
    email: z.string().trim().email('Enter a valid email').max(254).toLowerCase(),
    phone: phoneSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: 'You must accept the terms of use' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email').max(254).toLowerCase(),
  password: z.string().min(1, 'Password is required').max(128),
  rememberMe: z.boolean().optional(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email('Enter a valid email').max(254).toLowerCase(),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const updateProfileSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  phone: phoneSchema,
});

// --- Contact schema ------------------------------------------------------------

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().email('Enter a valid email').max(254).toLowerCase(),
  company: optionalText(120),
  reason: z.enum(contactReasons, { errorMap: () => ({ message: 'Select an inquiry category' }) }),
  subject: z.string().trim().min(3, 'Subject must be at least 3 characters').max(200),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be at most 5000 characters'),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Consent is required to submit this form' }),
  }),
  // Honeypot — must be empty
  website: z.string().max(0).optional().or(z.literal('')),
});

export const contactAdminUpdateSchema = z.object({
  status: z.enum(requestStatuses).optional(),
  internalNotes: z.string().max(5000).optional(),
});

// --- VPN plan / team quote request ------------------------------------------------

export const quoteRequestSchema = z.object({
  planInterest: z.enum(quotePlanInterests),
  useCase: z.enum(vpnUseCases),
  platforms: z
    .array(z.enum(devicePlatforms))
    .min(1, 'Select at least one device platform')
    .max(devicePlatforms.length)
    .refine((list) => new Set(list).size === list.length, 'Duplicate platforms'),
  users: z.number().int().min(1, 'At least one user').max(10000).default(1),
  regionPreference: optionalText(120),
  timeline: z.enum(quoteTimelines).optional(),
  requirements: optionalText(3000),
  companyName: optionalText(120),
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().email('Enter a valid email').max(254).toLowerCase(),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Consent is required to submit this form' }),
  }),
  website: z.string().max(0).optional().or(z.literal('')),
});

// --- Shared admin update schema for request-style collections -------------------

export const requestAdminUpdateSchema = z.object({
  status: z.enum(requestStatuses).optional(),
  internalNotes: z.string().max(5000).optional(),
});

export const adminUserStatusSchema = z.object({
  status: z.enum(userStatuses),
});

export const adminUserRoleSchema = z.object({
  role: z.enum(userRoles),
});

// --- Inferred types --------------------------------------------------------------

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  code?: string;
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;
