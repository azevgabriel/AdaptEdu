FROM python:3.11-slim

WORKDIR /app

# Variáveis de ambiente para otimização do Python no Docker
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Instala compiladores C/C++ essenciais para instalar pacotes pesados do ecossistema de IA
RUN apt-get update && \
    apt-get install -y gcc g++ && \
    rm -rf /var/lib/apt/lists/*

# Copia o arquivo de dependências e instala
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia o restante do código da engine
COPY . .

EXPOSE 8000

# Executa o Uvicorn com flag --reload ativada para refletir mudanças no código instantaneamente
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]