# AdaptEdu 🧩

[![Web Version](https://img.shields.io/badge/web-v1.3.0-0284c7?style=flat-square&logo=next.js&logoColor=white)](apps/web)
[![API Version](https://img.shields.io/badge/api-v1.2.0-e0234e?style=flat-square&logo=nestjs&logoColor=white)](apps/api)
[![Engine Version](https://img.shields.io/badge/engine-v1.1.0-059669?style=flat-square&logo=fastapi&logoColor=white)](apps/engine)
[![Open Issues](https://img.shields.io/github/issues/azevgabriel/AdaptEdu?style=flat-square&color=blue)](https://github.com/azevgabriel/AdaptEdu/issues)

O AdaptEdu é uma plataforma web de código aberto (open-source) projetada para apoiar professores da rede pública brasileira na inclusão de alunos neurodivergentes.

## O Desafio

O número de alunos identificados como neurodivergentes cresce a cada ano. Para além do Autismo, existe um espectro vasto e pouco discutido pela sociedade — englobando TDAH, Dislexia, Síndrome de Tourette, Discalculia, Disgrafia, entre outros. Essa falta de informação deságua diretamente na sala de aula.

Ao mesmo tempo, sabemos que o ensino público brasileiro é frequentemente espremido pelo descaso. Exigir metodologias complexas de inclusão de um professor que lida com a falta de infraestrutura, escassez de materiais básicos e sobrecarga é irreal. Sem o apoio correto para o educador e para o aluno, o resultado é um só: a alta taxa de evasão escolar desses jovens.

## A Solução para o Professor

O AdaptEdu foi construído sob uma premissa fundamental: a tecnologia deve facilitar a vida do educador, não criar mais uma camada de complexidade. A plataforma oferece soluções escaláveis para a realidade de cada escola: desde pequenas adaptações de rotina que não exigem recursos extras, até o auxílio na preparação de planejamentos didáticos completos.

## Nossa Visão: Da Sala de Aula para o Mercado de Trabalho

O objetivo final da plataforma vai além do período escolar. Queremos acolher e integrar o aluno no seu momento de maior vulnerabilidade — a infância e a adolescência — para evitar o abandono dos estudos. Ao garantir essa inclusão básica, preparamos esse jovem para que, na fase adulta, ele tenha consciência de suas próprias aptidões, saiba como se apresentar ao mundo e tenha perspectivas reais de ingresso no mercado de trabalho.

---

## 🐳 Como Executar com Docker

Para subir o ecossistema de serviços de desenvolvimento (Banco de Dados PostgreSQL, API NestJS e Engine de IA em FastAPI) de forma automatizada e com suporte a *hot-reload*:

### 1. Pré-requisitos
- [Docker](https://www.docker.com/) e Docker Compose instalados na máquina.

### 2. Configurar Variáveis de Ambiente
Certifique-se de configurar os arquivos `.env` para cada serviço a partir de seus respectivos exemplos:

```bash
# Engine (FastAPI)
cp apps/engine/.env.example apps/engine/.env

# API (NestJS)
cp apps/api/.env.example apps/api/.env
```

> [!NOTE]
> No arquivo `apps/engine/.env`, configure suas credenciais (ex: `OPENAI_API_KEY`) caso deseje utilizar os recursos de inteligência artificial.

### 3. Construir e Subir os Serviços

Na raiz do repositório, execute:

```bash
docker compose up --build -d
```

### 4. Serviços Disponíveis

Após a inicialização, os seguintes serviços estarão disponíveis:

| Serviço | Contêiner / Origem | Endereço | Descrição |
| :--- | :--- | :--- | :--- |
| **Frontend Web (Next.js)** | Local (`apps/web`) | [http://localhost:5173](http://localhost:5173) | Interface do professor (painel da sala, adaptações e rotinas) |
| **API Core (NestJS)** | `adapt-edu-api` | [http://localhost:3000](http://localhost:3000) | Regras de negócio, orquestração e persistência |
| **AI Engine (FastAPI)** | `adapt-edu-engine` | [http://localhost:8000](http://localhost:8000) | Processamento de IA e raciocínio pedagógico (Docs em `/docs`) |
| **PostgreSQL** | `adapt-edu-postgres` | `localhost:5432` | Banco de dados relacional |

---

## 💻 Como Executar o Frontend (Next.js)

Para executar a interface web do professor localmente em modo de desenvolvimento:

```bash
# 1. Acessar o diretório do frontend
cd apps/web

# 2. Instalar as dependências
npm install

# 3. Iniciar o servidor na porta 5173
npm run dev
```

Acesse **[http://localhost:5173](http://localhost:5173)** no navegador para visualizar a plataforma. O redirecionamento inicial abrirá a tela [http://localhost:5173/minha_sala](http://localhost:5173/minha_sala).
