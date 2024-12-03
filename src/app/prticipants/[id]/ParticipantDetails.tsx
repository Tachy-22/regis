
'use client'
import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'

interface ParticipantDetailsProps {
  id: string
}

export default function ParticipantDetails({ id }: ParticipantDetailsProps) {
  const [participant, setParticipant] = useState<any>(null)

  useEffect(() => {
    const participants = JSON.parse(localStorage.getItem('participants') || '[]')
    const found = participants.find((p: any) => p.id === id)
    if (!found) {
      notFound()
    }
    setParticipant(found)
  }, [id])

  if (!participant) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-4">Participant Details</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">Name:</p>
          <p className="font-medium">{participant.name}</p>
        </div>
        <div>
          <p className="text-gray-600">Email:</p>
          <p className="font-medium">{participant.email}</p>
        </div>
        <div>
          <p className="text-gray-600">Phone:</p>
          <p className="font-medium">{participant.phone}</p>
        </div>
        <div>
          <p className="text-gray-600">Registration Date:</p>
          <p className="font-medium">
            {new Date(participant.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  )
}