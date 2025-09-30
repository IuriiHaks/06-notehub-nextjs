// import axios from 'axios'
// import { Note } from '../types/note'

// // axios.defaults.baseURL = 'https://next-docs-api.onrender.com';
// axios.defaults.baseURL = 'http://localhost:4000'

// interface NoteResponse {
//   notes: Note[]
//   total: number
// }

// export const getNotes = async () => {
//   const { data } = await axios.get<NoteResponse>('/nods')
//   return data.notes
// }

import axios from 'axios'
import type { Note, CreateNoteRequest } from '../types/note'

const API_URL = 'https://notehub-public.goit.study/api'
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
})

export interface NotesResponse {
  notes: Note[]
  totalPages: number
}

// export async function fetchNotes(
//   search: string,
//   page: number = 1,
//   perPage: number = 10
// ): Promise<NotesResponse> {
//   const { data } = await api.get<NotesResponse>('/notes', {
//     params: { search, page, perPage },
//   })
//   return data
// }

// Фетч списку нотаток з параметрами (search, page, perPage)
export async function fetchNotes(
  search = '',
  page = 1,
  perPage = 10
): Promise<NotesResponse> {
  const params: Record<string, string | number> = { page, perPage }
  if (search && search.trim()) params.search = search
  const { data } = await api.get<NotesResponse>('/notes', { params })
  return data
}

export async function fetchNoteById(id: string): Promise<Note> {
  // API might return the note object directly or wrapped — adapt if needed
  const { data } = await api.get<Note>(`/notes/${id}`)
  return data
}

export async function createNote(payload: CreateNoteRequest): Promise<Note> {
  const { data } = await api.post<Note>('/notes', payload)
  return data
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`)
  return data
}
