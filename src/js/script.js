// ===================================
// NAVBAR SCROLL BEHAVIOR
// ===================================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.getElementById('menuToggle');
const navLinksContainer = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===================================
// MOBILE MENU TOGGLE
// ===================================
menuToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ===================================
// ACTIVE NAV LINK ON SCROLL
// ===================================
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===================================
// SMOOTH SCROLL
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// ANIMATED COUNTERS
// ===================================
const statNumbers = document.querySelectorAll('.stat-number');
let hasAnimated = false;

function animateCounters() {
    const heroSection = document.querySelector('.hero');
    const heroPosition = heroSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight;

    if (heroPosition < screenPosition && !hasAnimated) {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 segundos
            const increment = target / (duration / 16); // 60 FPS
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                    // Adiciona % para o stat de satisfação
                    if (target === 98) {
                        stat.textContent = target;
                    }
                }
            };

            updateCounter();
        });
        hasAnimated = true;
    }
}

window.addEventListener('scroll', animateCounters);
// Executar uma vez no carregamento
animateCounters();

// ===================================
// INTERSECTION OBSERVER - FADE IN ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Adicionar animação aos elementos
const animatedElements = document.querySelectorAll(
    '.feature-card, .service-card, .value-item, .about-text, .contact-info'
);

animatedElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ===================================
// FORM VALIDATION & SUBMISSION
// ===================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Pegar os valores do formulário
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };

    // Validação básica
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
        showNotification('Por favor, preencha todos os campos.', 'error');
        return;
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showNotification('Por favor, insira um email válido.', 'error');
        return;
    }

    // Aqui você pode adicionar a lógica para enviar o formulário
    // Por exemplo, usando fetch para uma API
    
    // Simulando envio
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<span>Enviando...</span>';
    submitButton.disabled = true;

    // Simular delay de envio
    setTimeout(() => {
        showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        contactForm.reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 1500);
});

// ===================================
// NOTIFICATION SYSTEM
// ===================================
function showNotification(message, type = 'success') {
    // Remover notificação existente se houver
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : '⚠'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;

    // Adicionar estilos inline (você pode mover isso para o CSS)
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #43e97b, #38f9d7)' : 'linear-gradient(135deg, #fa709a, #fee140)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;

    document.body.appendChild(notification);

    // Remover após 5 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Adicionar animações de notificação ao CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .notification-icon {
        font-size: 1.5rem;
        font-weight: bold;
    }

    .notification-message {
        font-weight: 500;
    }
`;
document.head.appendChild(style);

// ===================================
// CTA BUTTONS ACTIONS
// ===================================
const ctaButtons = document.querySelectorAll('.btn-primary, .nav-cta');

ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Se não for o botão de submit do formulário
        if (button.type !== 'submit') {
            e.preventDefault();
            // Scroll para a seção de contato
            const contactSection = document.getElementById('contato');
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Botão "Falar com Especialista" - WhatsApp
const whatsappButtons = document.querySelectorAll('.btn-secondary');

whatsappButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const phone = '5511999999999'; // Altere para o número real
        const message = encodeURIComponent('Olá! Gostaria de falar com um especialista sobre criação de sites.');
        window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    });
});

// ===================================
// PARALLAX EFFECT ON HERO ORBS
// ===================================
const orbs = document.querySelectorAll('.gradient-orb');

window.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const xMove = (x - 0.5) * speed;
        const yMove = (y - 0.5) * speed;
        
        orb.style.transform = `translate(${xMove}px, ${yMove}px)`;
    });
});

// ===================================
// FLOATING CARDS ANIMATION
// ===================================
const floatingCards = document.querySelectorAll('.floating-card');

floatingCards.forEach((card, index) => {
    // Adicionar efeito de hover 3D
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.1) rotateY(10deg)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1) rotateY(0deg)';
    });
});

// ===================================
// LAZY LOADING IMAGES
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// ===================================
// CURSOR GLOW EFFECT (OPCIONAL)
// ===================================
const createCursorGlow = () => {
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    cursorGlow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(102, 126, 234, 0.15), transparent);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.15s ease;
        display: none;
    `;
    document.body.appendChild(cursorGlow);

    // Mostrar apenas em desktop
    if (window.innerWidth > 1024) {
        cursorGlow.style.display = 'block';

        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = `${e.clientX - 150}px`;
            cursorGlow.style.top = `${e.clientY - 150}px`;
        });
    }
};

