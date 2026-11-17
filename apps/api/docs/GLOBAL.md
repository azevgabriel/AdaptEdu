# Backend Core (NestJS + Prisma + PostgreSQL) — Global Index

Este documento é o ponto de entrada de contexto (`Local Context Entry Point`) para agentes e desenvolvedores trabalhando em `apps/api/`.

## 📖 Arquitetura e Diretrizes

- [NESTJS.md](apps/api/docs/NESTJS.md): Padrões do NestJS (ESM, NodeAdapter, Vitest, Standard Schema) e observabilidade via NestJS Observe.
- [SECURITY.md](apps/api/docs/SECURITY.md): Diretrizes de segurança backend (defesas contra IDOR, sanitização, CORS, rate limiting e auditoria de dependências).

## 🤖 Skills e Conceitos dos Agentes

As instruções e skills do ecossistema Prisma foram centralizadas na pasta `apps/api/docs/skills/`:

- [prisma-composer-core-concepts](apps/api/docs/skills/prisma-composer-core-concepts/SKILL.md): Declarações, serviços (`compute()`), recursos e arquitetura do Prisma Composer.
- [prisma-platform-core-concepts](apps/api/docs/skills/prisma-platform-core-concepts/SKILL.md): Infraestrutura do Prisma Platform, gerenciamento de branches, preview environments e CLI do Prisma.
