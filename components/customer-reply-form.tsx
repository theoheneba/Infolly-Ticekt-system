'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { replyToTicket } from '@/app/actions'

export function CustomerReplyForm({ ticketId }: { ticketId: string }) {
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Reply</label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="attachments" className="block text-sm font-medium text-gray-700">Attachments</label>
        <Input
          id="attachments"
          type="file"
          onChange={handleFileChange}
          multiple
        />
      </div>
      <Button type="submit">Send Reply</Button>
    </form>
  )
}