// Ativar efeito de glow no cursor (opcional - remova se preferir)
// createCursorGlow();

// ===================================
// TYPEWRITER EFFECT (OPCIONAL)
// ===================================
function typewriterEffect(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Debounce function para otimizar eventos de scroll
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Aplicar debounce aos eventos de scroll
const debouncedHighlight = debounce(highlightNavigation);
window.addEventListener('scroll', debouncedHighlight);

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%c🚀 MinhaWeb - Desenvolvido com ❤️', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%cInteressado em nossos serviços? Entre em contato!', 'color: #a0aec0; font-size: 12px;');

// ===================================
// CHATBOT WIDGET
// ===================================
const chatbotWidget = document.getElementById('chatbotWidget');
const chatbotTrigger = document.getElementById('chatbotTrigger');
const chatbotWindow = document.getElementById('chatbotWindow');
const minimizeBtn = document.getElementById('minimizeBtn');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const quickOptions = document.querySelectorAll('.quick-option');

// Configuração do WhatsApp
const WHATSAPP_NUMBER = '5511999999999'; // ⚠️ ALTERE PARA SEU NÚMERO (com código do país e DDD)
const WHATSAPP_WELCOME = 'Olá! Vim através do site e gostaria de conversar sobre:';

// Toggle do chat
function toggleChat() {
    chatbotTrigger.classList.toggle('active');
    chatbotWindow.classList.toggle('active');
    
    if (chatbotWindow.classList.contains('active')) {
        chatInput.focus();
    }
}

chatbotTrigger.addEventListener('click', toggleChat);
minimizeBtn.addEventListener('click', toggleChat);

// Adicionar mensagem do bot
function addBotMessage(text, delay = 0) {
    setTimeout(() => {
        const messageEl = document.createElement('div');
        messageEl.className = 'message bot-message';
        messageEl.innerHTML = `
            <div class="message-avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="url(#msgGrad${Date.now()})"/>
                    <defs>
                        <linearGradient id="msgGrad${Date.now()}" x1="0" y1="0" x2="24" y2="24">
                            <stop stop-color="#667eea"/>
                            <stop offset="1" stop-color="#764ba2"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <div class="message-content">
                <p>${text}</p>
            </div>
        `;
        chatbotMessages.appendChild(messageEl);
        scrollToBottom();
    }, delay);
}

// Adicionar mensagem do usuário
function addUserMessage(text) {
    const messageEl = document.createElement('div');
    messageEl.className = 'message user-message';
    messageEl.innerHTML = `
        <div class="message-avatar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="url(#userGrad${Date.now()})"/>
                <defs>
                    <linearGradient id="userGrad${Date.now()}" x1="0" y1="0" x2="24" y2="24">
                        <stop stop-color="#43e97b"/>
                        <stop offset="1" stop-color="#00f2fe"/>
                    </linearGradient>
                </defs>
            </svg>
        </div>
        <div class="message-content">
            <p>${text}</p>
        </div>
    `;
    chatbotMessages.appendChild(messageEl);
    scrollToBottom();
}

