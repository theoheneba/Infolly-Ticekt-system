'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([])
  const [inputMessage, setInputMessage] = useState('')

  useEffect(() => {
    // Here you would typically connect to your chat server
    // For this example, we'll just simulate receiving a message
    const timer = setTimeout(() => {
      setMessages([{ sender: 'Agent', text: 'Hello! How can I help you today?' }])
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const sendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { sender: 'User', text: inputMessage }])
      setInputMessage('')
      // Here you would typically send the message to your chat server
    }
  }

  return (
    <div className="fixed bottom-4 right-4">
      {!isOpen ? (
        <Button onClick={() => setIsOpen(true)}>Chat with us</Button>
      ) : (
        <Card className="w-80">
          <CardHeader>
            <CardTitle>Live Chat</CardTitle>
          </CardHeader>
          <CardContent className="h-64 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.sender === 'User' ? 'text-right' : ''}`}>
                <span className="font-bold">{msg.sender}: </span>
                {msg.text}
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message..."
              className="mr-2"
            />
            <Button onClick={sendMessage}>Send</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

