// js/ui/chatbot.js
// Place ici toute la logique du chatbot premium (openChatbot, closeChatbot, etc.)

export function initChatbot() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotForm = document.getElementById('chatbotForm');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotMessages = document.getElementById('chatbotMessages');

    function openChatbot() {
        chatbotWindow.classList.remove('hidden');
        chatbotWindow.removeAttribute('inert');
        chatbotWindow.setAttribute('aria-hidden', 'false');
        chatbotInput.focus();
        chatbotToggle.classList.add('hidden');
    }
    function closeChatbot() {
        if (chatbotWindow.contains(document.activeElement)) {
            document.activeElement.blur();
            setTimeout(() => { chatbotToggle.focus(); }, 10);
        }
        chatbotWindow.classList.add('hidden');
        chatbotWindow.setAttribute('inert', '');
        chatbotWindow.setAttribute('aria-hidden', 'true');
        chatbotToggle.classList.remove('hidden');
    }
    if (chatbotToggle) chatbotToggle.addEventListener('click', openChatbot);
    if (chatbotClose) chatbotClose.addEventListener('click', closeChatbot);
    if (chatbotClose) chatbotClose.addEventListener('mousedown', (e) => { e.stopPropagation(); });
    document.addEventListener('keydown', (e) => {
        if (!chatbotWindow.classList.contains('hidden') && (e.key === 'Escape' || e.key === 'Esc')) {
            closeChatbot();
        }
    });
    document.addEventListener('mousedown', (e) => {
        if (!chatbotWindow.classList.contains('hidden') && !chatbotWindow.contains(e.target) && e.target !== chatbotToggle && !chatbotToggle.contains(e.target)) {
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
    chatbotWindow.classList.add('hidden');
    chatbotWindow.setAttribute('aria-hidden', 'true');
    chatbotToggle.classList.remove('hidden');
}
