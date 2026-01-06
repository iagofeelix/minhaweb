#!/bin/bash

# Script de Deploy - TechSite
# Uso: ./deploy.sh [ambiente]
# Ambientes: local, staging, production

set -e

AMBIENTE=${1:-local}
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "🚀 Iniciando deploy para ambiente: $AMBIENTE"
echo "📅 Timestamp: $TIMESTAMP"
echo ""

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Função de log
log_info() {
    echo -e "${GREEN}✓${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}⚠${NC} $1"
}

log_error() {
    echo -e "${RED}✗${NC} $1"
}

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    log_error "Docker não está instalado!"
    exit 1
fi

log_info "Docker encontrado"

# Verificar se docker-compose está disponível
if ! command -v docker-compose &> /dev/null; then
    log_error "Docker Compose não está instalado!"
    exit 1
fi

log_info "Docker Compose encontrado"

# Deploy baseado no ambiente
case $AMBIENTE in
    local)
        log_info "Fazendo deploy LOCAL..."
        
        # Parar containers existentes
        log_info "Parando containers existentes..."
        docker-compose down 2>/dev/null || true
        
        # Construir imagem
        log_info "Construindo imagem..."
        docker-compose build
        
        # Iniciar containers
        log_info "Iniciando containers..."
        docker-compose up -d
        
        # Aguardar health check
        log_info "Aguardando health check..."
        sleep 5
        
        # Testar
        if curl -s -o /dev/null -w "%{http_code}" http://localhost:8080 | grep -q "200"; then
            log_info "Deploy concluído com sucesso!"
            echo ""
            echo "🌐 Site disponível em: http://localhost:8080"
        else
            log_error "Falha no health check!"
            exit 1
        fi
        ;;
        
    staging)
        log_info "Fazendo deploy STAGING..."
        
        # Tag da imagem
        IMAGE_TAG="techsite:staging-$TIMESTAMP"
        
        log_info "Criando tag: $IMAGE_TAG"
        docker-compose build
        docker tag projeto-site-techsite:latest $IMAGE_TAG
        
        log_warn "Push para registry não configurado"
        log_warn "Configure seu Docker registry primeiro"
        
        # Exemplo de push (descomente e configure):
        # docker tag $IMAGE_TAG seu-registry.com/$IMAGE_TAG
        # docker push seu-registry.com/$IMAGE_TAG
        ;;
        
    production)
        log_warn "Deploy em PRODUÇÃO!"
        read -p "Tem certeza? (yes/no): " CONFIRM
        
        if [ "$CONFIRM" != "yes" ]; then
            log_error "Deploy cancelado pelo usuário"
            exit 1
        fi
        
        log_info "Fazendo deploy PRODUCTION..."
        
        # Tag da imagem
        IMAGE_TAG="techsite:v$TIMESTAMP"
        
        log_info "Criando tag: $IMAGE_TAG"
        docker-compose build
        docker tag projeto-site-techsite:latest $IMAGE_TAG
        docker tag projeto-site-techsite:latest techsite:latest
        
        log_warn "Push para registry não configurado"
        log_warn "Configure seu Docker registry primeiro"
        
        # Exemplo de push (descomente e configure):
        # docker tag $IMAGE_TAG seu-registry.com/$IMAGE_TAG
        # docker push seu-registry.com/$IMAGE_TAG
        # docker push seu-registry.com/techsite:latest
        ;;
        
    *)
        log_error "Ambiente inválido: $AMBIENTE"
        echo "Uso: ./deploy.sh [local|staging|production]"
        exit 1
        ;;
esac

echo ""
log_info "Deploy finalizado!"
