'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { assignTicket } from '@/app/actions'

interface SupportStaff {
  id: string
  name: string
  picture_url: string
}

interface AssignStaffFormProps {
  ticketId: string
  supportStaff: SupportStaff[]
}

export function AssignStaffForm({ ticketId, supportStaff }: AssignStaffFormProps) {
  const [selectedStaff, setSelectedStaff] = useState('')
  const router = useRouter()

  const handleAssign = async () => {
    if (selectedStaff) {
      await assignTicket(ticketId, selectedStaff)
      router.refresh()
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Select value={selectedStaff} onValueChange={setSelectedStaff}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select staff member" />
        </SelectTrigger>
        <SelectContent>
          {supportStaff.map((staff) => (
            <SelectItem key={staff.id} value={staff.id}>
              <div className="flex items-center space-x-2">
                <img src={staff.picture_url || "/placeholder.svg"} alt={staff.name} className="w-6 h-6 rounded-full" />
                <span>{staff.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={handleAssign} disabled={!selectedStaff}>Assign</Button>
    </div>
  )
}

