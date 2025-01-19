'use client'

import { useState } from 'react'
import { Select } from '@/components/ui/select'

const CANNED_RESPONSES = [
  {
    id: 1,
    title: 'Greeting',
    content: 'Hello! Thank you for contacting our support team. How may I assist you today?'
  },
  {
    id: 2,
    title: 'Closing',
    content: 'Is there anything else I can help you with? If not, thank you for using our service!'
  },
  {
    id: 3,
    title: 'Apology',
    content: 'I apologize for any inconvenience this may have caused. We\'re working to resolve the issue as quickly as possible.'
  }
]

export function CannedResponses({ onSelect }: { onSelect: (content: string) => void }) {
  const [selectedResponse, setSelectedResponse] = useState('')

  const handleSelect = (value: string) => {
    setSelectedResponse(value)
    const response = CANNED_RESPONSES.find(r => r.id.toString() === value)
    if (response) {
      onSelect(response.content)
    }
  }

  return (
    <Select value={selectedResponse} onValueChange={handleSelect}>
      <option value="">Select a canned response</option>
      {CANNED_RESPONSES.map(response => (
        <option key={response.id} value={response.id.toString()}>
          {response.title}
        </option>
      ))}
    </Select>
  )
}

