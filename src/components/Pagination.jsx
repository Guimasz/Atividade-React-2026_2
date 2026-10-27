export function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <nav className="pagination" aria-label="Paginação do catálogo de cursos">
      <button
        className="pagination-direction"
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Ir para a página anterior"
      >
        <span aria-hidden="true">←</span>
        <span>Anterior</span>
      </button>
      <div className="pagination-pages" aria-label="Páginas">
        {pages.map((page) => (
          <button
            className={'page-number' + (page === currentPage ? ' is-current' : '')}
            type="button"
            key={page}
            aria-label={'Ir para a página ' + page}
            aria-current={page === currentPage ? 'page' : undefined}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        className="pagination-direction"
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Ir para a próxima página"
      >
        <span>Próxima</span>
        <span aria-hidden="true">→</span>
      </button>
    </nav>
  )
}
