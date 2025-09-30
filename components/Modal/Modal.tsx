// src/components/Modal/Modal.tsx
import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import css from './Modal.module.css'

interface ModalProps {
  onClose: () => void
  children: React.ReactNode
}

const modalRoot = document.getElementById('modal-root') ?? document.body

export default function Modal({ onClose, children }: ModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdrop}
      //   onClick={onClose}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  )
}
