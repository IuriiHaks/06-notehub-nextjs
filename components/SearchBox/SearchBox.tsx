'use client'

import css from './SearchBox.module.css'

interface Props {
  value: string
  onSearch: (value: string) => void
}

export default function SearchBox({ value, onSearch }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onSearch(e.target.value)

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={value}
      onChange={handleChange}
    />
  )
}
