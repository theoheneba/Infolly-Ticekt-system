import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { getTicketById, getTicketMessages } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MessageList } from '@/components/message-list'
import { UserReplyForm } from '@/components/user-reply-form'
import { useTranslations } from 'next-intl'

export default async function UserTicketDetailPage({ 
  params: { locale, id } 
}: { 
  params: { locale: string, id: string } 
}) {
  const session = await getServerSession()
  const t = useTranslations('tickets')

  if (!session) {
    redirect('/login')
  }

  const ticket = await getTicketById(id)
  const messages = await getTicketMessages(id)

  if (!ticket || ticket.user_id !== session.user.id) {
    return <div>{t('ticketNotFound')}</div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-2xl font-bold">{ticket.subject}</CardTitle>
            <Badge variant={ticket.status === 'open' ? 'default' : 'secondary'}>
              {ticket.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {t('created')}: {new Date(ticket.created_at).toLocaleString()}
          </p>
          <p><strong>{t('ticketId')}:</strong> {ticket.id}</p>
        </CardContent>
      </Card>
      <MessageList messages={messages} />
      {ticket.status === 'open' && <UserReplyForm ticketId={ticket.id} />}
    </div>
  )
}

