import type { UserConfig } from 'next-i18next';

const nextI18NextConfig: UserConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'lt'],
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};

export default nextI18NextConfig;
