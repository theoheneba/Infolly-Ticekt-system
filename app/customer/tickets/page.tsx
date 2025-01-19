import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import Link from 'next/link'
import { getUserTickets } from '@/lib/db'
import { Pagination } from '@/components/pagination'

export default async function CustomerTicketsPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const session = await getServerSession()

  if (!session || session.user.role !== 'customer') {
    redirect('/login')
  }

  const page = parseInt(searchParams.page || '1')
  const limit = 10

  const tickets = await getUserTickets(session.user.id, page, limit)
  const totalTickets = await getUserTicketCount(session.user.id)
  const totalPages = Math.ceil(totalTickets / limit)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">My Tickets</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {tickets.map((ticket) => (
            <li key={ticket.id}>
              <Link href={`/customer/tickets/${ticket.id}`} className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {ticket.subject}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        ticket.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {ticket.status}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        ID: {ticket.id.slice(0, 8)}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>
                        Created at: {new Date(ticket.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  )
}

