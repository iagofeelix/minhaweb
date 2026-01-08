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
// INITIALIZE
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✓ Site carregado com sucesso!');
    
    // Adicionar pequeno delay para animações iniciais
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});
