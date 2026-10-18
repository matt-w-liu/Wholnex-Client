import type { DevicePlatform } from '@wholnex/shared';
import { APP_DOWNLOADS } from '@/lib/download';

export interface PlatformInfo {
  id: DevicePlatform;
  name: string;
  /** True only when WHOLNEX has supplied an installable app for this platform. */
  available: boolean;
}

const AVAILABLE = new Set(APP_DOWNLOADS.map((download) => download.platform));

/**
 * App availability by platform. Derived from APP_DOWNLOADS so the site never advertises an app
 * that cannot actually be downloaded. Platforms without a build are shown as "not yet available".
 */
export const PLATFORMS: PlatformInfo[] = [
  { id: 'windows', name: 'Windows', available: AVAILABLE.has('windows') },
  { id: 'macos', name: 'macOS', available: AVAILABLE.has('macos') },
  { id: 'ios', name: 'iPhone & iPad', available: AVAILABLE.has('ios') },
  { id: 'android', name: 'Android', available: AVAILABLE.has('android') },
  { id: 'linux', name: 'Linux', available: AVAILABLE.has('linux') },
];

export const AVAILABLE_PLATFORMS = PLATFORMS.filter((platform) => platform.available);
