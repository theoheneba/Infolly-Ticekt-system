import { getSupportStaff } from '@/lib/db'
import { AddSupportStaffForm } from '@/components/add-support-staff-form'

export default async function SupportStaffPage() {
  const staff = await getSupportStaff()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Support Staff Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Current Staff</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {staff.map((member: any) => (
              <div key={member.id} className="bg-white shadow rounded-lg p-4 flex items-center space-x-4">
                <img src={member.picture_url || "/placeholder.svg"} alt={member.name} className="w-12 h-12 rounded-full" />
                <div>
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Add New Staff Member</h2>
          <AddSupportStaffForm />
        </div>
      </div>
    </div>
  )
}

