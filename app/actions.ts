'use server'

import * as db from '@/lib/db'
import { sendEmail } from '@/lib/email'
import { getServerSession } from "next-auth/next"

export async function submitTicket(subject: string, message: string) {
  const session = await getServerSession()
  if (!session || !session.user) {
    throw new Error('You must be logged in to submit a ticket')
  }

  const ticket = await db.createTicket(session.user.id, subject, message)
  // Send confirmation email to customer
  await sendEmail(
    session.user.email!,
    'Ticket Received',
    `
    <h2>Your ticket has been received</h2>
    <p>Thank you for contacting Infolly Support. We have received your ticket and will respond as soon as possible.</p>
    <p><strong>Ticket ID:</strong> ${ticket.id}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p>You can check the status of your ticket anytime by visiting our website and entering your ticket ID.</p>
    `
  )
  return ticket
}

export async function replyToTicket(formData: FormData) {
  const session = await getServerSession()
  if (!session) {
    throw new Error('Not authenticated')
  }

  const ticketId = formData.get('ticketId') as string
  const message = formData.get('message') as string
  const attachments = formData.getAll('attachments') as File[]

  const reply = await db.createMessage(ticketId, session.user.id, message)

  for (const attachment of attachments) {
    const fileName = attachment.name
    const filePath = `/uploads/${reply.id}/${fileName}`
    // Here you would save the file to your file storage system
    // For example: await saveFile(attachment, filePath)
    await db.createAttachment(reply.id, fileName, filePath)
  }

  const ticket = await db.getTicketById(ticketId)
  if (ticket) {
    // Send email notification to the appropriate recipient
    const recipient = session.user.role === 'admin' ? ticket.email : 'support@infolly.net'
    await sendEmail(
      recipient,
      'New Reply to Ticket',
      `
      <h2>New Reply to Ticket (ID: ${ticket.id})</h2>
      <p>A new reply has been added to your ticket.</p>
      <p><strong>Ticket Subject:</strong> ${ticket.subject}</p>
      <p><strong>Reply from:</strong> ${session.user.role === 'admin' ? 'Support Staff' : 'Customer'}</p>
      <p>Please log in to your account to view the full message and respond if necessary.</p>
      `
    )
  }

  return reply
}

export async function closeTicket(ticketId: string) {
  return db.closeTicket(ticketId)
}

export async function createSupportStaff(name: string, email: string, pictureUrl: string) {
  return db.createSupportStaff(name, email, pictureUrl)
}

export async function assignTicket(ticketId: string, staffId: string) {
  return db.assignTicket(ticketId, staffId)
}

