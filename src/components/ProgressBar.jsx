export function ProgressBar({ label, value, variant = 'light' }) {
  const safeValue = Math.max(0, Math.min(100, Number(value) || 0))
  const variantClass = variant === 'dark' ? ' progress-meter--dark' : ''

  return (
    <div className="progress-component">
      <div className="progress-label">
        <span>{label}</span>
        <strong>{safeValue}%</strong>
      </div>
      <progress
        className={'progress-meter' + variantClass}
        value={safeValue}
        max="100"
        aria-label={label}
      >
        {safeValue}%
      </progress>
    </div>
  )
}
