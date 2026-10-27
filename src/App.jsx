import { useState } from 'react'
import { Accordion } from './components/Accordion.jsx'
import { CourseCard } from './components/CourseCard.jsx'
import { DropdownMenu } from './components/DropdownMenu.jsx'
import { Pagination } from './components/Pagination.jsx'
import { ProgressBar } from './components/ProgressBar.jsx'
import { Tabs } from './components/Tabs.jsx'
import { useToast } from './components/ToastProvider.jsx'

const totalLessons = 8
const coursesPerPage = 3

const courses = [
  {
    id: 'react-componentes',
    code: '01',
    category: 'React',
    theme: 'moss',
    symbol: 'R',
    level: 'Iniciante',
    duration: '4h 20min',
    lessons: 12,
    title: 'Componentes e estado com React',
    summary: 'Construa interfaces interativas, uma peça reutilizável de cada vez.',
  },
  {
    id: 'design-interfaces',
    code: '02',
    category: 'Design',
    theme: 'clay',
    symbol: 'D',
    level: 'Todos os níveis',
    duration: '3h 10min',
    lessons: 9,
    title: 'Design de interfaces consistentes',
    summary: 'Organize cores, espaçamentos e tipografia em um sistema simples.',
  },
  {
    id: 'javascript-dados',
    code: '03',
    category: 'React',
    theme: 'blue',
    symbol: 'JS',
    level: 'Iniciante',
    duration: '5h',
    lessons: 14,
    title: 'JavaScript para aplicações',
    summary: 'Pratique funções, arrays e objetos com exemplos do dia a dia.',
  },
  {
    id: 'acessibilidade-web',
    code: '04',
    category: 'Design',
    theme: 'rose',
    symbol: 'A',
    level: 'Intermediário',
    duration: '2h 40min',
    lessons: 8,
    title: 'Acessibilidade para a web',
    summary: 'Deixe formulários e componentes claros para mais pessoas.',
  },
  {
    id: 'produto-digital',
    code: '05',
    category: 'Produto',
    theme: 'gold',
    symbol: 'P',
    level: 'Todos os níveis',
    duration: '3h 30min',
    lessons: 10,
    title: 'Fundamentos de produto digital',
    summary: 'Conecte necessidades de pessoas a decisões de produto.',
  },
  {
    id: 'portfolio',
    code: '06',
    category: 'Carreira',
    theme: 'lilac',
    symbol: '↗',
    level: 'Iniciante',
    duration: '1h 50min',
    lessons: 6,
    title: 'Apresente seu primeiro portfólio',
    summary: 'Conte o que você fez, como pensou e o que aprendeu.',
  },
]

const filterOptions = [
  { label: 'Todas as áreas', value: 'all' },
  { label: 'React', value: 'React' },
  { label: 'Design', value: 'Design' },
  { label: 'Produto', value: 'Produto' },
  { label: 'Carreira', value: 'Carreira' },
]

