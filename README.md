AdaptEdu 🧩

Uma plataforma open-source desenvolvida para empoderar professores da rede pública brasileira na inclusão de alunos neurodivergentes (TDAH, Autismo, Dislexia, Deficiência Intelectual).

Nossa visão de longo prazo é criar um ecossistema completo de inclusão (adaptação automática de materiais, geração de PEI e acompanhamento). Porém, nosso primeiro grande passo (Fase 1) resolve um problema logístico imediato e diário: o manejo espacial e comportamental da sala de aula.

🎯 Objetivo Atual (Fase 1): Simulador Espacial Inclusivo

Na realidade das escolas públicas, o aluno com laudo acompanha a mesma grade curricular na mesma sala (frequentemente lotada) que os demais. Muitas vezes, a adaptação mais eficaz e rápida que o professor tem à disposição é espacial: onde o aluno senta, quais os estímulos visuais/auditivos ao redor e quem são seus colegas próximos.

Este módulo é um Otimizador Espacial interativo. O professor desenha a sala, cadastra os perfis, e a Inteligência Artificial calcula a melhor distribuição para reduzir crises sensoriais e aumentar o foco.

⚙️ Como Funciona o MVP

Mapeamento do Ambiente (Grid): O professor define o tamanho da sala (ex: 5x7 carteiras) e posiciona elementos de atenção/distração (Porta, Janelas, Lousa, Mesa do Professor).

Classificação da Turma: Cadastro rápido do perfil comportamental geral (alunos "âncora/focados", alunos "agitados") e dos alunos neurodivergentes (ex: TDAH, Autismo).

Motor de Recomendação (IA): O sistema analisa as restrições espaciais e pedagógicas (ex: autistas longe da porta e perto de paredes; TDAH longe da janela e flanqueado por alunos âncora).

Visualização e Justificativa: A plataforma devolve o mapa da sala organizado e um relatório gerado por IA explicando o porquê pedagógico daquela configuração.

🛠️ Tecnologias e Arquitetura

O projeto adota uma arquitetura distribuída para separar a interface interativa, as regras de negócio e o motor de Inteligência Artificial responsável pelo cálculo espacial complexo.

Front-end Interativo

Next.js (React, Tailwind CSS)

Responsabilidade: Interface rica com drag-and-drop (arrastar e soltar) para montar a planta da sala e visualizar a disposição dos alunos.

Back-end Core

NestJS (Node.js, TypeScript)

Responsabilidade: API principal, autenticação do professor, salvamento do "estado" das salas de aula e das turmas no banco de dados (PostgreSQL + Prisma). Atua como orquestrador, enviando o JSON da sala para o motor de IA.

Microsserviço de IA & Raciocínio Espacial

FastAPI (Python) + LangChain

Responsabilidade: Recebe o JSON com o mapa e o perfil dos alunos. Usa chains do LangChain para injetar as diretrizes pedagógicas em um LLM (ex: OpenAI), tratando o problema como um Constraint Satisfaction Problem. Retorna a matriz preenchida em formato estruturado (JSON) e a justificativa pedagógica.

📁 Estrutura do Monorepo

adapt-edu/
├── apps/
│ ├── web-app/ # Front-end (Next.js) - Simulador Drag & Drop
│ ├── api-core/ # Back-end (NestJS) - Regras de negócio e BD
│ └── ia-engine/ # Raciocínio (FastAPI) - LLM e LangChain
├── packages/ # Configurações compartilhadas (ESLint, Prettier)
├── docker-compose.yml # Orquestração do Banco de Dados (PostgreSQL)
└── README.md

🖥️ Como Iniciar o Projeto Localmente

1. Clone e Infraestrutura Base

git clone https://github.com/seu-usuario/adapt-edu.git
cd adapt-edu
docker-compose up -d # Inicia o PostgreSQL

2. API Core (NestJS)

cd apps/api-core
npm install

# Configure seu .env baseado no .env.example

npm run start:dev

3. Motor de IA (FastAPI)

cd apps/ia-engine
python -m venv venv
source venv/bin/activate # ou venv\Scripts\activate no Windows
pip install -r requirements.txt

# Adicione sua chave da OpenAI no .env

uvicorn main:app --reload --port 8000

4. Front-end (Next.js)

cd apps/web-app
npm install
npm run dev

Acesse o simulador em http://localhost:3000.

🤝 Próximos Passos do Roadmap

[ ] Construção da interface interativa da matriz da sala (DnD).
[ ] Integração do StructuredOutputParser no LangChain para garantir que a IA devolva coordenadas exatas.
[ ] Banco de dados para salvar diferentes configurações de turmas para um mesmo professor.
[ ] (Fase 2) Início do módulo de adaptação de material didático (OCR).
