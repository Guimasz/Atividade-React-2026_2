export function Toast({ toast, onClose }) {
  if (!toast) return null

  const isError = toast.type === 'error'

  return (
    <div
      className={'toast toast--' + toast.type}
      role={isError ? 'alert' : 'status'}
      aria-live={isError ? 'assertive' : 'polite'}
      aria-atomic="true"
    >
      <span className="toast-mark" aria-hidden="true">
        {isError ? '!' : toast.type === 'info' ? 'i' : '✓'}
      </span>
      <p>{toast.message}</p>
      <button
        className="toast-close"
        type="button"
        aria-label="Fechar notificação"
        onClick={onClose}
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>
  )
}
