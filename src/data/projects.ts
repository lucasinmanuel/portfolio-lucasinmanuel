export type Project = {
  slug: string
  title: string
  subtitle: string
  client: string
  role: string
  period: string
  status: 'Em produção' | 'Ativo' | 'Entregue'
  commits: number
  share?: string
  hue: number
  monogram: string
  summary: string
  architecture: string[]
  achievements: { title: string; detail: string }[]
  stack: string[]
  featured?: boolean
  /** Prova visual do produto, para os casos em que existe algo público. */
  embed?: { src: string; height: number; caption: string }
  /** Só os projetos abertos têm — o resto é código de cliente. */
  repo?: string
}

export const projects: Project[] = [
  {
    slug: 'plataformas-arbitragem',
    title: 'Plataformas de arbitragem',
    subtitle: 'Três APIs irmãs — cache, filas e sincronização contínua',
    client: 'Atom Smart Chains',
    role: 'Backend',
    period: '2025 — 2026',
    status: 'Em produção',
    commits: 33,
    hue: 258,
    monogram: 'AR',
    featured: true,
    summary:
      'Três APIs irmãs sobre a mesma base, servindo white-labels diferentes do mesmo protocolo. O trabalho central não é o CRUD — é manter o banco em dia com um estado externo que muda sozinho, sem derrubar a latência das leituras nem duplicar efeito quando a API roda com várias réplicas.',
    architecture: [
      'AdonisJS 6 e Lucid sobre MySQL, com Redis para cache e BullMQ para o que não pode bloquear a resposta.',
      'Camada de sincronização lê eventos externos (on-chain) e os aplica ao banco dentro de uma transação.',
      'Cada mutação devolve um descritor com o que transmitir aos clientes conectados e o que invalidar — em vez de espalhar chamadas de invalidação pelo código.',
      'Broadcast em tempo real por WebSocket, com um router de canais por assinatura.',
      'Bot Telegram (Telegraf) como canal de alerta operacional; Swagger gerado a partir das rotas.',
    ],
    achievements: [
      {
        title: 'Fila genérica sobre BullMQ, com política de falha explícita',
        detail:
          'Um registry de Queue e Worker por nome, criadas sob demanda e reaproveitadas. Todo job nasce com 3 tentativas e backoff exponencial começando em 10s. Jobs concluídos são removidos para manter o Redis enxuto; jobs que falharam são preservados para inspeção — perder o job que falhou é perder a única evidência do que deu errado.',
      },
      {
        title: 'Eleição de líder para jobs agendados',
        detail:
          'Uma função runIfPrimary resolve o problema de rodar N réplicas da API: tarefas periódicas só executam na instância de índice 0. Sem isso, cada réplica dispara o mesmo job e o efeito é multiplicado pelo número de containers.',
      },
      {
        title: 'Cache com TTL declarado por entidade',
        detail:
          'Em vez de chaves soltas, cada entidade declara sua configuração de cache: chave derivada, TTL legível, model de origem e mensagem de ausência. A invalidação passa a ser consequência da mutação, não um passo que alguém pode esquecer.',
      },
      {
        title: 'Sincronização transacional de estado externo',
        detail:
          'O sync aplica cada lote de eventos dentro de uma transação: ou o banco avança por completo, ou não avança. É o mesmo formato de um sync de catálogo — ler uma fonte que você não controla, reconciliar com o que já está persistido e publicar a diferença.',
      },
    ],
    stack: [
      'TypeScript',
      'AdonisJS 6',
      'MySQL',
      'Lucid ORM',
      'Redis',
      'BullMQ',
      'WebSocket',
      'ethers.js',
      'Telegraf',
      'Swagger',
      'Japa',
    ],
  },
  {
    slug: 'beautyfy',
    title: 'Beautyfy',
    subtitle: 'Marketplace de beleza — cinco backends, app nativo e painel',
    client: 'Beauty Professionals Now',
    role: 'Backend e mobile',
    period: 'jul/2025 — set/2026',
    status: 'Em produção',
    commits: 2544,
    share: '97% dos 2.610 commits do repositório',
    hue: 330,
    monogram: 'BF',
    featured: true,
    summary:
      'Monorepo que sustenta o produto inteiro: cinco backends AdonisJS independentes, app React Native e painéis Next.js. Meu maior volume de trabalho — quinze meses, ainda em evolução.',
    embed: {
      src: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7437659543217651712?collapsed=1',
      height: 670,
      caption: 'Publicação de lançamento, com telas do app em produção.',
    },
    architecture: [
      'Turborepo e Bun. Cinco backends separados por domínio: backoffice, client, professional, chat e notification.',
      'Um pacote compartilhado reúne os módulos que os cinco consomem — o contrato entre serviços vive em código tipado, não em convenção.',
      'Um pacote gerador de env monta a configuração de cada serviço, de modo que cinco ambientes não divergem em silêncio.',
      'Apps Expo e React Native com Tamagui para cliente e profissional, Next.js no backoffice.',
      'Build standalone por backend, imagens Docker e ambiente de infra versionado.',
    ],
    achievements: [
      {
        title: 'Notificações em três camadas, com fallback',
        detail:
          'Socket.IO entrega em tempo real para quem está com o app aberto, usando rooms por usuário. Quem não está conectado cai no push nativo via Expo, FCM ou APNs. Um scheduler dispara o worker de notificações recorrentes a cada 2 minutos, e um listener de pg_notify reage a mudanças de status de agendamento direto do PostgreSQL.',
      },
      {
        title: 'Comunicação entre backends por HTTP interno',
        detail:
          'O serviço de notificação expõe endpoints que os outros quatro chamam para disparar eventos. Cada backend mantém seu banco e seu deploy; o acoplamento fica no contrato HTTP, que é versionável.',
      },
      {
        title: 'Disciplina de monorepo',
        detail:
          'Vitest, Biome, husky e lint-staged aplicados na raiz. Em cinco serviços e três frontends, padronizar lint e teste é o que impede o repositório de virar cinco repositórios dentro de uma pasta.',
      },
      {
        title: 'Pagamentos e agenda',
        detail:
          'Stripe para cobrança, com modelagem de disponibilidade e agendamento: janelas, conflitos e cancelamento. É a parte do domínio onde regra de negócio errada vira prejuízo direto do profissional.',
      },
    ],
    stack: [
      'TypeScript',
      'AdonisJS 6',
      'PostgreSQL',
      'Lucid ORM',
      'Socket.IO',
      'Expo Server SDK',
      'Stripe',
      'Turborepo',
      'Bun',
      'React Native',
      'Tamagui',
      'Next.js',
      'Vitest',
      'Biome',
      'Docker',
    ],
  },
  {
    slug: 'agror7',
    title: 'AgrOr7',
    subtitle: 'Backend agro com dados climáticos e geoespaciais',
    client: 'Grupo OrSheva',
    role: 'Backend',
    period: '2026',
    status: 'Em produção',
    commits: 78,
    hue: 142,
    monogram: 'AG',
    summary:
      'API que serve produtores, fornecedores e prestadores do agronegócio, puxando dados de satélite e clima de fontes públicas para enriquecer o que o usuário vê sobre a própria área.',
    architecture: [
      'FastAPI com API versionada, dividida por domínio: auth, catálogo, contratos, fórmulas, microrregiões, histórico.',
      'PostgreSQL com migrations versionadas; deploy em Railway via Docker.',
      'Uma camada de integrações isola cada fonte externa atrás de uma base comum — trocar ou derrubar uma fonte não vaza para o resto.',
      'Autenticação Bearer com refresh, e papéis: produtor, fornecedor, prestador, admin.',
      'Testes separados em unitários e de integração, com fixtures compartilhadas.',
    ],
    achievements: [
      {
        title: 'Pipeline de dados públicos de satélite e clima',
        detail:
          'Integrações com INPE, NASA FIRMS (focos de calor), MODIS NDVI (vigor da vegetação) e Open-Meteo. Cada uma tem formato, cadência e disponibilidade próprios; a base comum padroniza erro e timeout para que uma fonte fora do ar não derrube o endpoint.',
      },
      {
        title: 'Multi-produto na mesma base',
        detail:
          'Modelagem de apps, planos e assinaturas para servir mais de um produto do grupo. A recuperação de senha, por exemplo, passou a ser por produto — o e-mail precisa levar a pessoa de volta ao app certo.',
      },
      {
        title: 'Teste que fixa a regressão',
        detail:
          'O commit que criou apps, planos e assinaturas veio junto com o teste que impede o caso voltar. É a prática que eu levo para qualquer base: bug corrigido sem teste é bug agendado.',
      },
      {
        title: 'Documentação de API escrita, não só gerada',
        detail:
          'Além do schema automático, um documento com exemplos de request e response por endpoint. Quem integra lê o exemplo, não o schema.',
      },
    ],
    stack: [
      'Python',
      'FastAPI',
      'PostgreSQL',
      'Docker',
      'Railway',
      'pytest',
      'WhatsApp Cloud API',
      'Gemini',
    ],
  },
  {
    slug: 'molitor7',
    title: 'MolitOr7',
    subtitle: 'Plataforma de curso — matrícula, aulas e certificação',
    client: 'Grupo OrSheva',
    role: 'Full-stack',
    period: '2026',
    status: 'Ativo',
    commits: 56,
    hue: 28,
    monogram: 'M7',
    summary:
      'Plataforma de ensino com venda, matrícula, agenda de aulas e emissão de certificado verificável. Em evolução ativa — o painel administrativo foi reescrito para paginar no servidor quando as listas cresceram.',
    architecture: [
      'Next.js 15 com tRPC, tipado ponta a ponta entre cliente e servidor.',
      'Drizzle sobre Neon (PostgreSQL serverless), 13 tabelas: usuários, leads, progresso por módulo, matrículas, sessões de aula, transações.',
      'Upload direto para S3 com presigned URL — o arquivo não passa pelo servidor da aplicação.',
      'MercadoPago com webhook de retorno que efetiva a matrícula.',
      'Vitest cobrindo o servidor por domínio; deploy na Vercel.',
    ],
    achievements: [
      {
        title: 'Paginação e filtro movidos para o servidor',
        detail:
          'As quatro listas do painel carregavam tudo e filtravam no cliente. Passaram a paginar de 20 em 20, com busca e filtros no servidor. É a diferença entre uma tela que funciona na demo e uma que continua funcionando no segundo ano de operação.',
      },
      {
        title: 'Certificado emitido e verificável publicamente',
        detail:
          'Tentativas de certificação, controle de acesso ao certificado e uma página pública de verificação. Um certificado que ninguém consegue conferir não vale nada.',
      },
      {
        title: 'Upload sem passar pelo servidor',
        detail:
          'Presigned URL do S3: o backend assina, o navegador envia direto. Tira o arquivo do caminho da aplicação, e o limite de upload deixa de ser o limite da função serverless.',
      },
      {
        title: 'Teste por domínio, não por cobertura',
        detail:
          'Arquivos de teste ao lado de cada módulo do servidor: certificado, pagamento, disponibilidade, entregas, leads, lembretes. O teste acompanha a regra de negócio que ele protege.',
      },
    ],
    stack: [
      'TypeScript',
      'Next.js 15',
      'tRPC',
      'Drizzle',
      'PostgreSQL (Neon)',
      'AWS S3',
      'MercadoPago',
      'Vitest',
      'Tailwind',
      'Vercel',
    ],
  },
  {
    slug: 'atom-v7',
    title: 'Atom V7',
    subtitle: 'Infraestrutura multi-serviço e indexação de eventos',
    client: 'Atom Smart Chains',
    role: 'Backend e infra',
    period: '2026',
    status: 'Entregue',
    commits: 95,
    hue: 196,
    monogram: 'V7',
    summary:
      'Protocolo não-custodial com white-labels. Meu foco aqui foi o que roda em volta dos contratos: a stack local reproduzível, a API, o indexador de eventos e o provisionamento de novos tenants.',
    architecture: [
      'Docker Compose sobe a stack inteira: PostgreSQL 16, API Hono, indexador, proxy de RPC e nó local.',
      'Uma instância de Postgres servindo dois bancos — dados off-chain da aplicação e eventos indexados — separados por script de init.',
      'Envio HyperIndex indexa os eventos; eRPC fica na frente como proxy e cache das chamadas de RPC.',
      'Serviços de brand-api, indexer e provisioner; monorepo pnpm com apps de usuário, admin e master.',
      'Multi-tenant por domínio com Cloudflare for SaaS, e uma CLI própria para as operações do dia a dia.',
    ],
    achievements: [
      {
        title: 'Ordem de boot determinística',
        detail:
          'Healthcheck em cada serviço e dependência condicionada a service_healthy. A API não sobe antes do banco responder a pg_isready. Elimina a classe de erro em que o container inicia, falha na primeira conexão e reinicia em loop.',
      },
      {
        title: 'Configuração que falha cedo em vez de falhar errado',
        detail:
          'As variáveis de senha e de conexão são obrigatórias no Compose: sem elas definidas, a stack não sobe. O contrário — um default fraco como senha igual ao nome do projeto — é um ambiente que funciona hoje e vaza amanhã.',
      },
      {
        title: 'Banco nunca exposto para fora do host',
        detail:
          'O Postgres faz bind em 127.0.0.1. Os serviços falam com ele pela rede interna do Compose, que independe desse bind. A porta existe para o desenvolvedor, não para a internet.',
      },
      {
        title: 'Indexação como fonte de leitura',
        detail:
          'Ler estado direto do nó é lento e caro. O indexador mantém os eventos em Postgres e a aplicação consulta o banco — mesma troca que se faz ao materializar um catálogo externo em vez de consultar a origem a cada request.',
      },
    ],
    stack: [
      'TypeScript',
      'Hono',
      'PostgreSQL 16',
      'Drizzle',
      'Docker Compose',
      'Envio HyperIndex',
      'eRPC',
      'Foundry',
      'Solidity',
      'Cloudflare for SaaS',
      'pnpm',
    ],
  },
  {
    slug: 'alquimia-das-palavras',
    title: 'Alquimia das Palavras',
    subtitle: 'Jogo de leitura para crianças com dislexia — Java e Spring',
    client: 'Recode Pro 2022',
    role: 'Líder de squad e full-stack',
    period: '2022 — 2023',
    status: 'Entregue',
    commits: 86,
    share: '86 dos 91 commits, numa squad de 5',
    hue: 48,
    monogram: 'AP',
    repo: 'https://github.com/lucasinmanuel/alquimia-das-palavras',
    summary:
      'Projeto de formação, e o único aqui com o código aberto. Um jogo de alquimia em que progredir exige ler: o jogador atende clientes, interpreta o pedido e combina ingredientes para produzir a poção certa. Fui líder da squad de cinco pessoas.',
    architecture: [
      'Spring Boot com Spring Security, Spring Data JPA e Thymeleaf, sobre MySQL.',
      'Autenticação por formulário com BCrypt, papéis por usuário e a área administrativa restrita a ADMIN.',
      'Banco modelado antes do código: os modelos conceitual e lógico estão versionados no repositório junto do script de criação.',
      'O jogo é JavaScript sem framework, dividido em módulos por responsabilidade: cenário, caldeirão, armazém, grimório, painel de moedas e controlador de fases.',
      'Diálogos organizados por dia e por NPC, cada fala com seu arquivo de áudio correspondente.',
    ],
    achievements: [
      {
        title: 'Acessibilidade como requisito, não como enfeite',
        detail:
          'A fonte OpenDyslexic é aplicada no site e no jogo inteiro, e cada fala de NPC tem narração em áudio. A escolha do público veio de dado, não de palpite: a Associação Brasileira de Dislexia aponta a dislexia como o distúrbio de maior incidência em sala de aula, atingindo de 5% a 17% da população. Quem não consegue ler o diálogo ainda consegue jogar.',
      },
      {
        title: 'Sistema de save com slots e estado serializado',
        detail:
          'A entidade GameSave guarda dia, NPC atual e as três moedas em colunas próprias, e o inventário e as receitas em campos @Lob. O que é consultável vira coluna; o que só precisa voltar inteiro vira blob. Cada save pertence a um usuário por chave estrangeira e ocupa um slot.',
      },
      {
        title: 'Liderar antes de saber liderar',
        detail:
          'Fui líder de uma squad de cinco pessoas com níveis muito diferentes de experiência, e 86 dos 91 commits são meus. Isso diz as duas coisas ao mesmo tempo: eu puxei o projeto, e eu não soube distribuir o trabalho. Foi o que me ensinou que entregar sozinho não é o mesmo que liderar.',
      },
      {
        title: 'O que eu faria diferente hoje',
        detail:
          'O CSRF está desabilitado e não há camada de teste além do scaffold. Em 2022 eu não sabia o que estava abrindo mão; hoje é a primeira coisa que eu olharia numa revisão. Deixo o repositório aberto justamente por isso — dá para comparar com o que eu escrevo agora.',
      },
    ],
    stack: [
      'Java',
      'Spring Boot',
      'Spring Security',
      'Spring Data JPA',
      'Thymeleaf',
      'MySQL',
      'JavaScript',
      'Maven',
    ],
  },
]

