# Makefile para facilitar comandos Docker

.PHONY: help build up down logs restart clean test

help: ## Mostra esta mensagem de ajuda
	@echo "Comandos disponíveis:"
	@echo "  make build    - Constrói a imagem Docker"
	@echo "  make up       - Inicia os containers"
	@echo "  make down     - Para os containers"
	@echo "  make logs     - Mostra os logs"
	@echo "  make restart  - Reinicia os containers"
	@echo "  make clean    - Remove containers, imagens e volumes"
	@echo "  make test     - Testa se o site está funcionando"

build: ## Constrói a imagem Docker
	@echo "🔨 Construindo imagem Docker..."
	docker-compose build

up: ## Inicia os containers
	@echo "🚀 Iniciando containers..."
	docker-compose up -d
	@echo "✅ Site disponível em http://localhost:8081"

down: ## Para os containers
	@echo "🛑 Parando containers..."
	docker-compose down

logs: ## Mostra os logs
	@echo "📋 Mostrando logs..."
	docker-compose logs -f

restart: ## Reinicia os containers
	@echo "🔄 Reiniciando containers..."
	docker-compose restart

clean: ## Remove containers, imagens e volumes
	@echo "🧹 Limpando containers e imagens..."
	docker-compose down -v
	docker rmi MinhaWeb:latest 2>/dev/null || true
	@echo "✅ Limpeza concluída"

test: ## Testa se o site está funcionando
	@echo "🧪 Testando site..."
	@curl -s -o /dev/null -w "Status: %{http_code}\n" http://localhost:8081

dev: ## Inicia em modo desenvolvimento com logs
	@echo "💻 Iniciando em modo desenvolvimento..."
	docker-compose up

rebuild: ## Reconstrói e reinicia
	@echo "🔨 Reconstruindo..."
	docker-compose up -d --build
	@echo "✅ Site reconstruído e disponível em http://localhost:8080"
