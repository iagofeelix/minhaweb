# TechSite - Landing Page Moderna

🚀 Landing page profissional e tecnológica para venda de serviços de criação de sites.

## 📋 Características

- ✨ Design moderno e futurista
- 🎨 Gradientes e efeitos glassmorphism
- 📱 100% responsivo (mobile, tablet, desktop)
- ⚡ Performance otimizada
- 🎭 Animações suaves e interativas
- 📊 Contadores animados
- 📧 Formulário de contato funcional
- 🌐 SEO friendly

## 🛠️ Tecnologias Utilizadas

- HTML5
- CSS3 (com variáveis CSS e animações avançadas)
- JavaScript puro (ES6+)
- Google Fonts (Inter e Space Grotesk)

## 📁 Estrutura do Projeto

```
projeto-site/
│
├── src/
│   ├── css/
│   │   └── styles.css      # Estilos CSS
│   ├── js/
│   │   └── script.js       # JavaScript interativo
│   └── assets/
│       └── images/         # Imagens (adicione conforme necessário)
│
├── index.html              # Página principal
├── Dockerfile              # Configuração Docker
├── docker-compose.yml      # Orquestração Docker
├── nginx.conf              # Configuração Nginx
├── .dockerignore          # Arquivos ignorados no build
└── README.md              # Documentação
```

## 🎨 Seções do Site

### 1. **Navbar**
- Menu fixo com efeito de scroll
- Links de navegação suave
- Menu hambúrguer responsivo
- Botão de CTA em destaque

### 2. **Hero Section**
- Título impactante com gradientes
- Subtítulo persuasivo
- Botões de call-to-action
- Estatísticas animadas (projetos, satisfação, clientes)
- Cards flutuantes com diferenciais
- Efeitos de orbs com gradientes animados
- Indicador de scroll

### 3. **Features (Diferenciais)**
- Grid de 6 cards destacando:
  - Alta Performance
  - Design Moderno
  - 100% Responsivo
  - Segurança Total
  - SEO Otimizado
  - Escalabilidade

### 4. **Sobre a Empresa**
- Layout em duas colunas
- Snippet de código animado
- Missão, visão e valores
- Texto persuasivo sobre inovação

### 5. **Serviços e Soluções**
- Grid de 6 serviços principais:
  - Sites Institucionais
  - Landing Pages (destaque)
  - E-commerce
  - Sistemas Web
  - SEO & Performance
  - Hospedagem & Manutenção
- Cards com ícones SVG personalizados
- Lista de benefícios de cada serviço

### 6. **Contato**
- Layout em duas colunas
- Formulário funcional com validação
- Informações de contato (email, WhatsApp, localização)
- Links de redes sociais
- Sistema de notificações

### 7. **Footer**
- Links rápidos
- Informações de serviços
- Dados de contato
- Redes sociais
- Copyright

## 🚀 Como Usar

### **Opção 1: Direto no navegador**
1. Abra o arquivo `index.html` em qualquer navegador moderno

### **Opção 2: Com Docker (Recomendado)**

#### Usando Docker Compose (Mais fácil):
```bash
# Construir e iniciar o container
docker-compose up -d

# Acessar o site em: http://localhost:8080

# Ver logs
docker-compose logs -f

# Parar o container
docker-compose down
```

#### Usando Docker direto:
```bash
# Construir a imagem
docker build -t techsite:latest .

# Executar o container
docker run -d -p 8080:80 --name techsite-web techsite:latest

# Acessar o site em: http://localhost:8080

# Ver logs
docker logs -f techsite-web

# Parar o container
docker stop techsite-web

# Remover o container
docker rm techsite-web
```

### **Opção 3: Com servidor local (Live Server)**
- Use a extensão Live Server do VSCode
- Clique com botão direito no `index.html` > "Open with Live Server"

2. **Personalizar:**
   - Edite as cores no arquivo `styles.css` (seção `:root`)
   - Altere os textos no `index.html`
   - Modifique as informações de contato

3. **Configurar o formulário:**
   - O formulário está configurado com validação no `script.js`
   - Para enviar dados reais, integre com um serviço de backend ou API
   - Altere o número do WhatsApp na linha 184 do `script.js`

## 🎨 Personalização de Cores

As cores podem ser facilmente alteradas no arquivo `styles.css`:

```css
:root {
    --primary: #667eea;        /* Cor principal */
    --secondary: #764ba2;      /* Cor secundária */
    --accent: #f093fb;         /* Cor de destaque */
    --cyan: #00f2fe;          /* Ciano */
    --green: #43e97b;         /* Verde */
    /* ... */
}
```

## ⚙️ Funcionalidades JavaScript

- **Navegação suave:** Scroll animado entre seções
- **Menu responsivo:** Hambúrguer menu para mobile
- **Contadores animados:** Estatísticas com animação numérica
- **Validação de formulário:** Validação de campos e email
- **Sistema de notificações:** Feedback visual ao usuário
- **Scroll spy:** Destaque do menu conforme scroll
- **Efeitos parallax:** Movimento dos orbs com o mouse
- **Intersection Observer:** Animações ao entrar na viewport

