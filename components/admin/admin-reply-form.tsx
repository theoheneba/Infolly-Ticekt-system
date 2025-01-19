'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { replyToTicket, closeTicket } from '@/app/actions'

export function AdminReplyForm({ ticketId }: { ticketId: string }) {
  const [message, setMessage] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('message', message)
    formData.append('ticketId', ticketId)
    files.forEach((file) => formData.append('attachments', file))

    await replyToTicket(formData)
    setMessage('')
    setFiles([])
    router.refresh()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleCloseTicket = async () => {
    await closeTicket(ticketId)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold">Reply to Ticket</h2>
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your reply here..."
        rows={5}
      />
      <Input
        type="file"
        onChange={handleFileChange}
        multiple
      />
      <div className="flex space-x-4">
        <Button type="submit">Send Reply</Button>
        <Button type="button" variant="outline" onClick={handleCloseTicket}>Close Ticket</Button>
      </div>
    </form>
  )
}

