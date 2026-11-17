FROM node:26.13.1-alpine

WORKDIR /app

# Instala o OpenSSL, dependência obrigatória do motor do Prisma (Query Engine)
RUN apk add --no-cache openssl

# Copia apenas os arquivos de dependência primeiro para aproveitar o cache do Docker
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Se você já tiver o schema do Prisma configurado, descomente a linha abaixo:
# RUN npx prisma generate

EXPOSE 3000

# Executa o NestJS em modo de desenvolvimento (hot-reload)
CMD ["npm", "run", "start:dev"]