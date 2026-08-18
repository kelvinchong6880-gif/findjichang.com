export const devices = ['windows', 'macos', 'android', 'ios', 'router'] as const;
export const clients = ['clash-verge', 'mihomo-party', 'sing-box', 'shadowrocket', 'surge', 'v2rayng'] as const;
export const useCases = ['budget', 'stable', 'low-latency', 'streaming', 'ai', 'gaming', 'large-traffic', 'beginner'] as const;
export const lineTypes = ['direct', 'transit', 'iplc', 'iepl', 'unknown'] as const;
export const contentTypes = ['recommendation', 'review', 'speed-test', 'guide', 'knowledge', 'comparison'] as const;

export type Device = typeof devices[number];
export type Client = typeof clients[number];
export type UseCase = typeof useCases[number];
export type LineType = typeof lineTypes[number];

export const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const isValidSlug = (value: string) => slugPattern.test(value);

