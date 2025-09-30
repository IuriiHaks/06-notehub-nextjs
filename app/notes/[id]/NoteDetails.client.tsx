// app/notes/[id]/NoteDetails.client.tsx
'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchNoteById } from '@/lib/api'
import css from './NoteDetails.module.css'
// import type { Note } from '@/types/note'

interface Props {
  id?: string // route param as string
}

export default function NoteDetailsClient({ id }: Props) {
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id!),
    enabled: !!id,
  })

  if (isLoading) return <p>Loading, please wait...</p>
  if (error || !note) return <p>Something went wrong.</p>

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{new Date(note.createdAt).toLocaleString()}</p>
      </div>
    </div>
  )
}
