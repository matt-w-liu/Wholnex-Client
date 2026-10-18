import type { DevicePlatform } from '@wholnex/shared';

/**
 * WHOLNEX VPN app downloads.
 *
 * Only builds WHOLNEX has actually supplied are listed. The Windows installer was provided as
 * an NSIS setup.exe; its checksum and size below were measured from that file.
 *
 * Production hosting: the installer is ~59 MB, above Cloudflare Pages' 25 MiB per-file limit,
 * and it should not be committed to git. Upload it to release storage (e.g. Cloudflare R2,
 * S3, or GitHub Releases) and set VITE_WINDOWS_INSTALLER_URL at build time. Locally and on the
 * Docker/Nginx image it is served from public/downloads/.
 *
 * Before launch the installer should be Authenticode code-signed (it is currently unsigned)
 * and carry product/version metadata — then fill in `version` and set `signed: true`.
 */
export interface AppDownload {
  platform: DevicePlatform;
  label: string;
  url: string;
  fileName: string;
  sizeBytes: number;
  sha256: string;
  /** Published version string, or null until WHOLNEX supplies one. */
  version: string | null;
  signed: boolean;
  requirements: string;
}

const windowsUrl =
  (import.meta.env.VITE_WINDOWS_INSTALLER_URL as string | undefined)?.trim() || '/downloads/wholnex-vpn-setup.exe';

export const APP_DOWNLOADS: AppDownload[] = [
  {
    platform: 'windows',
    label: 'Windows',
    url: windowsUrl,
    fileName: 'wholnex-vpn-setup.exe',
    sizeBytes: 61_829_105,
    sha256: 'd5f725db72e84aafbdece70985d04ac1f3636a163d612206d3d3f4204d532c59',
    version: null,
    signed: false,
    requirements: 'Windows PC (64-bit). Administrator rights are typically needed to install a VPN network driver.',
  },
];

export const WINDOWS_DOWNLOAD = APP_DOWNLOADS.find((d) => d.platform === 'windows')!;

export function formatBytes(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
