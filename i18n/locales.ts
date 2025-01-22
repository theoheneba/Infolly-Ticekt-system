import {createSharedPathnamesNavigation} from 'next-intl/navigation';
 
export const locales = ['en', 'es'] as const;
export const defaultLocale = 'en';

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createSharedPathnamesNavigation({locales});

export async function requestLocale() {
  // In real applications, you might want to get the locale from a cookie or header
  return defaultLocale;
}

