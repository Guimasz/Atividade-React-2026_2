import { useEffect, useRef, useState } from 'react'

function Acordeao({ itens }) {
  const [aberto, setAberto] = useState(null)

  return (
    <div>
      {itens.map((item, indice) => (
        <div className="pergunta" key={item.titulo}>
          <button
            type="button"
            aria-expanded={aberto === indice}
            aria-controls={`resposta-${indice}`}
            onClick={() => setAberto(aberto === indice ? null : indice)}
          >
            {item.titulo} {aberto === indice ? '−' : '+'}
          </button>
          <div
            id={`resposta-${indice}`}
            className={`resposta ${aberto === indice ? 'aberta' : ''}`}
            aria-hidden={aberto !== indice}
            inert={aberto !== indice}
          >
            <div><p>{item.conteudo}</p></div>
          </div>
        </div>
      ))}
    </div>
  )
}

function Paginacao({ paginaAtual, totalPaginas, aoMudarPagina }) {
  return (
    <nav aria-label="Paginação">
      <button type="button" disabled={paginaAtual === 1} onClick={() => aoMudarPagina(paginaAtual - 1)}>Anterior</button>
      {Array.from({ length: totalPaginas }, (_, indice) => indice + 1).map((pagina) => (
        <button
          type="button"
          key={pagina}
          aria-current={paginaAtual === pagina ? 'page' : undefined}
          onClick={() => aoMudarPagina(pagina)}
        >
          {pagina}
        </button>
      ))}
      <button type="button" disabled={paginaAtual === totalPaginas} onClick={() => aoMudarPagina(paginaAtual + 1)}>Próxima</button>
    </nav>
  )
}

function BarraProgresso({ valor }) {
  return (
    <div>
      <label htmlFor="progresso">Progresso: {valor}%</label>
      <progress id="progresso" value={valor} max="100">{valor}%</progress>
    </div>
  )
}

function Abas({ itens }) {
  const [ativa, setAtiva] = useState(0)

  return (
    <div>
      <div aria-label="Conteúdos do curso">
        {itens.map((item, indice) => (
          <button type="button" key={item.titulo} aria-pressed={ativa === indice} onClick={() => setAtiva(indice)}>
            {item.titulo}
          </button>
        ))}
      </div>
      <p>{itens[ativa].conteudo}</p>
    </div>
  )
}

function MenuSuspenso({ opcoes, aoSelecionar }) {
  const [aberto, setAberto] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function fecharAoClicarFora(evento) {
      if (menuRef.current && !menuRef.current.contains(evento.target)) setAberto(false)
    }
    document.addEventListener('click', fecharAoClicarFora)
    return () => document.removeEventListener('click', fecharAoClicarFora)
  }, [])

  return (
    <div className="menu" ref={menuRef}>
      <button type="button" aria-expanded={aberto} aria-controls="opcoes-menu" onClick={() => setAberto(!aberto)}>
        Escolher tema
      </button>
      {aberto && (
        <div id="opcoes-menu" className="opcoes">
          {opcoes.map((opcao) => (
            <button type="button" key={opcao} onClick={() => { aoSelecionar(opcao); setAberto(false) }}>
              {opcao}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Toast({ mensagem, aoFechar }) {
  useEffect(() => {
    if (!mensagem) return undefined
    const tempo = setTimeout(aoFechar, 3000)
    return () => clearTimeout(tempo)
  }, [mensagem, aoFechar])

  if (!mensagem) return null

  return (
    <div className="toast" role="status">
      <span>{mensagem}</span>
      <button type="button" onClick={aoFechar} aria-label="Fechar notificação">×</button>
    </div>
  )
}

const perguntas = [
  { titulo: 'O que é React?', conteudo: 'React é uma biblioteca para criar interfaces usando componentes.' },
  { titulo: 'O que são props?', conteudo: 'Props são informações enviadas de um componente para outro.' },
  { titulo: 'O que é state?', conteudo: 'State guarda informações que podem mudar durante o uso da página.' },
]

const abas = [
  { titulo: 'Sobre', conteudo: 'Este é um exemplo simples de componentes React.' },
  { titulo: 'Conteúdo', conteudo: 'Aqui você encontra exemplos de props, estado e eventos.' },
  { titulo: 'Contato', conteudo: 'Em caso de dúvida, converse com o professor.' },
]

const cursos = ['Introdução ao React', 'Componentes e props', 'Estado e eventos', 'Hooks no React', 'Estilos com CSS', 'Criando uma aplicação']

function App() {
  const [pagina, setPagina] = useState(1)
  const [progresso, setProgresso] = useState(25)
  const [tema, setTema] = useState('Nenhum')
  const [mensagem, setMensagem] = useState('')
  const cursosPorPagina = 2
  const totalPaginas = Math.ceil(cursos.length / cursosPorPagina)
  const cursosDaPagina = cursos.slice((pagina - 1) * cursosPorPagina, pagina * cursosPorPagina)

  return (
    <main>
      <h1>Exemplos de componentes React</h1>
      <p>Uma demonstração simples dos componentes da atividade.</p>

      <section>
        <h2>1. Acordeão</h2>
        <Acordeao itens={perguntas} />
      </section>

      <section>
        <h2>2. Paginação</h2>
        <ul>{cursosDaPagina.map((curso) => <li key={curso}>{curso}</li>)}</ul>
        <Paginacao paginaAtual={pagina} totalPaginas={totalPaginas} aoMudarPagina={setPagina} />
      </section>

      <section>
        <h2>3. Barra de progresso</h2>
        <BarraProgresso valor={progresso} />
        <button type="button" onClick={() => setProgresso(Math.min(progresso + 25, 100))} disabled={progresso === 100}>Avançar</button>
        <button type="button" onClick={() => setProgresso(0)}>Reiniciar</button>
      </section>

      <section>
        <h2>4. Abas</h2>
        <Abas itens={abas} />
      </section>

      <section>
        <h2>5. Menu suspenso</h2>
        <MenuSuspenso opcoes={['React', 'JavaScript', 'CSS']} aoSelecionar={setTema} />
        <p>Tema escolhido: {tema}</p>
      </section>

      <section>
        <h2>6. Notificação Toast</h2>
        <button type="button" onClick={() => setMensagem('Sua ação foi realizada com sucesso!')}>Mostrar notificação</button>
        <Toast mensagem={mensagem} aoFechar={() => setMensagem('')} />
      </section>
    </main>
  )
}

export default App
