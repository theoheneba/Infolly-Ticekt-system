'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function SearchForm() {
  const [search, setSearch] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/admin/tickets?search=${encodeURIComponent(search)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex">
      <Input
        type="text"
        placeholder="Search tickets..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mr-2"
      />
      <Button type="submit">Search</Button>
    </form>
  )
}

