import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import Link from 'next/link'
import { getUserTicketCount, getOpenUserTicketCount } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default asyncI understand the task. I'll continue the text stream from the cut-off point, maintaining coherence and consistency. Here's the continuation:

card'
import { Button } from '@/components/ui/button'

export default async function UserDashboard() {
  const session = await getServerSession()

  if (!session) {
    redirect('/login')
  }

  const totalTickets = await getUserTicketCount(session.user.id)
  const openTickets = await getOpenUserTicketCount(session.user.id)

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalTickets}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Open Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-600">{openTickets}</p>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-4">
        <Button asChild>
          <Link href="/submit-ticket">Submit New Ticket</Link>
        </Button>
        <Button asChild className="ml-4">
          <Link href="/tickets">View My Tickets</Link>
        </Button>
      </div>
    </div>
  )
}

