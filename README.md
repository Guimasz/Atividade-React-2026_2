# Atividade React 2026.2 — Minha trilha

Aplicação de uma tela sobre uma plataforma fictícia de cursos. O projeto demonstra os seis componentes pedidos na atividade usando componentes React próprios, dados locais e CSS responsivo.

## Executar no GitHub Codespaces

Abra o repositório no Codespaces e, no terminal integrado, execute:

~~~bash
npm install
npm run dev
~~~

O Codespaces encaminha a porta do Vite. Para gerar a versão de produção, use o comando npm run build.

## Componentes demonstrados

- **Abas:** trocam o conteúdo da aula. As setas esquerda/direita, Home e End também mudam a aba.
- **Acordeão:** expande uma resposta por vez e informa o estado com aria-expanded.
- **Barra de progresso:** recebe um valor por props e usa o elemento nativo progress.
- **Menu suspenso:** filtra os cursos por área e fecha ao escolher, clicar fora ou pressionar Escape.
- **Paginação:** navega entre os cursos, indica a página atual e desativa os controles nos limites.
- **Toast:** confirma ações, desaparece após alguns segundos e pode ser fechado manualmente.

O desafio extra usa **Context API** para compartilhar notificações. O componente da trilha e os cartões de curso usam o hook useToast.

## Estrutura

- **src/App.jsx:** compõe a tela e mantém o progresso, o filtro, a página e os cursos salvos.
- **src/components/:** componentes visuais com estado local e props.
- **src/components/ToastProvider.jsx:** contexto e ciclo de vida das notificações.
- **src/App.css** e **src/index.css:** layout, estados visuais e ajustes responsivos.


Cursos, progresso e itens salvos são fictícios e ficam apenas no estado da página.