export const profile = {
  name: 'Lucas Emanuel Santana dos Santos',
  handle: 'lucasinmanuel',
  title: 'Engenheiro Backend',
  location: 'Brasil · UTC−3',
  github: 'https://github.com/lucasinmanuel',
  linkedin: 'https://www.linkedin.com/in/lucasinmanuel/',
  email: 'lucasemanuel2077@gmail.com',
  bio: [
    'Trabalho com TypeScript e Node em APIs que ficam de pé em produção, não em protótipo. A maior parte do que construí é código fechado de cliente, então este portfólio mostra as decisões: o que o problema exigia, o que eu escolhi e do que eu abri mão.',
    'O que mais se repete no meu trabalho é manter um banco em dia com uma fonte externa que muda sozinha, sem deixar a leitura lenta: fila com retry, cache com invalidação declarada e sincronização em transação.',
    'Uso Claude Code todo dia. Quase todo repositório meu tem um CLAUDE.md com as convenções do projeto, e mantenho skills próprias para as tarefas que repito.',
  ],
  skills: [
    { group: 'Linguagem', items: ['TypeScript', 'JavaScript', 'Python', 'Solidity'] },
    { group: 'Backend', items: ['Node.js', 'AdonisJS', 'NestJS', 'Hono', 'FastAPI', 'tRPC'] },
    { group: 'Dados', items: ['PostgreSQL', 'MySQL', 'Redis', 'Drizzle', 'Lucid ORM', 'Mongoose'] },
    {
      group: 'Assíncrono',
      items: ['BullMQ', 'WebSocket', 'Socket.IO', 'Workers', 'Schedulers', 'pg_notify'],
    },
    { group: 'Infra', items: ['Docker', 'Docker Compose', 'AWS S3', 'Vercel', 'Railway', 'Cloudflare'] },
    { group: 'Qualidade', items: ['Vitest', 'Japa', 'pytest', 'Biome', 'ESLint'] },
  ],
}
