import { useState } from 'react'

export function Accordion({ items }) {
  const [openId, setOpenId] = useState(items[0]?.id ?? null)

  return (
    <div className="accordion">
      {items.map((item) => {
        const isOpen = openId === item.id
        const buttonId = 'accordion-button-' + item.id
        const panelId = 'accordion-panel-' + item.id

        return (
          <div className="accordion-item" key={item.id}>
            <h3 className="accordion-heading">
              <button
                className="accordion-trigger"
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
              >
                <span>{item.title}</span>
                <span className="accordion-indicator" aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
            </h3>
            <div
              className={'accordion-panel' + (isOpen ? ' is-open' : '')}
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
            >
              <div className="accordion-panel-inner" inert={!isOpen}>
                <p>{item.content}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
