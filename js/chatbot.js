/**
 * Tier 1 Home Services Chatbot
 * Handles chatbot UI and interactions
 */

const initChatbot = () => {
  // Check if chatbot already exists
  if (document.querySelector('.chatbot-container')) return;

  // Create HTML structure
  const chatbotHTML = `
    <button class="chatbot-toggler" aria-label="Toggle chat">
      <i class="fas fa-comment"></i>
       <i class="fas fa-hard-hat" style="position: absolute; top: 10px; right: 12px; color: #FFC107; font-size: 14px; transform: rotate(15deg);"></i>
    </button>
    <div class="chatbot-container">
      <div class="chatbot-header">
        <div class="chatbot-header-info">
          <div class="chatbot-avatar" style="position: relative;">
            <i class="fas fa-robot"></i>
            <i class="fas fa-hard-hat" style="position: absolute; top: -8px; right: -6px; color: #FFC107; font-size: 18px; transform: rotate(15deg); text-shadow: 1px 1px 2px rgba(0,0,0,0.5);"></i>
          </div>
          <div class="chatbot-title">
            <h3>Tier 1 Assistant</h3>
            <p>Online | Replies Instantly</p>
          </div>
        </div>
        <button class="chatbot-close" aria-label="Close chat">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="chatbot-messages" id="chatbotMessages">
        <div class="chat-message bot">
          <div class="message-content">
            Hello! 👋 Welcome to Tier 1 Home Services. How can I help you with your remodeling project today?
          </div>
        </div>
      </div>
      <form class="chatbot-input" id="chatbotForm">
        <input type="text" placeholder="Type a message..." required>
        <button type="submit" class="chatbot-send-btn">
          <i class="fas fa-paper-plane"></i>
        </button>
      </form>
    </div>
  `;

  // Inject HTML
  const chatbotWrapper = document.createElement('div');
  chatbotWrapper.innerHTML = chatbotHTML;
  document.body.appendChild(chatbotWrapper);

  // References
  const toggler = document.querySelector('.chatbot-toggler');
  const closeBtn = document.querySelector('.chatbot-close');
  const container = document.querySelector('.chatbot-container');
  const form = document.getElementById('chatbotForm');
  const messagesContainer = document.getElementById('chatbotMessages');
  const input = form.querySelector('input');

  // Toggle Functionality
  const toggleChat = () => {
    container.classList.toggle('show');
    const isShown = container.classList.contains('show');
    toggler.innerHTML = isShown ? '<i class="fas fa-times"></i>' : '<i class="fas fa-comment"></i>';
    if (isShown) input.focus();
  };

  toggler.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', toggleChat);

  // Message Handling
  const addMessage = (text, sender) => {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${sender}`;
    msgDiv.innerHTML = `<div class="message-content">${text}</div>`;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  const showTyping = () => {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot typing';
    typingDiv.innerHTML = `
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return typingDiv;
  };

  // State Management
  let chatState = 'idle'; // idle, scheduling_name, scheduling_service, scheduling_date
  let appointmentData = {};

  const getBotResponse = (msg) => {
    const lowerMsg = msg.toLowerCase();

    // Scheduling Flow
    if (chatState === 'scheduling_name') {
      appointmentData.name = msg;
      chatState = 'scheduling_service';
      return "Thanks " + msg.split(' ')[0] + "! What service are you interested in? (e.g., Bathroom, Kitchen, Flooring)";
    }

    if (chatState === 'scheduling_service') {
      appointmentData.service = msg;
      chatState = 'scheduling_date';
      return "Great choice! When would you like to schedule the consultation? (e.g., Next Monday, Dec 15th)";
    }

    if (chatState === 'scheduling_date') {
      appointmentData.date = msg;
      chatState = 'scheduling_email';
      return "Noted. What's the best email address to contact you?";
    }

    if (chatState === 'scheduling_email') {
      appointmentData.email = msg;
      chatState = 'idle';
      // console.log('Appointment Booked:', appointmentData);
      return `Perfect! I've scheduled a tentative appointment for a ${appointmentData.service} consultation on ${appointmentData.date}. We'll send a confirmation to ${appointmentData.email} shortly!`;
    }

    // General Responses
    if (lowerMsg.includes('schedule') || lowerMsg.includes('appointment') || lowerMsg.includes('book') || lowerMsg.includes('consultation')) {
      chatState = 'scheduling_name';
      return "I can help you schedule a free consultation! First, what is your name?";
    }

    if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
      return "Hello there! dealing with a bathroom, kitchen, or flooring project?";
    }
    if (lowerMsg.includes('estimate') || lowerMsg.includes('price') || lowerMsg.includes('cost')) {
      return "We offer free estimates! You can click the 'Get Your Free Estimate' button on our homepage or tell me details here.";
    }
    if (lowerMsg.includes('service') || lowerMsg.includes('flooring') || lowerMsg.includes('bathroom') || lowerMsg.includes('kitchen')) {
      return "We specialize in Bathroom Remodels, Kitchen Upgrades, and all types of Flooring (Tile, Hardwood, Vinyl). Which one are you interested in?";
    }
    // FAQs
    if (lowerMsg.includes('license') || lowerMsg.includes('insured') || lowerMsg.includes('insurance')) {
      return "Yes, Tier 1 Home Services is fully licensed and insured for your protection and peace of mind.";
    }
    if (lowerMsg.includes('area') || lowerMsg.includes('location') || lowerMsg.includes('where')) {
      return "We serve the entire DFW metroplex, including Frisco, Plano, McKinney, Lewisville, and Denton.";
    }
    if (lowerMsg.includes('long') || lowerMsg.includes('time') || lowerMsg.includes('duration')) {
      return "Project timelines vary, but a typical bathroom remodel takes 2-3 weeks. We'll provide a detailed schedule with your estimate.";
    }
    if (lowerMsg.includes('financing') || lowerMsg.includes('payment')) {
      return "We accept all major credit cards and checks. Ask us about our current financing partners during your consultation!";
    }

    if (lowerMsg.includes('contact') || lowerMsg.includes('phone') || lowerMsg.includes('email')) {
      return "You can reach us at contact@tier1homeservices.com or call us directly. Visit our Contact page for more info!";
    }

    return "Thanks for reaching out! One of our experts will be with you shortly. You can also ask to 'schedule an appointment' to book a time with us.";
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = input.value.trim();
    if (!msg) return;

    addMessage(msg, 'user');
    input.value = '';

    const typingIndicator = showTyping();

    // Simulate network delay
    setTimeout(() => {
      typingIndicator.remove();
      const botResponse = getBotResponse(msg);
      addMessage(botResponse, 'bot');
    }, 1000);
  });
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChatbot);
} else {
  initChatbot();
}

export default initChatbot;
