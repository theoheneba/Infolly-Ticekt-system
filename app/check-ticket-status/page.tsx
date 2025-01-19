'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { getPublicTicketStatus } from '@/app/actions'

export default function CheckTicketStatusPage() {
  const [ticketId, setTicketId] = useState('')
  const [ticketStatus, setTicketStatus] = useState<any>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const status = await getPublicTicketStatus(ticketId)
    setTicketStatus(status)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Check Ticket Status</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="ticketId" className="block text-sm font-medium text-gray-700">Ticket ID</label>
              <Input
                type="text"
                id="ticketId"
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Check Status</Button>
          </form>
          {ticketStatus && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Ticket Status:</h2>
              <p>Status: {ticketStatus.status}</p>
              <p>Last Updated: {new Date(ticketStatus.updatedAt).toLocaleString()}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

