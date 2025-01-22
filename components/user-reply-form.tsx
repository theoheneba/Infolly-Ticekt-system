'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { replyToTicket } from '@/app/actions'
import { useTranslations } from 'next-intl'
import { toast } from '@/components/ui/use-toast'

export function UserReplyForm({ ticketId }: { ticketId: string }) {
  const [message, setMessage] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const t = useTranslations('tickets')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData()
    formData.append('message', message)
    formData.append('ticketId', ticketId)
    files.forEach((file) => formData.append('attachments', file))

    try {
      await replyToTicket(formData)
      setMessage('')
      setFiles([])
      toast({
        title: t('replySuccess'),
        description: t('replySuccessDescription'),
      })
      router.refresh()
    } catch (error) {
      toast({
        title: t('replyError'),
        description: t('replyErrorDescription'),
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">{t('addReply')}</h3>
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={t('replyPlaceholder')}
        required
        className="min-h-[100px]"
      />
      <div>
        <Input
          id="attachments"
          type="file"
          onChange={handleFileChange}
          multiple
          className="mb-2"
        />
        <p className="text-sm text-muted-foreground">{t('attachmentHelp')}</p>
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? t('sending') : t('sendReply')}
      </Button>
    </form>
  )
}

