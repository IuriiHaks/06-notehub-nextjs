import { QueryClient, dehydrate } from '@tanstack/react-query'
import { fetchNotes } from '@/lib/api'
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider'
import NotesClient from './Notes.client'

export default async function NotesPage() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['notes', ''],
    queryFn: () => fetchNotes('', 1, 10),
  })

  return (
    <TanStackProvider dehydratedState={dehydrate(queryClient)}>
      <NotesClient />
    </TanStackProvider>
  )
}
