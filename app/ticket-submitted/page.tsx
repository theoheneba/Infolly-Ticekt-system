import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function TicketSubmittedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Ticket Submitted Successfully</h1>
        <p className="text-gray-600 mb-6">Thank you for submitting your ticket. We will review it and get back to you as soon as possible.</p>
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  )
}

