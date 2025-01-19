import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import Link from 'next/link'
import { getUserTickets, getUserTicketCount } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Pagination } from '@/components/ui/pagination'

export default async function UserTicketsPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const session = await getServerSession()

  if (!session) {
    redirect('/login')
  }

  const page = parseInt(searchParams.page || '1')
  const limit = 10

  const tickets = await getUserTickets(session.user.id, page, limit)
  const totalTickets = await getUserTicketCount(session.user.id)
  const totalPages = Math.ceil(totalTickets / limit)

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Tickets</h1>
      <div className="space-y-4 mb-6">
        {tickets.map((ticket: any) => (
          <Card key={ticket.id}>
            <CardHeader>
              <CardTitle>{ticket.subject}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <Badge variant={ticket.status === 'open' ? 'success' : 'secondary'}>{ticket.status}</Badge>
                <p className="text-sm text-gray-500">Created: {new Date(ticket.created_at).toLocaleString()}</p>
              </div>
              <Button asChild className="mt-4">
                <Link href={`/tickets/${ticket.id}`}>View Details</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  )
}

