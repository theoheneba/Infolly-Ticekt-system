import {unstable_setRequestLocale} from 'next-intl/server';
import {NextIntlClientProvider, useMessages} from 'next-intl';
import { Inter } from 'next/font/google';
import {getServerSession} from "next-auth/next";
import {locales} from '@/i18n/locales';
import {notFound} from 'next/navigation';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {UserNav} from '@/components/user-nav';
import ErrorBoundary from '@/components/error-boundary';
import {ThemeProvider} from '@/components/theme-provider';
import {Toaster} from '@/components/ui/toaster';

const inter = Inter({subsets: ['latin']});

type Props = {
  children: React.ReactNode;
  params: {locale: string};
};

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({children, params: {locale}}: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  const messages = useMessages();
  const session = await getServerSession();

  return (
    <html lang={locale} className="h-full bg-gray-100">
      <body className={`${inter.className} h-full`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ErrorBoundary>
              <div className="min-h-full">
                <nav className="bg-white shadow-sm">
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                      <div className="flex">
                        <div className="flex flex-shrink-0 items-center">
                          <img
                            className="h-8 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Infolly"
                          />
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                          <Link href={`/${locale}`} className="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900">
                            Home
                          </Link>
                          <Link href={`/${locale}/tickets`} className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                            Tickets
                          </Link>
                          {session?.user.role === 'admin' && (
                            <Link href={`/${locale}/admin`} className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                              Admin
                            </Link>
                          )}
                        </div>
                      </div>
                      <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        {session ? (
                          <UserNav user={session.user} />
                        ) : (
                          <Button asChild variant="ghost">
                            <Link href={`/${locale}/login`}>Login</Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </nav>

                <div className="py-10">
                  <main>
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                      {children}
                    </div>
                  </main>
                </div>
              </div>
            </ErrorBoundary>
          </NextIntlClientProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

