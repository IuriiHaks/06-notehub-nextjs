'use client'
import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import css from './Modal.module.css'

interface ModalProps {
  onClose: () => void
  children: React.ReactNode
}

// const modalRoot = document.getElementById('modal-root') ?? document.body

export default function Modal({ onClose, children }: ModalProps) {
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const el =
    typeof document !== 'undefined' ? document.getElementById('__next') : null
  if (!el) return null

  // const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
  //   if (e.target === e.currentTarget) onClose()

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    el
  )
}
