document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Loader d'intro premium
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('animate-fadeInUp');
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.pointerEvents = 'none';
                setTimeout(() => loader.style.display = 'none', 600);
            }, 1200);
        }
    });

    // Scroll-to-top
    const scrollToTopBtn = document.getElementById('scrollToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Contact form submission (client-side validation)
    const contactForm = document.getElementById('contactForm');
    const contactBtn = document.getElementById('contactBtn');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');
    const contactSuccess = document.getElementById('contactSuccess');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name === '' || email === '' || message === '') {
            alert('Veuillez remplir tous les champs');
            return;
        }

        btnText.textContent = '';
        btnLoader.classList.remove('hidden');
        contactBtn.disabled = true;
        setTimeout(() => {
            btnLoader.classList.add('hidden');
            btnText.textContent = 'Envoyer le message';
            contactBtn.disabled = false;
            contactForm.reset();
            contactSuccess.classList.remove('hidden');
            setTimeout(() => contactSuccess.classList.add('hidden'), 3000);
        }, 1200);

        // Here you would typically send the form data to a backend service
        console.log('Form submitted', { name, email, message });
        alert('Message sent successfully!');
    });

    // Chatbot premium UI logic
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotForm = document.getElementById('chatbotForm');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotMessages = document.getElementById('chatbotMessages');

    function openChatbot() {
        chatbotWindow.classList.remove('hidden');
        chatbotWindow.setAttribute('aria-hidden', 'false');
        chatbotInput.focus();
        chatbotToggle.classList.add('hidden');
    }
    function closeChatbot() {
        console.log('closeChatbot called');
        chatbotWindow.classList.add('hidden');
        chatbotWindow.setAttribute('aria-hidden', 'true');
        chatbotToggle.classList.remove('hidden');
        chatbotToggle.focus();
    }

    // Sécurité : toujours afficher le bouton au chargement
    chatbotWindow.classList.add('hidden');
    chatbotToggle.classList.remove('hidden');

    if (chatbotToggle) chatbotToggle.addEventListener('click', openChatbot);
    if (chatbotClose) chatbotClose.addEventListener('click', closeChatbot);

    // Fermer avec la touche Echap
    document.addEventListener('keydown', (e) => {
        if (!chatbotWindow.classList.contains('hidden') && e.key === 'Escape') {
            closeChatbot();
        }
    });

    // Fermer le chatbot si clic en dehors de la fenêtre
    document.addEventListener('mousedown', (e) => {
        if (!chatbotWindow.classList.contains('hidden') && !chatbotWindow.contains(e.target) && e.target !== chatbotToggle) {
            closeChatbot();
        }
    });

    chatbotForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const msg = chatbotInput.value.trim();
        if (!msg) return;
        addChatMessage(msg, 'user');
        chatbotInput.value = '';
        setTimeout(() => {
            addChatMessage("Je suis un exemple de chatbot premium. Cette fonctionnalité sera bientôt disponible !", 'bot');
        }, 700);
    });

    function addChatMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = sender === 'user' ? 'chatbot-message-user' : 'chatbot-message-bot';
        msgDiv.textContent = text;
        chatbotMessages.appendChild(msgDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
});
