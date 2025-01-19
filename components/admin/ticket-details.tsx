'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { updateTicket } from '@/app/actions'

export function TicketDetails({ ticket, supportStaff }: { ticket: any; supportStaff: any[] }) {
  const [status, setStatus] = useState(ticket.status)
  const [priority, setPriority] = useState(ticket.priority)
  const [assignedTo, setAssignedTo] = useState(ticket.assigned_to)

  const handleUpdate = async () => {
    await updateTicket(ticket.id, { status, priority, assignedTo })
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{ticket.subject}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p><strong>Customer:</strong> {ticket.customer_name}</p>
            <p><strong>Email:</strong> {ticket.customer_email}</p>
            <p><strong>Created At:</strong> {new Date(ticket.created_at).toLocaleString()}</p>
          </div>
          <div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <Select value={status} onValueChange={setStatus}>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </Select>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <Select value={priority} onValueChange={setPriority}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">Assigned To</label>
              <Select value={assignedTo} onValueChange={setAssignedTo}>
                <option value="">Unassigned</option>
                {supportStaff.map((staff) => (
                  <option key={staff.id} value={staff.id}>{staff.name}</option>
                ))}
              </Select>
            </div>
            <Button onClick={handleUpdate}>Update Ticket</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

