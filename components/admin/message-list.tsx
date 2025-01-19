import { Card, CardContent } from '@/components/ui/card'
import { AttachmentList } from '@/components/attachment-list'

export function MessageList({ messages }: { messages: any[] }) {
  return (
    <div className="space-y-4 mb-6">
      <h2 className="text-2xl font-bold">Messages</h2>
      {messages.map((message) => (
        <Card key={message.id}>
          <CardContent className="p-4">
            <p className="mb-2">{message.content}</p>
            <AttachmentList messageId={message.id} />
            <p className="text-sm text-gray-500">
              {message.user_role === 'admin' ? 'Admin' : 'Customer'} - {new Date(message.created_at).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

