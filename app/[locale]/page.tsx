import { Suspense } from 'react';
import {unstable_setRequestLocale} from 'next-intl/server';
import {getTranslations} from 'next-intl/server';
import Link from 'next/link'
import { getServerSession } from "next-auth/next"
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { TicketIcon, UserIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import { LoadingSpinner } from '@/components/loading-spinner'

type Props = {
  params: {locale: string};
};

export default async function Home({params: {locale}}: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  const session = await getServerSession()
  const t = await getTranslations('common')

  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {t('welcome')}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {t('welcomeDescription')}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg">
                <Link href={`/${locale}/submit-ticket`}>{t('submitTicket')}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={`/${locale}/tickets`}>{t('viewTickets')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">{t('fastSupport')}</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t('everythingYouNeed')}</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">{t('supportDescription')}</p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <Suspense fallback={<LoadingSpinner />}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TicketIcon className="h-5 w-5 mr-2 text-indigo-600" aria-hidden="true" />
                      {t('easyTicketSubmission')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{t('easyTicketSubmissionDescription')}</CardDescription>
                    <Button asChild variant="link" className="mt-4">
                      <Link href={`/${locale}/submit-ticket`}>
                        {t('submitTicket')} <span aria-hidden="true">→</span>
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </Suspense>
              <Suspense fallback={<LoadingSpinner />}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <UserIcon className="h-5 w-5 mr-2 text-indigo-600" aria-hidden="true" />
                      {t('dedicatedSupport')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{t('dedicatedSupportDescription')}</CardDescription>
                    <Button asChild variant="link" className="mt-4">
                      <Link href={`/${locale}/tickets`}>
                        {t('viewTickets')} <span aria-hidden="true">→</span>
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </Suspense>
              <Suspense fallback={<LoadingSpinner />}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ChartBarIcon className="h-5 w-5 mr-2 text-indigo-600" aria-hidden="true" />
                      {t('insightfulAnalytics')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{t('insightfulAnalyticsDescription')}</CardDescription>
                    {session?.user.role === 'admin' && (
                      <Button asChild variant="link" className="mt-4">
                        <Link href={`/${locale}/admin`}>
                          {t('viewAnalytics')} <span aria-hidden="true">→</span>
                        </Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Suspense>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

