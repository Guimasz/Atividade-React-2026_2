import { useToast } from './ToastProvider.jsx'

export function CourseCard({ course, isSaved, onToggleSaved }) {
  const { showToast } = useToast()

  function handleSave() {
    onToggleSaved()
    showToast(
      isSaved ? 'Curso removido da sua lista.' : 'Curso salvo para ver depois.',
      isSaved ? 'info' : 'success',
    )
  }

  return (
    <article className="course-card">
      <div
        className={'course-cover course-cover--' + course.theme}
        aria-hidden="true"
      >
        <span className="cover-category">{course.category}</span>
        <span className="cover-symbol">{course.symbol}</span>
        <span className="cover-code">{course.code}</span>
      </div>
      <div className="course-card-body">
        <div className="course-card-meta">
          <span>{course.category}</span>
          <span>{course.level}</span>
        </div>
        <h3>{course.title}</h3>
        <p className="course-summary">{course.summary}</p>
        <div className="course-card-details">
          <span>{course.lessons} aulas</span>
          <span className="detail-separator" aria-hidden="true">·</span>
          <span>{course.duration}</span>
        </div>
        <button
          className={'save-course-button' + (isSaved ? ' is-saved' : '')}
          type="button"
          aria-pressed={isSaved}
          onClick={handleSave}
        >
          <span aria-hidden="true">{isSaved ? '✓' : '+'}</span>
          {isSaved ? 'Salvo na lista' : 'Salvar para depois'}
        </button>
      </div>
    </article>
  )
}
