import { getTicketById, getTicketMessages, getSupportStaff } from '@/lib/db'
import { TicketDetails } from '@/components/admin/ticket-details'
import { MessageList } from '@/components/admin/message-list'
import { AdminReplyForm } from '@/components/admin/admin-reply-form'

export default async function AdminTicketDetailPage({ params }: { params: { id: string } }) {
  const ticket = await getTicketById(params.id)
  const messages = await getTicketMessages(params.id)
  const supportStaff = await getSupportStaff()

  if (!ticket) {
    return <div>Ticket not found</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Ticket Details</h1>
      <TicketDetails ticket={ticket} supportStaff={supportStaff} />
      <MessageList messages={messages} />
      <AdminReplyForm ticketId={ticket.id} />
    </div>
  )
}

