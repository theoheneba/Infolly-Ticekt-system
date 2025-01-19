import { getMessageAttachments } from '@/lib/db'

export async function AttachmentList({ messageId }: { messageId: string }) {
  const attachments = await getMessageAttachments(messageId)

  if (attachments.length === 0) {
    return null
  }

  return (
    <div className="mt-2">
      <h4 className="text-sm font-medium text-gray-900">Attachments:</h4>
      <ul className="mt-1 space-y-1">
        {attachments.map((attachment) => (
          <li key={attachment.id}>
            <a
              href={`/api/attachments/${attachment.id}`}
              className="text-sm text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {attachment.file_name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

