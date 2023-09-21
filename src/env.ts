const envList = [
  'NEXT_PUBLIC_ACCESS_KEY',
  'NEXT_PUBLIC_SECRET_KEY',
  'NEXT_PUBLIC_UNSPLASH_API_URL',
] as const;

export const ENV = {
  NEXT_PUBLIC_ACCESS_KEY: process.env.NEXT_PUBLIC_ACCESS_KEY,
  NEXT_PUBLIC_SECRET_KEY: process.env.NEXT_PUBLIC_SECRET_KEY,
  NEXT_PUBLIC_UNSPLASH_API_URL: process.env.NEXT_PUBLIC_UNSPLASH_API_URL,
} as { [key in (typeof envList)[number]]: string };
