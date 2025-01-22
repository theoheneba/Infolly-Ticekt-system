import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { SubmitTicketForm } from '@/components/submit-ticket-form'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default async function SubmitTicketPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const session = await getServerSession()
  const t = useTranslations('tickets')

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">{t('submitTicket')}</h1>
        <div className="max-w-md mx-auto text-center">
          <p className="mb-4">{t('loginRequired')}</p>
          <div className="space-x-4">
            <Button asChild>
              <Link href={`/${locale}/login?callbackUrl=/${locale}/submit-ticket`}>{t('login')}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/${locale}/register`}>{t('createAccount')}</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">{t('submitTicket')}</h1>
      <div className="max-w-2xl mx-auto">
        <SubmitTicketForm locale={locale} />
      </div>
    </div>
  )
}

