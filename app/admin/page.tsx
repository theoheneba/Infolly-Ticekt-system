import { getTicketCount, getOpenTicketCount, getClosedTicketCount } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function AdminDashboard() {
  const totalTickets = await getTicketCount()
  const openTickets = await getOpenTicketCount()
  const closedTickets = await getClosedTicketCount()

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
        <Card>
          <CardHeader>
            <CardTitle>Closed Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-red-600">{closedTickets}</p>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-4">
        <Button asChild>
          <Link href="/admin/tickets">Manage Tickets</Link>
        </Button>
        <Button asChild className="ml-4">
          <Link href="/admin/users">Manage Users</Link>
        </Button>
        <Button asChild className="ml-4">
          <Link href="/admin/support-staff">Manage Support Staff</Link>
        </Button>
      </div>
    </div>
  )
}

