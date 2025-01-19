import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { SubmitTicketForm } from '@/components/submit-ticket-form'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function SubmitTicketPage() {
  const session = await getServerSession()

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Submit a Ticket</h1>
        <div className="max-w-md mx-auto text-center">
          <p className="mb-4">You need to be logged in to submit a ticket.</p>
          <div className="space-x-4">
            <Button asChild>
              <Link href="/login?callbackUrl=/submit-ticket">Login</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/register">Create an Account</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Submit a Ticket</h1>
      <div className="max-w-2xl mx-auto">
        <SubmitTicketForm />
      </div>
    </div>
  )
}

