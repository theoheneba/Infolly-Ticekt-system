import { Card, CardContent } from '@/components/ui/card'
import { AttachmentList } from '@/components/attachment-list'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useTranslations } from 'next-intl'

export function MessageList({ messages }: { messages: any[] }) {
  const t = useTranslations('messages')

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('messages')}</h2>
      {messages.map((message) => (
        <Card key={message.id} className="hover:shadow-md transition-shadow duration-300">
          <CardContent className="p-4">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src={message.user_role === 'admin' ? '/admin-avatar.png' : '/user-avatar.png'} />
                <AvatarFallback>{message.user_role === 'admin' ? 'A' : 'U'}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold">
                    {message.user_role === 'admin' ? t('supportAgent') : t('you')}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(message.created_at).toLocaleString()}
                  </p>
                </div>
                <p className="text-sm">{message.content}</p>
                <AttachmentList messageId={message.id} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

