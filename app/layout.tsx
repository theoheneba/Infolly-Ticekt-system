import './globals.css'
import { Inter } from 'next/font/google'
import { getServerSession } from "next-auth/next"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UserNav } from '@/components/user-nav'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { Suspense } from 'react'
import { LoadingSpinner } from '@/components/loading-spinner'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <Suspense fallback={<LoadingSpinner />}>
              <Header />
            </Suspense>
            <main className="flex-grow container mx-auto px-4 py-8">
              <Suspense fallback={<LoadingSpinner />}>
                {children}
              </Suspense>
            </main>
            <footer className="bg-background border-t py-6">
              <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} Infolly Support. All rights reserved.
              </div>
            </footer>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

async function Header() {
  const session = await getServerSession()

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <img 
              src="https://sjc.microlink.io/Ahrg6tJhIrvey8KdzzTErCOKELj-8jBPhO8jftGOhbatmyS8kdsveE7HCpb2hwL6KlOvckobMWe9duCXIRGxmA.jpeg" 
              alt="Infolly Support" 
              className="h-8 w-auto"
            />
            <span className="font-bold text-xl">Infolly</span>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="/tickets" className="text-sm font-medium transition-colors hover:text-primary">
              Tickets
            </Link>
            <Link href="/submit-ticket" className="text-sm font-medium transition-colors hover:text-primary">
              Submit Ticket
            </Link>
            {session ? (
              <UserNav user={session.user} />
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