// Indicador de digitação
function showTypingIndicator() {
    const typingEl = document.createElement('div');
    typingEl.className = 'message bot-message typing-message';
    typingEl.innerHTML = `
        <div class="message-avatar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="url(#typingGrad)"/>
                <defs>
                    <linearGradient id="typingGrad" x1="0" y1="0" x2="24" y2="24">
                        <stop stop-color="#667eea"/>
                        <stop offset="1" stop-color="#764ba2"/>
                    </linearGradient>
                </defs>
            </svg>
        </div>
        <div class="message-content">
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    chatbotMessages.appendChild(typingEl);
    scrollToBottom();
    return typingEl;
}

// Processar mensagem e responder
function processMessage(userMessage) {
    addUserMessage(userMessage);
    chatInput.value = '';
    
    const typing = showTypingIndicator();
    
    setTimeout(() => {
        typing.remove();
        
        // Respostas inteligentes baseadas na mensagem
        if (userMessage.toLowerCase().includes('orçamento') || userMessage.toLowerCase().includes('orcamento')) {
            addBotMessage('Ótimo! Vou te conectar com nossa equipe via WhatsApp para fazer um orçamento personalizado. 📊');
            setTimeout(() => {
                addBotMessage('Clique no botão abaixo para continuar no WhatsApp:');
                addWhatsAppButton(userMessage);
            }, 1000);
        } 
        else if (userMessage.toLowerCase().includes('serviço') || userMessage.toLowerCase().includes('servico')) {
            addBotMessage('Oferecemos diversos serviços: 💼');
            setTimeout(() => {
                addBotMessage('✅ Criação de Sites\n✅ Landing Pages\n✅ E-commerce\n✅ Sistemas Web\n✅ Apps Mobile');
                setTimeout(() => {
                    addBotMessage('Vamos conversar no WhatsApp sobre qual se encaixa melhor para você?');
                    addWhatsAppButton(userMessage);
                }, 1500);
            }, 800);
        }
        else if (userMessage.toLowerCase().includes('projeto')) {
            addBotMessage('Que legal! Adoramos ouvir sobre novos projetos. 🚀');
            setTimeout(() => {
                addBotMessage('Vamos conversar no WhatsApp para você me contar todos os detalhes?');
                addWhatsAppButton(userMessage);
            }, 1000);
        }
        else if (userMessage.toLowerCase().includes('prazo') || userMessage.toLowerCase().includes('tempo') || userMessage.toLowerCase().includes('valor')) {
            addBotMessage('Prazos e valores variam de acordo com o projeto. ⏱️💰');
            setTimeout(() => {
                addBotMessage('Mas posso adiantar: trabalhamos com agilidade e preços justos!');
                setTimeout(() => {
                    addBotMessage('Vamos para o WhatsApp para eu entender melhor o que você precisa?');
                    addWhatsAppButton(userMessage);
                }, 1500);
            }, 800);
        }
        else {
            addBotMessage('Entendo! Vou te conectar com nossa equipe via WhatsApp para te ajudar melhor. 💬');
            setTimeout(() => {
                addWhatsAppButton(userMessage);
            }, 800);
        }
    }, 1500);
}

// Adicionar botão do WhatsApp
function addWhatsAppButton(message) {
    const btnEl = document.createElement('div');
    btnEl.className = 'message bot-message';
    btnEl.innerHTML = `
        <div class="message-avatar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#25D366"/>
            </svg>
        </div>
        <div class="message-content">
            <button onclick="openWhatsApp('${message.replace(/'/g, "\\'")}')" style="
                width: 100%;
                padding: 14px 20px;
                background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
                border: none;
                border-radius: 12px;
                color: white;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                transition: all 0.2s;
            " onmouseover="this.style.transform='scale(1.02)'; this.style.boxShadow='0 8px 24px rgba(37, 211, 102, 0.3)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none'">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Continuar no WhatsApp
            </button>
        </div>
    `;
    chatbotMessages.appendChild(btnEl);
    scrollToBottom();
}

// Abrir WhatsApp
window.openWhatsApp = function(userMessage) {
    const fullMessage = `${WHATSAPP_WELCOME}\n\n${userMessage}`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(fullMessage)}`;
    window.open(whatsappUrl, '_blank');
    
    // Adicionar mensagem de confirmação
    setTimeout(() => {
        addBotMessage('Perfeito! Abrimos o WhatsApp para você. Estamos te esperando lá! 😊');
    }, 500);
};

// Scroll para o final
function scrollToBottom() {
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Enviar mensagem
function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        processMessage(message);
    }
}

sendBtn.addEventListener('click', sendMessage);

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Opções rápidas
quickOptions.forEach(option => {
    option.addEventListener('click', () => {
        const message = option.getAttribute('data-message');
        processMessage(message);
        
        // Esconder opções rápidas após o primeiro clique
        document.getElementById('quickOptions').style.display = 'none';
    });
});

// Animação de entrada do chatbot
setTimeout(() => {
    chatbotWidget.style.opacity = '1';
    chatbotWidget.style.transform = 'scale(1)';
}, 1000);

// ===================================
// INITIALIZE
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✓ Site carregado com sucesso!');
    console.log('💬 Chatbot WhatsApp ativado!');
    
    // Adicionar pequeno delay para animações iniciais
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

