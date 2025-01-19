'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'
import { submitTicket } from '@/app/actions'
import { useTranslations } from 'next-intl'

const formSchema = z.object({
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(20, {
    message: "Message must be at least 20 characters.",
  }),
})

export function SubmitTicketForm({ locale }: { locale: string }) {
  const router = useRouter()
  const t = useTranslations('tickets')
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await submitTicket(values.subject, values.message)
      toast({
        title: t('ticketSubmitted'),
        description: t('ticketSubmittedDescription'),
      })
      router.push(`/${locale}/tickets`)
    } catch (error) {
      toast({
        title: t('error'),
        description: t('unexpectedError'),
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('subject')}</FormLabel>
              <FormControl>
                <Input placeholder={t('subjectPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('message')}</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={t('messagePlaceholder')}
                  className="min-h-[200px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">{t('submitTicket')}</Button>
      </form>
    </Form>
  )
}

