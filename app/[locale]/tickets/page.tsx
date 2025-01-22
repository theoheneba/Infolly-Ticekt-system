import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import Link from 'next/link'
import { getUserTickets, getUserTicketCount } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Pagination } from '@/components/ui/pagination'
import { useTranslations } from 'next-intl'

export default async function UserTicketsPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string }
  searchParams: { page?: string }
}) {
  const session = await getServerSession()
  const t = useTranslations('tickets')

  if (!session) {
    redirect(`/${locale}/login`)
  }

  const page = parseInt(searchParams.page || '1')
  const limit = 10

  const tickets = await getUserTickets(session.user.id, page, limit)
  const totalTickets = await getUserTicketCount(session.user.id)
  const totalPages = Math.ceil(totalTickets / limit)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('myTickets')}</h1>
        <Button asChild>
          <Link href={`/${locale}/submit-ticket`}>{t('submitNewTicket')}</Link>
        </Button>
      </div>
      <div className="grid gap-6">
        {tickets.map((ticket: any) => (
          <Card key={ticket.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{ticket.subject}</CardTitle>
                <Badge variant={ticket.status === 'open' ? 'default' : 'secondary'}>
                  {ticket.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  {t('created')}: {new Date(ticket.created_at).toLocaleString()}
                </p>
                <Button asChild variant="outline">
                  <Link href={`/${locale}/tickets/${ticket.id}`}>{t('viewDetails')}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  )
}

