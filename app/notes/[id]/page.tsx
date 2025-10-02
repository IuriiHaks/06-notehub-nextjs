import { dehydrate, QueryClient } from '@tanstack/react-query'
import { fetchNoteById } from '@/lib/api'
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider'
import NoteDetailsClient from './NoteDetails.client'

interface Props {
  params: { id: string } // просто об'єкт, не Promise
}

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  })

  return (
    <TanStackProvider dehydratedState={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </TanStackProvider>
  )
}
