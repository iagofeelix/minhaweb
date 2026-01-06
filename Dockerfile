# ==================================
# Multi-stage build para otimização
# ==================================

# Stage 1: Build (se necessário processar assets no futuro)
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar arquivos do projeto
COPY . .

# Stage 2: Production com Nginx
FROM nginx:alpine

# Informações do mantenedor
LABEL maintainer="TechSite <contato@techsite.com.br>"
LABEL description="Landing page TechSite - Serviços de criação de sites"

# Remover configuração padrão do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar arquivos do site para o nginx
COPY --from=builder /app/index.html /usr/share/nginx/html/
COPY --from=builder /app/src /usr/share/nginx/html/src/

# Copiar configuração customizada do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor porta 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
