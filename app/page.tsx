import Link from 'next/link'
import { getServerSession } from "next-auth/next"
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export default async function Home() {
  const session = await getServerSession()

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
        Welcome to Infolly Ticket System
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl">Submit a Ticket</CardTitle>
            <CardDescription>Need help? Submit a new support ticket.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/submit-ticket">Submit Ticket</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl">View Your Tickets</CardTitle>
            <CardDescription>Check the status of your existing tickets.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/tickets">View Tickets</Link>
            </Button>
          </CardContent>
        </Card>
        {session ? (
          session.user.role === 'admin' && (
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
                <CardDescription>Manage tickets and support staff.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/admin">Go to Dashboard</Link>
                </Button>
              </CardContent>
            </Card>
          )
        ) : (
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl">Create an Account</CardTitle>
              <CardDescription>Sign up to manage your support tickets.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/register">Register</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