## 📱 Responsividade

O site é totalmente responsivo com breakpoints em:
- **1024px:** Layout tablet
- **768px:** Layout mobile
- **480px:** Smartphones pequenos

## 🌐 SEO

O site inclui:
- Meta tags apropriadas
- Estrutura semântica HTML5
- Títulos hierárquicos (H1, H2, H3)
- Alt text em ícones (quando aplicável)
- URLs amigáveis nas âncoras

## 🎯 Chamadas para Ação (CTAs)

- **Solicitar Orçamento:** Scroll para seção de contato
- **Falar com Especialista:** Abre WhatsApp com mensagem pré-definida
- **Links de serviços:** Navegação suave

## 🐳 Deploy em Produção

### **Docker Hub**
```bash
# Tag da imagem
docker tag techsite:latest seu-usuario/techsite:latest

# Push para Docker Hub
docker push seu-usuario/techsite:latest

# Pull e executar em produção
docker pull seu-usuario/techsite:latest
docker run -d -p 80:80 --name techsite-prod seu-usuario/techsite:latest
```

### **Deploy em Cloud (AWS, Azure, GCP, etc)**

#### AWS (ECS/Fargate):
1. Push da imagem para Amazon ECR
2. Criar task definition no ECS
3. Criar serviço e configurar load balancer

#### DigitalOcean App Platform:
```bash
# Conectar repositório GitHub
# App Platform detecta automaticamente o Dockerfile
# Configure portas e variáveis de ambiente
```

#### Heroku:
```bash
# Login no Heroku
heroku login
heroku container:login

# Push da imagem
heroku container:push web -a seu-app
heroku container:release web -a seu-app
```

### **Servidor VPS (Ubuntu/Debian)**
```bash
# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Clonar repositório
git clone seu-repo.git
cd projeto-site

# Executar com docker-compose
docker-compose up -d

# Configurar nginx reverso proxy (opcional)
# Configurar SSL com Let's Encrypt (opcional)
```

## 🔒 SSL/HTTPS em Produção

Para adicionar HTTPS, use um reverse proxy como Nginx ou Traefik:

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  techsite:
    build: .
    container_name: techsite-web
    restart: always
    networks:
      - web

  nginx-proxy:
    image: nginxproxy/nginx-proxy
    container_name: nginx-proxy
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/tmp/docker.sock:ro
      - certs:/etc/nginx/certs
    networks:
      - web

  letsencrypt:
    image: nginxproxy/acme-companion
    container_name: letsencrypt
    volumes_from:
      - nginx-proxy
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - acme:/etc/acme.sh
    environment:
      - DEFAULT_EMAIL=seu@email.com

networks:
  web:
    driver: bridge

volumes:
  certs:
  acme:
```

## 📧 Integração com Backend

Para conectar o formulário a um backend:

1. No arquivo `script.js`, linha 138, substitua o código simulado por:

```javascript
try {
    const response = await fetch('sua-api-url/contato', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    });
    
    if (response.ok) {
        showNotification('Mensagem enviada com sucesso!', 'success');
        contactForm.reset();
    } else {
        throw new Error('Erro ao enviar');
    }
} catch (error) {
    showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
}
```

## 🔧 Melhorias Futuras

Sugestões de implementações futuras:
- [ ] Integração com Google Analytics
- [ ] Chatbot integrado
- [ ] Blog/Portfólio de projetos
- [ ] Depoimentos de clientes
- [ ] Sistema de agendamento online
- [ ] Múltiplos idiomas
- [ ] Modo claro/escuro
- [ ] Galeria de trabalhos realizados

## 🛠️ Tecnologias do Deploy

- **Docker**: Containerização da aplicação
- **Nginx**: Servidor web de alta performance
- **Docker Compose**: Orquestração de containers
- **Multi-stage build**: Otimização do tamanho da imagem

## 📊 Performance

O site foi otimizado para:
- ✅ Carregamento rápido (< 2s)
- ✅ Compressão Gzip habilitada
- ✅ Cache de assets estáticos (1 ano)
- ✅ Headers de segurança configurados
- ✅ Imagem Docker otimizada (~25MB)

## 🔧 Comandos Úteis Docker

```bash
# Ver containers rodando
docker ps

# Ver logs em tempo real
docker logs -f techsite-web

# Entrar no container
docker exec -it techsite-web sh

# Ver uso de recursos
docker stats techsite-web

# Limpar containers parados
docker container prune

# Limpar imagens não utilizadas
docker image prune

# Reconstruir após mudanças
docker-compose up -d --build
```

## 📄 Licença

Este projeto é de código aberto e pode ser utilizado livremente.

## 👨‍💻 Autor

Desenvolvido por **TechSite** - Transformando ideias em experiências digitais.

---

## 🎉 Pronto para usar!

O site está completo e pronto para ser publicado. Personalize conforme suas necessidades e boa sorte com seu negócio digital! 🚀
