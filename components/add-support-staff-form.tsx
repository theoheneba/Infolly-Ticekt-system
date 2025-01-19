'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createSupportStaff } from '@/app/actions'

export function AddSupportStaffForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pictureUrl, setPictureUrl] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createSupportStaff(name, email, pictureUrl)
    setName('')
    setEmail('')
    setPictureUrl('')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="pictureUrl">Picture URL</Label>
        <Input
          id="pictureUrl"
          type="url"
          value={pictureUrl}
          onChange={(e) => setPictureUrl(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Add Staff Member</Button>
    </form>
  )
}

