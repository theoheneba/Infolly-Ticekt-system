import { getTickets, getTicketCount } from '@/lib/db'
import { TicketList } from '@/components/admin/ticket-list'
import { TicketFilter } from '@/components/admin/ticket-filter'
import { Pagination } from '@/components/ui/pagination'

export default async function AdminTicketsPage({
  searchParams,
}: {
  searchParams: { page?: string; status?: string; priority?: string; assignedTo?: string; sort?: string }
}) {
  const page = parseInt(searchParams.page || '1')
  const limit = 10
  const status = searchParams.status || 'all'
  const priority = searchParams.priority || 'all'
  const assignedTo = searchParams.assignedTo || 'all'
  const sort = searchParams.sort || 'created_at:desc'

  const tickets = await getTickets(page, limit, { status, priority, assignedTo, sort })
  const totalTickets = await getTicketCount({ status, priority, assignedTo })
  const totalPages = Math.ceil(totalTickets / limit)

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Tickets</h1>
      <TicketFilter />
      <TicketList tickets={tickets} />
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  )
}

