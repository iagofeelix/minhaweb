# 🚀 GUIA RÁPIDO - MinhaWeb

## ✅ Status do Projeto

**Seu site está RODANDO com sucesso!** 🎉

- 🌐 **URL Local**: http://localhost:8080
- 🐳 **Container**: MinhaWeb-web (rodando)
- ⚡ **Status**: OK (200)

---

## 📋 Comandos Essenciais

### **Opção 1: Usando Make (Recomendado)**

```bash
# Ver todos os comandos disponíveis
make help

# Iniciar o site
make up

# Parar o site
make down

# Ver logs em tempo real
make logs

# Reiniciar
make restart

# Reconstruir após mudanças
make rebuild

# Limpar tudo
make clean
```

### **Opção 2: Usando Docker Compose**

```bash
# Iniciar
docker-compose up -d

# Parar
docker-compose down

# Ver logs
docker-compose logs -f

# Reiniciar
docker-compose restart

# Reconstruir
docker-compose up -d --build
```

---

## 🔧 Como Fazer Mudanças

1. **Edite os arquivos:**
   - `index.html` - Conteúdo HTML
   - `src/css/styles.css` - Estilos
   - `src/js/script.js` - JavaScript

2. **Reconstrua o container:**
   ```bash
   make rebuild
   # ou
   docker-compose up -d --build
   ```

3. **Acesse:** http://localhost:8080

---

## 📱 Personalizações Importantes

### 1. **Alterar número do WhatsApp**
Edite `src/js/script.js` na linha ~184:
```javascript
const phone = '5511999999999'; // Seu número aqui
```

### 2. **Alterar informações de contato**
Edite `index.html` nas seções:
- Email: Procure por `contato@MinhaWeb.com.br`
- Telefone: Procure por `(11) 99999-9999`
- Localização: Procure por `São Paulo, SP`

### 3. **Alterar cores**
Edite `src/css/styles.css` no início:
```css
:root {
    --primary: #667eea;    /* Cor principal */
    --secondary: #764ba2;  /* Cor secundária */
    /* ... */
}
```

---

## 🌐 Deploy em Produção

### **Opção 1: DigitalOcean**
1. Crie um Droplet Ubuntu
2. Instale Docker: `curl -fsSL https://get.docker.com | sh`
3. Clone seu repositório
4. Execute: `docker-compose up -d`
5. Configure domínio e SSL

### **Opção 2: AWS/Azure/GCP**
1. Push imagem para registry (ECR/ACR/GCR)
2. Deploy usando serviços gerenciados
3. Configure load balancer e SSL

### **Opção 3: Heroku**
```bash
heroku container:login
heroku container:push web -a seu-app
heroku container:release web -a seu-app
```

---

## 🔍 Troubleshooting

### **Porta 8080 em uso?**
```bash
# Parar o container
docker-compose down

# Edite docker-compose.yml e mude a porta:
ports:
  - "3000:80"  # Agora usa porta 3000

# Reinicie
docker-compose up -d
```

### **Container não inicia?**
```bash
# Ver logs
docker logs MinhaWeb-web

# Remover e recriar
docker-compose down
docker-compose up -d --build
```

### **Site não carrega?**
```bash
# Verificar se está rodando
docker ps

# Testar resposta
curl http://localhost:8080

# Ver logs do nginx
docker logs MinhaWeb-web -f
```

---

## 📊 Informações Técnicas

- **Imagem Base**: nginx:alpine (~25MB)
- **Servidor Web**: Nginx 1.29.4
- **Compressão**: Gzip habilitada
- **Cache**: Assets com 1 ano de cache
- **Health Check**: Ativo
- **Porta**: 8080 (local) → 80 (container)

---

## 🎯 Próximos Passos

1. ✅ Site rodando localmente
2. 🎨 Personalize conteúdo e cores
3. 📧 Configure formulário de contato
4. 🌐 Registre um domínio
5. 🚀 Faça deploy em produção
6. 🔒 Configure SSL/HTTPS
7. 📊 Adicione Google Analytics

---

## 💡 Dicas

- Use `make logs` para ver o que está acontecendo
- Sempre reconstrua após mudanças com `make rebuild`
- Teste localmente antes de fazer deploy
- Mantenha backup das suas personalizações
- Considere usar Git para versionar o código

---

## 📞 Suporte

Se tiver problemas:
1. Verifique os logs: `make logs`
2. Reinicie: `make restart`
3. Reconstrua: `make rebuild`
4. Limpe tudo e comece de novo: `make clean && make up`

**Aproveite seu site! 🚀✨**