const courseTabs = [
  {
    id: 'aula',
    label: 'Aula atual',
    content: (
      <div className="lesson-copy">
        <p className="lesson-number">AULA 05 · 18 MIN</p>
        <h3>Transformando dados em interface</h3>
        <p>
          Nesta aula, você vai passar informações por props e guardar uma
          escolha com state. São as mesmas ideias usadas nos componentes desta
          página.
        </p>
        <div className="lesson-callout">
          <span className="callout-mark" aria-hidden="true">i</span>
          <p>Troque de aba e marque a próxima aula como concluída.</p>
        </div>
      </div>
    ),
  },
  {
    id: 'materiais',
    label: 'Materiais',
    content: (
      <div className="lesson-copy">
        <p className="lesson-number">APOIO DA AULA</p>
        <h3>Três ideias para guardar</h3>
        <ul className="material-list">
          <li>Um componente descreve uma parte da interface.</li>
          <li>Props levam dados de um componente para outro.</li>
          <li>State guarda valores que podem mudar com uma interação.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'proximas',
    label: 'Próximas aulas',
    content: (
      <div className="lesson-copy">
        <p className="lesson-number">SUA SEQUÊNCIA</p>
        <h3>Continue no seu ritmo</h3>
        <ol className="next-lesson-list">
          <li><span>06</span> Formulários com estado</li>
          <li><span>07</span> Separando componentes</li>
          <li><span>08</span> Revisão da trilha</li>
        </ol>
      </div>
    ),
  },
]

const questions = [
  {
    id: 'progress',
    title: 'Como o progresso do curso é calculado?',
    content:
      'A barra divide as aulas concluídas pelo total de oito aulas. Use o botão do curso para avançar uma aula e ver o percentual mudar.',
  },
  {
    id: 'saved',
    title: 'O que acontece quando salvo um curso?',
    content:
      'O botão muda para “Salvo na lista” e uma notificação confirma a ação. Como esta é uma demonstração, a seleção não fica gravada depois de recarregar a página.',
  },
  {
    id: 'data',
    title: 'Esta página usa dados de uma plataforma real?',
    content:
      'Não. Cursos, progresso e interações são fictícios e ficam no estado local do React. Não há login, servidor ou serviço externo conectado.',
  },
]

function App() {
  const [completedLessons, setCompletedLessons] = useState(4)
  const [currentPage, setCurrentPage] = useState(1)
  const [courseFilter, setCourseFilter] = useState('all')
  const [savedCourseIds, setSavedCourseIds] = useState([])
  const { showToast } = useToast()

  const filteredCourses =
    courseFilter === 'all'
      ? courses
      : courses.filter((course) => course.category === courseFilter)
  const pageCount = Math.max(1, Math.ceil(filteredCourses.length / coursesPerPage))
  const activePage = Math.min(currentPage, pageCount)
  const firstVisibleIndex = (activePage - 1) * coursesPerPage
  const visibleCourses = filteredCourses.slice(
    firstVisibleIndex,
    firstVisibleIndex + coursesPerPage,
  )
  const progress = Math.round((completedLessons / totalLessons) * 100)

  function completeNextLesson() {
    if (completedLessons >= totalLessons) return

    setCompletedLessons((current) => Math.min(totalLessons, current + 1))
    showToast('Aula concluída. Seu progresso foi atualizado.', 'success')
  }

  function toggleSavedCourse(courseId) {
    setSavedCourseIds((current) =>
      current.includes(courseId)
        ? current.filter((savedId) => savedId !== courseId)
        : [...current, courseId],
    )
  }

  function changeFilter(value) {
    setCourseFilter(value)
    setCurrentPage(1)
  }

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Navegação principal">
        <a className="brand" href="#overview" aria-label="Eixo, início">
          <span className="brand-mark" aria-hidden="true">e</span>
          <span className="brand-name">eixo</span>
        </a>

        <p className="sidebar-label">ESPAÇO DE ESTUDO</p>
        <nav className="sidebar-nav">
          <a className="sidebar-link is-active" href="#overview" aria-current="page">
            <span className="nav-symbol" aria-hidden="true">⌂</span>
            Visão geral
          </a>
          <a className="sidebar-link" href="#current-course">
            <span className="nav-symbol" aria-hidden="true">▤</span>
            Minha trilha
          </a>
          <a className="sidebar-link" href="#catalog">
            <span className="nav-symbol" aria-hidden="true">⌕</span>
            Explorar cursos
          </a>
          <a className="sidebar-link" href="#questions">
            <span className="nav-symbol" aria-hidden="true">?</span>
            Dúvidas
          </a>
        </nav>

        <div className="sidebar-note">
          <span className="note-spark" aria-hidden="true">✳</span>
          <p>Um passo por vez também é progresso.</p>
          <span>— lembrete do seu espaço</span>
        </div>

        <div className="sidebar-footer">
          <span className="avatar avatar--small" aria-hidden="true">E</span>
          <div>
            <strong>Área de estudante</strong>
            <span>Plano de aprendizagem</span>
          </div>
          <span className="sidebar-more" aria-hidden="true">···</span>
        </div>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Meu espaço</span>
            <span className="breadcrumb-divider" aria-hidden="true">/</span>
            <strong>Aprendizagem</strong>
          </div>
          <div className="account-chip">
            <span>Seu espaço de estudo</span>
            <span className="avatar" aria-hidden="true">E</span>
          </div>
        </header>

        <main className="main-content" id="overview">
          <section className="page-heading" aria-labelledby="page-title">
            <div>
              <p className="eyebrow">UM BOM DIA PARA APRENDER</p>
              <h1 id="page-title">Minha trilha</h1>
              <p className="page-intro">
                Olá, estudante. Seu próximo passo já está esperando por você.
              </p>
            </div>
            <a className="text-link" href="#catalog">
              Explorar catálogo <span aria-hidden="true">↗</span>
            </a>
          </section>

          <section className="course-hero" id="current-course" aria-labelledby="course-title">
            <div className="hero-copy">
              <p className="hero-kicker">
                <span className="live-dot" aria-hidden="true" />
                CURSO EM ANDAMENTO
              </p>
              <h2 id="course-title">React para interfaces reais</h2>
              <p className="hero-description">
                Do primeiro componente a uma tela que responde às suas escolhas.
              </p>
              <div className="hero-meta">
                <span>
                  <strong>{String(Math.min(completedLessons + 1, totalLessons)).padStart(2, '0')}</strong>
                  {' de ' + String(totalLessons).padStart(2, '0') + ' aulas'}
                </span>
                <span className="meta-divider" aria-hidden="true" />
                <span>Trilha de front-end</span>
              </div>
              <ProgressBar
                label="Progresso do curso"
                value={progress}
                variant="dark"
              />
              <button
                className="button button--light"
                type="button"
                onClick={completeNextLesson}
                disabled={completedLessons >= totalLessons}
              >
                {completedLessons >= totalLessons
                  ? 'Trilha concluída'
                  : 'Marcar próxima aula como concluída'}
                <span aria-hidden="true">→</span>
              </button>
            </div>

            <div className="hero-art" aria-hidden="true">
              <div className="hero-orbit hero-orbit--outer" />
              <div className="hero-orbit hero-orbit--inner" />
              <div className="hero-sun" />
              <div className="hero-note hero-note--top">
                <span className="hero-note-dot" />
                <span>aprender</span>
              </div>
              <div className="hero-note hero-note--bottom">
                <span className="hero-note-number">
                  {String(completedLessons).padStart(2, '0')}
                </span>
                <span>aulas feitas</span>
              </div>
              <span className="hero-art-label">IDEIA → INTERFACE</span>
            </div>
          </section>

          <section className="lesson-section" aria-labelledby="lesson-section-title">
            <div className="section-heading">
              <div>
                <p className="eyebrow">CONTINUE DE ONDE PAROU</p>
                <h2 id="lesson-section-title">Da ideia ao primeiro componente</h2>
              </div>
              <span className="section-index">CAPÍTULO 02 <span aria-hidden="true">·</span> 08</span>
            </div>
            <Tabs label="Conteúdo do curso" tabs={courseTabs} />
          </section>

          <section className="catalog-section" id="catalog" aria-labelledby="catalog-title">
            <div className="section-heading catalog-heading">
              <div>
                <p className="eyebrow">ESCOLHA O PRÓXIMO PASSO</p>
                <h2 id="catalog-title">Cursos para sua próxima etapa</h2>
              </div>
              <DropdownMenu
                label="Filtrar por área"
                options={filterOptions}
                value={courseFilter}
                onChange={changeFilter}
              />
            </div>

            <div className="course-grid">
              {visibleCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isSaved={savedCourseIds.includes(course.id)}
                  onToggleSaved={() => toggleSavedCourse(course.id)}
                />
              ))}
            </div>

            <Pagination
              currentPage={activePage}
              totalPages={pageCount}
              onPageChange={setCurrentPage}
            />
          </section>

          <section className="faq-section" id="questions" aria-labelledby="faq-title">
            <div className="section-heading faq-heading">
              <div>
                <p className="eyebrow">RESPOSTAS RÁPIDAS</p>
                <h2 id="faq-title">Perguntas frequentes</h2>
              </div>
              <p>Sobre esta demonstração</p>
            </div>
            <Accordion items={questions} />
          </section>

          <footer className="page-footer">
            <span>eixo <span aria-hidden="true">·</span> aprender com intenção</span>
            <a href="#overview">Voltar ao início ↑</a>
          </footer>
        </main>
      </div>
    </div>
  )
}

export default App
