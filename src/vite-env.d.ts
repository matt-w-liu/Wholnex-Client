/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_SITE_URL: string;
  /** Optional override for the public contact email (default support@wholnex.net). */
  readonly VITE_PUBLIC_CONTACT_EMAIL?: string;
  /** Development-only flag that previews draft plan data. Ignored in production builds. */
  readonly VITE_SHOW_DRAFT_PLAN_DATA?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
