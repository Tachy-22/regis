import ParticipantDetails from './ParticipantDetails'

interface PageProps {
  params: {
    id: string
  }
}

export default function ParticipantPage({ params }: PageProps) {
  return (
    <div className="container mx-auto p-4">
      <ParticipantDetails id={params.id} />
    </div>
  )
}
