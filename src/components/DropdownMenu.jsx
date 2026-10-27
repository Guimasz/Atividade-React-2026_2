import { useEffect, useId, useRef, useState } from 'react'

export function DropdownMenu({ label, options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)
  const triggerRef = useRef(null)
  const menuId = useId()
  const selectedOption = options.find((option) => option.value === value) ?? options[0]

  useEffect(() => {
    if (!isOpen) return undefined

    function closeWhenClickingOutside(event) {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false)
      }
    }

    function closeWithEscape(event) {
      if (event.key === 'Escape') {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', closeWhenClickingOutside)
    document.addEventListener('keydown', closeWithEscape)

    return () => {
      document.removeEventListener('pointerdown', closeWhenClickingOutside)
      document.removeEventListener('keydown', closeWithEscape)
    }
  }, [isOpen])

  function selectOption(option) {
    onChange(option.value)
    setIsOpen(false)
    triggerRef.current?.focus()
  }

  return (
    <div className="dropdown" ref={containerRef}>
      <span className="dropdown-label">{label}</span>
      <button
        className="dropdown-trigger"
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span>{selectedOption.label}</span>
        <span className="dropdown-chevron" aria-hidden="true">⌄</span>
      </button>
      {isOpen && (
        <div className="dropdown-menu" id={menuId} role="group" aria-label={label}>
          {options.map((option) => (
            <button
              className="dropdown-option"
              type="button"
              aria-pressed={option.value === value}
              key={option.value}
              onClick={() => selectOption(option)}
            >
              <span>{option.label}</span>
              <span className="option-check" aria-hidden="true">
                {option.value === value ? '✓' : ''}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
