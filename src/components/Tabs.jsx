import { useRef, useState } from 'react'

export function Tabs({ label, tabs }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const tabRefs = useRef([])
  const activeTab = tabs[activeIndex] ?? tabs[0]

  function handleTabKeyDown(event, index) {
    let nextIndex = index

    if (event.key === 'ArrowRight') {
      nextIndex = (index + 1) % tabs.length
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + tabs.length) % tabs.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = tabs.length - 1
    } else {
      return
    }

    event.preventDefault()
    setActiveIndex(nextIndex)
    tabRefs.current[nextIndex]?.focus()
  }

  return (
    <div className="tabs">
      <div className="tab-list" role="tablist" aria-label={label}>
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex
          const tabId = 'course-tab-' + tab.id

          return (
            <button
              className={'tab-button' + (isActive ? ' is-active' : '')}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="course-tab-panel"
              tabIndex={isActive ? 0 : -1}
              key={tab.id}
              ref={(element) => {
                tabRefs.current[index] = element
              }}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      <div
        className="tab-panel"
        id="course-tab-panel"
        role="tabpanel"
        aria-labelledby={'course-tab-' + activeTab.id}
        tabIndex="0"
      >
        {activeTab.content}
      </div>
    </div>
  )
}
