import { Inter } from 'next/font/google'
import { getServerSession } from "next-auth/next"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UserMenu } from '@/components/user-menu'
import ErrorBoundary from '@/components/error-boundary'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export function generateStaticParams() {
  return [{ locale: 'en' }]
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  const session = await getServerSession()

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ErrorBoundary>
            <nav className="bg-white shadow-lg">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex">
                    <Link href="/" className="flex-shrink-0 flex items-center">
                      <img 
                        className="h-8 w-auto" 
                        src="https://sjc.microlink.io/Ahrg6tJhIrvey8KdzzTErCOKELj-8jBPhO8jftGOhbatmyS8kdsveE7HCpb2hwL6KlOvckobMWe9duCXIRGxmA.jpeg" 
                        alt="Infolly Support" 
                      />
                    </Link>
                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                      <Link href="/" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                        Home
                      </Link>
                      <Link href="/tickets" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                        My Tickets
                      </Link>
                    </div>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:items-center">
                    {session ? (
                      <UserMenu user={session.user} />
                    ) : (
                      <Button asChild variant="ghost">
                        <Link href="/login">Login</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </nav>
            <main>{children}</main>
          </ErrorBoundary>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

