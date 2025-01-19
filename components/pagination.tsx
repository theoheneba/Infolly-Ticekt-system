import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface PaginationProps {
  currentPage: number
  totalPages: number
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  return (
    <div className="flex justify-center mt-4">
      {currentPage > 1 && (
        <Button asChild className="mr-2">
          <Link href={`/admin/tickets?page=${currentPage - 1}`}>Previous</Link>
        </Button>
      )}
      {currentPage < totalPages && (
        <Button asChild>
          <Link href={`/admin/tickets?page=${currentPage + 1}`}>Next</Link>
        </Button>
      )}
    </div>
  )
}

