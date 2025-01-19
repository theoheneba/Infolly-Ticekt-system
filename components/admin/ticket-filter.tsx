'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

export function TicketFilter() {
  const router = useRouter()
  const [status, setStatus] = useState('all')
  const [priority, setPriority] = useState('all')
  const [assignedTo, setAssignedTo] = useState('all')
  const [sort, setSort] = useState('created_at:desc')

  const handleFilter = () => {
    router.push(`/admin/tickets?status=${status}&priority=${priority}&assignedTo=${assignedTo}&sort=${sort}`)
  }

  return (
    <div className="mb-6 flex space-x-4">
      <Select value={status} onValueChange={setStatus}>
        <option value="all">All Status</option>
        <option value="open">Open</option>
        <option value="closed">Closed</option>
      </Select>
      <Select value={priority} onValueChange={setPriority}>
        <option value="all">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </Select>
      <Select value={assignedTo} onValueChange={setAssignedTo}>
        <option value="all">All Staff</option>
        <option value="unassigned">Unassigned</option>
        {/* Add options for each support staff member */}
      </Select>
      <Select value={sort} onValueChange={setSort}>
        <option value="created_at:desc">Newest First</option>
        <option value="created_at:asc">Oldest First</option>
        <option value="priority:desc">Highest Priority</option>
        <option value="priority:asc">Lowest Priority</option>
      </Select>
      <Button onClick={handleFilter}>Apply Filters</Button>
    </div>
  )
}

