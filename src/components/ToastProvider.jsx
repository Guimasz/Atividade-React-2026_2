import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Toast } from './Toast.jsx'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)
  const timerRef = useRef(null)

  function showToast(message, type = 'success') {
    window.clearTimeout(timerRef.current)
    setToast({ message, type })
    timerRef.current = window.setTimeout(() => setToast(null), 3800)
  }

  function dismissToast() {
    window.clearTimeout(timerRef.current)
    timerRef.current = null
    setToast(null)
  }

  useEffect(
    () => () => {
      window.clearTimeout(timerRef.current)
    },
    [],
  )

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast toast={toast} onClose={dismissToast} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast precisa ser usado dentro de ToastProvider.')
  }

  return context
}
