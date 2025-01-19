import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { getTicketById, getTicketMessages } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MessageList } from '@/components/message-list'
import { UserReplyForm } from '@/components/user-reply-form'

export default async function UserTicketDetailPage({ params }: { params: { id: string } }) {
  const session = await getServerSession()

  if (!session) {
    redirect('/login')
  }

  const ticket = await getTicketById(params.id)
  const messages = await getTicketMessages(params.id)

  if (!ticket || ticket.user_id !== session.user.id) {
    return <div>Ticket not found</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Ticket Details</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{ticket.subject}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Badge variant={ticket.status === 'open' ? 'success' : 'secondary'}>{ticket.status}</Badge>
            <p className="text-sm text-gray-500">Created: {new Date(ticket.created_at).toLocaleString()}</p>
          </div>
          <p><strong>Ticket ID:</strong> {ticket.id}</p>
        </CardContent>
      </Card>
      <MessageList messages={messages} />
      {ticket.status === 'open' && <UserReplyForm ticketId={ticket.id} />}
    </div>
  )
}

