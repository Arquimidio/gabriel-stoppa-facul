// Variável que armazena a página em que o usuário se encontra
let currentPage = '/';

// Função que gera elementos HTML recursivamente
function element({ tag = "p", options = {}, listeners = [], children = [] } = {}) {
  const newHTMLElement = document.createElement(tag);
  
  for(const key in options) {
    newHTMLElement[key] = options[key];
  }

  if(Array.isArray(children)) {
    for(const child of children) {
      newHTMLElement.appendChild(element(child));
    }
  } else {
    newHTMLElement.appendChild(element(children));
  }

  for(const [event, callback] of listeners) {
    newHTMLElement.addEventListener(event, callback);
  }

  return newHTMLElement;
}

// Função que gera um container servindo como wrapper de conteúdo
const contentContainer = (content) => ({
  tag: "div",
  options: { className: "content-container" },
  children: content
})

// Elemento HTML raiz, todos os outros elementos adicionados serão filhos de root
const root = document.getElementById('raiz');

const navLink = (text, routePath = '/') => ({
  tag: "li",
  options: { textContent: text },
  listeners:  [['click', route(routePath)]]
})

// Criação do elemento da barra de navegação
const navBar = element({
  tag: "nav",
  children: contentContainer({
    tag: "ul",
    children: [
      navLink("Início", '/'),
      navLink("Portfólio", '/portfolio'),
      navLink('Sobre Mim', '/sobre-mim'),
      navLink('Educação', '/educacao'),
    ]
  })
});

// Função que gera a página que traz informações sobre educação
const aboutMe = () => {
  return element({ tag: 'main', children: contentContainer([
    {
      tag: 'h1',
      options: { textContent: 'Sobre Mim' }
    },
    {
      tag: 'p',
      options: { 
        textContent: `Olá, me chamo Gabriel! Tenho 24 anos e comecei no mundo da programação há 3 anos. Antes disso,
        programar era só um hobbie (não deixou de ser). Em 2021 vi que a área da programação tem boas oportunidades e transformei parte do hobbie em trabalho. Amo construir ferramentas úteis com software e também
        amo o trabalho investigativo de entender a fundo como uma aplicação funciona!` 
      }
    },
    {
      tag: 'p',
      options: {
        textContent: `No meu tempo livre, gosto de estudar, trabalhar em criações pessoais, ler ficção científica e assistir séries!`
      
      }
    }
  ])});
}

// Função que gera a página que traz informações sobre mim
const education = () => {
  return element({ tag: "main", children: contentContainer([
    {
      tag: "h1",
      options: {
        textContent: "Educação"
      }
    },
    {
      tag: "p",
      options: {
        textContent: `Sou formado em Direito pela Universidade Positivo e no momento estou cursando Engenharia de Software na Uninter. No momento,
        os idiomas que sei são Português (idioma nativo) e Inglês (avançado).`
      }
    },
    {
      tag: "p",
      options: {
        textContent: `Além do aprendizado acadêmico, também aprendi muito sobre programação buscando cursos online e realizando diversos projetos pessoais.`
      }
    }
  ])})
}

// FUnção que gera um campo de formulário para ser renderizado
const formField = (tag = "input", label, name = label) => ({
      tag: "div",
      options: { className: "form-field" },
      children: [
        {
          tag: "label",
          options: { textContent: label}
        },
        {
          tag: tag,
          options: { name: name }
        }
      ]
})

// Função que gera o formulário de contato
const contactForm = () => {
  return element({
    tag: "div",
    options: { id: "contact-form-container" },
    children: contentContainer([
      {
        tag: "h2",
        options: { textContent: "Formulário de Contato" }
      },
      {
        tag: "form",
        options: { id: "contact-form" },
        children: [
          formField('input', 'nome'),
          formField('input', 'e-mail'),
          formField('textarea', 'mensagem'),
          {
            tag: "button",
            options: { textContent: "Enviar" }
          }
        ]
      }
    ])
  })
}

// Função que gera um projeto do portfólio para ser renderizado
const portfolioProject = (title, description, link, img) => ({
  tag: "div",
  options: { className: 'portfolio-project' },
  children: [
    {
      tag: "div",
      children: [
        {
          tag: "h3",
          options: { textContent: title }
        },
        {
          tag: "p",
          options: { textContent: description }
        }
      ]
    }, 
    {
      tag: "div",
      options: { className: "img-container" },
      children: {
        tag: "a",
        options: {
          href: link
        },
        children: {
          tag: "img",
          options: { src: img, alt: `Imagem do projeto ${title}` }
        }
      }
    }
  ]
})

// Função que gera a página de portfólio
const portfolio = () => {
  return element({
    tag: "main",
    children: contentContainer([
      {
        tag: "h1",
        options: { textContent: "Meu Portfólio" }
      },
      {
        tag: "div",
        options: { id: "portfolio" },
        children: [
          portfolioProject(
            'Where in the world?', 
            'App que exibe informações de todos os países, possibilitando filtragem e visualização das informações com base na seçleção do usuário',
            'https://arquimidio.github.io/whereintheworld/',
            './assets/images/wytw.png'
          ),
          portfolioProject(
            'Veja Markdown', 
            'App que permite que o usuário realize edição de texto utilizando a linguagem markdown e veja os efeitos imediatamente',
            'https://arquimidio.github.io/vejaMarkdown/',
            './assets/images/markdown.png'
          ),
          portfolioProject(
            'Library', 
            'App que permite o armazenamento de informações de leitura de livros, permitindo o acompanhamento da leitura',
            'https://arquimidio.github.io/library-odin/',
            './assets/images/lib.png',
          ),
        ]
      }
    ])
  })
}

const home = () => (element({
  tag: "main",
  children: contentContainer([
    {
      tag: "h1",
      options: { textContent: "Início" }
    },
    {
      tag: "p",
      options: {
        textContent: `Olá! Sou o Gabriel, bem-vindo(a) ao meu site de portfólio. Sou desenvolvedor full stack com 1 ano de experiência e 3 anos de estudo. Trabalho com tecnologias HTML, CSS, Javascript e React no front end e Node, NestJS e PostgreSQL no back end.`
      }
    }
  ])
}))

// Constate que armazena as rotas do site mapeadas, permitindo a geração do conteúdo com base na página selecionada
const PATHS = {
  '/': home,
  '/sobre-mim': aboutMe,
  '/educacao': education,
  '/portfolio': portfolio,
}

// Função que muda o conteúdo exibido na página
function route(url = '/') {
  return () => {
    while(root.firstChild !== root.lastChild) {
      root.lastChild.remove();
    }

    currentPage = PATHS[url]();
    root.appendChild(currentPage)
    root.appendChild(contactForm());
  }
}

// Função que inicializa a barra de navegação e o conteúdo da página principal
function init() {
  root.appendChild(navBar);
  route(currentPage)();   
}

// Inicializa a página inicial após a DOM ter carregado
document.addEventListener("DOMContentLoaded", () => {
  init();
})

