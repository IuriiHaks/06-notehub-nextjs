import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import css from './Modal.module.css'

// interface ModalProps {
//   onClose: () => void
//   children: React.ReactNode
// }

// // const modalRoot = document.getElementById('modal-root') ?? document.body

// export default function Modal({ onClose, children }: ModalProps) {
//   useEffect(() => {
//     const prev = document.body.style.overflow
//     document.body.style.overflow = 'hidden'

//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === 'Escape') onClose()
//     }
//     window.addEventListener('keydown', onKey)

//     // document.addEventListener('keydown', onKey)
//     //   return () => document.removeEventListener('keydown', onKey)
//     // }, [onClose])
//     return () => {
//       document.body.style.overflow = prev
//       window.removeEventListener('keydown', onKey)
//     }
//   }, [onClose])

//   const handleBackdrop = (e: React.MouseEvent) => {
//     if (e.target === e.currentTarget) onClose()
//   }

//   return createPortal(
//     <div
//       className={css.backdrop}
//       role="dialog"
//       aria-modal="true"
//       onClick={handleBackdrop}
//     >
//       <div className={css.modal}>{children}</div>
//     </div>,
//     // modalRoot
//     document.body
//   )
// }

interface ModalProps {
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ onClose, children }: ModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

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

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  // 🔹 Поки компонент не змонтований у браузері — нічого не рендеримо
  if (!mounted) return null

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdrop}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body
  )
}
