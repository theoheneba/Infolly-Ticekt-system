import Link from 'next/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export function TicketList({ tickets }: { tickets: any[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Subject</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Assigned To</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets.map((ticket) => (
          <TableRow key={ticket.id}>
            <TableCell>{ticket.id.slice(0, 8)}</TableCell>
            <TableCell>{ticket.subject}</TableCell>
            <TableCell>
              <Badge variant={ticket.status === 'open' ? 'success' : 'secondary'}>{ticket.status}</Badge>
            </TableCell>
            <TableCell>
              <Badge variant={ticket.priority === 'high' ? 'destructive' : ticket.priority === 'medium' ? 'warning' : 'default'}>
                {ticket.priority}
              </Badge>
            </TableCell>
            <TableCell>{ticket.assigned_to || 'Unassigned'}</TableCell>
            <TableCell>{new Date(ticket.created_at).toLocaleString()}</TableCell>
            <TableCell>
              <Link href={`/admin/tickets/${ticket.id}`} className="text-blue-600 hover:underline">
                View
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

