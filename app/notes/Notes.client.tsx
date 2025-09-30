// app/notes/Notes.client.tsx
'use client'

import { useState } from 'react'
import {
  useQuery,
  useQueryClient,
  useMutation,
  keepPreviousData,
} from '@tanstack/react-query'
import { fetchNotes, createNote, deleteNote } from '@/lib/api'
import NoteList from '@/components/NoteList/NoteList'
import SearchBox from '@/components/SearchBox/SearchBox'
import Pagination from '@/components/Pagination/Pagination'
import NoteForm from '@/components/NoteForm/NoteForm'
import Modal from '@/components/Modal/Modal'
import { useDebouncedCallback } from 'use-debounce'
import type { CreateNoteRequest } from '@/types/note'

export default function NotesClient() {
  const [searchInput, setSearchInput] = useState('')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const queryClient = useQueryClient()

  const debouncedSetQuery = useDebouncedCallback((value: string) => {
    setQuery(value)
    setPage(1)
  }, 300)

  const handleSearch = (value: string) => {
    setSearchInput(value)
    debouncedSetQuery(value)
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', query, page],
    queryFn: () => fetchNotes(query, page),
    placeholderData: keepPreviousData,
  })

  const createMutation = useMutation({
    mutationFn: (payload: CreateNoteRequest) => createNote(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
  })

  return (
    <div>
      <header>
        <SearchBox value={searchInput} onSearch={handleSearch} />
        <button onClick={() => setIsModalOpen(true)}>Create note +</button>
      </header>

      {isLoading && <p>Loading, please wait...</p>}
      {error && (
        <p>Could not fetch the list of notes. {(error as Error).message}</p>
      )}

      {data && data.notes.length > 0 && (
        <NoteList
          notes={data.notes}
          onDelete={(id) => deleteMutation.mutate(id)}
        />
      )}

      {data && data.totalPages > 1 && (
        <Pagination
          pageCount={data.totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onSuccess={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
            onSubmit={(values) => createMutation.mutate(values)}
          />
        </Modal>
      )}
    </div>
  )
}
