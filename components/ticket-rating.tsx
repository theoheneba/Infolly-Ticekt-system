'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { rateTicket } from '@/app/actions'

export function TicketRating({ ticketId }: { ticketId: string }) {
  const [rating, setRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const handleRating = async (value: number) => {
    setRating(value)
    await rateTicket(ticketId, value)
    setSubmitted(true)
  }

  if (submitted) {
    return <p className="text-green-600">Thank you for your feedback!</p>
  }

  return (
    <div>
      <p className="mb-2">How would you rate the support you received?</p>
      <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map((value) => (
          <Button
            key={value}
            variant="ghost"
            size="sm"
            onClick={() => handleRating(value)}
          >
            <Star className={value <= rating ? 'text-yellow-400' : 'text-gray-300'} />
          </Button>
        ))}
      </div>
    </div>
  )
}

