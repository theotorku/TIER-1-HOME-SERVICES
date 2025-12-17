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
            Hello! 👋 I'm the Tier 1 Remodeling Assistant for homeowners in the DFW area.
            <br /><br />
            I can answer questions about your bathroom, kitchen, or flooring project and help you:
            <ul class="chatbot-capabilities">
              <li>Understand typical timelines and what to expect</li>
              <li>Get a free estimate or schedule a consultation</li>
              <li>Learn about materials, warranties, and our process</li>
            </ul>
            <div class="chat-quick-replies">
              <button type="button" class="chat-quick-reply" data-msg="Tell me about bathroom remodels">Bathroom Remodels</button>
              <button type="button" class="chat-quick-reply" data-msg="Tell me about kitchen remodels">Kitchen Remodels</button>
              <button type="button" class="chat-quick-reply" data-msg="Tell me about flooring options">Flooring Options</button>
              <button type="button" class="chat-quick-reply" data-msg="I want to schedule a consultation">Schedule a Consultation</button>
            </div>
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

  // State Management & simple domain context
  let chatState = 'idle'; // idle, scheduling_name, scheduling_service, scheduling_date, scheduling_email
  let appointmentData = {};
  let lastService = null; // bathroom | kitchen | flooring | general

  const getBotResponse = (msg) => {
    const lowerMsg = msg.toLowerCase();

    const containsAny = (keywords) => keywords.some((kw) => lowerMsg.includes(kw));

    // Update service context based on the latest message
    if (containsAny(['bathroom', 'shower', 'tub', 'vanity'])) {
      lastService = 'bathroom';
    } else if (containsAny(['kitchen', 'backsplash', 'cabinet', 'counter'])) {
      lastService = 'kitchen';
    } else if (containsAny(['floor', 'flooring', 'hardwood', 'vinyl', 'laminate', 'tile'])) {
      lastService = 'flooring';
    } else if (containsAny(['remodel', 'renovation', 'upgrade', 'project'])) {
      lastService = lastService || 'general';
    }

    // Scheduling Flow
    if (chatState === 'scheduling_name') {
      appointmentData.name = msg;
      chatState = 'scheduling_service';
      return `Great to meet you, ${msg.split(' ')[0]}! What type of project are you considering (bathroom, kitchen, flooring, or general interior)?`;
    }

    if (chatState === 'scheduling_service') {
      appointmentData.service = msg;
      chatState = 'scheduling_date';
      return 'Excellent. When would you ideally like to have your in-home consultation? (you can share a day or date range)';
    }

    if (chatState === 'scheduling_date') {
      appointmentData.date = msg;
      chatState = 'scheduling_email';
      return "Got it. What's the best email address for us to send your confirmation and details?";
    }

    if (chatState === 'scheduling_email') {
      appointmentData.email = msg;
      chatState = 'idle';

      return `Perfect! I've noted a ${appointmentData.service || 'remodeling'} consultation around ${appointmentData.date}. Our team will review it and send a confirmation to ${appointmentData.email}. You can also complete our full estimate form if you’d like more detailed pricing: <a href="pages/estimate.html" target="_blank">Request a Free Estimate</a>.`;
    }

    // General intent: scheduling
    if (containsAny(['schedule', 'appointment', 'book', 'consultation', 'visit'])) {
      chatState = 'scheduling_name';
      return "I can help you schedule a free in-home consultation. First, what is your name?";
    }

    // Greetings
    if (containsAny(['hello', 'hi', 'hey', 'good morning', 'good evening'])) {
      return 'Hi there! 👋 Are you thinking about a bathroom remodel, kitchen upgrade, or new flooring?';
    }

    // Emergency / urgent issues
    if (containsAny(['emergency', 'urgent', 'leak', 'flood', 'water damage'])) {
      return 'If you have an active leak or safety issue, please call us right away so we can respond as quickly as possible. For planning the repair or remodel, I can also help you schedule a consultation.';
    }

    // Service-specific explanations
    if (containsAny(['bathroom']) || (lastService === 'bathroom' && containsAny(['tell me more', 'details']))) {
      lastService = 'bathroom';
      return 'Bathroom remodels can include new tile, tub or shower conversions, vanities, lighting, and more. Most projects start with a free in-home visit where we measure, discuss design, and then provide a detailed written estimate.';
    }

    if (containsAny(['kitchen'])) {
      lastService = 'kitchen';
      return 'Kitchen remodels often include new cabinets, countertops, backsplash, lighting, and flooring. We’ll walk you through layout options, materials, and a clear timeline during your free consultation.';
    }

    if (containsAny(['floor', 'flooring', 'hardwood', 'laminate', 'lvp', 'vinyl', 'tile'])) {
      lastService = 'flooring';
      return 'For flooring, we install tile, hardwood, and luxury vinyl plank (LVP). We can help you choose the right material for bathrooms, kitchens, and whole-home upgrades based on durability, maintenance, and budget.';
    }

    // Estimates, pricing, and costs
    if (containsAny(['estimate', 'quote', 'price', 'cost', 'how much'])) {
      if (lastService === 'bathroom') {
        return 'Bathroom remodel costs depend on the size of the space, tile choices, fixtures, and layout changes. The best next step is a free in-home consultation so we can see the bathroom and provide a detailed written estimate. You can also use our online form here: <a href="pages/estimate.html" target="_blank">Request a Bathroom Estimate</a>.';
      }

      if (lastService === 'kitchen') {
        return 'Kitchen remodel pricing varies widely based on cabinets, countertops, appliances, and layout changes. We’ll put together a customized quote after a free in-home visit. You can get started with our estimate form: <a href="pages/estimate.html" target="_blank">Request a Kitchen Estimate</a>.';
      }

      if (lastService === 'flooring') {
        return 'Flooring project costs depend on the material (tile, hardwood, LVP), square footage, and subfloor prep. Share which rooms you’re considering and we can give you ballpark guidance, then firm it up with a free in-home measurement.';
      }

      return "We offer free, no-obligation estimates for all projects. A quick in-home visit lets us measure, talk through options, and give you clear pricing. You can request one here: <a href=\"pages/estimate.html\" target=\"_blank\">Request a Free Estimate</a> or tell me a few details about your project right here in chat.";
    }

    // Timelines & duration
    if (containsAny(['timeline', 'how long', 'time frame', 'duration', 'how many weeks'])) {
      if (lastService === 'bathroom') {
        return 'Most bathroom remodels take about 2–3 weeks once work begins, depending on tile complexity and any layout changes. We’ll give you a detailed schedule with your estimate.';
      }

      if (lastService === 'kitchen') {
        return 'Typical kitchen projects run about 3–5 weeks after materials are ready, depending on scope and any wall or layout changes. We work to keep you informed at every stage.';
      }

      if (lastService === 'flooring') {
        return 'Many single-room flooring projects can be completed in 1–3 days. Whole-home flooring takes longer depending on square footage and prep work. We’ll map out exact timing with your quote.';
      }

      return 'Project timelines vary by scope, but we always provide a clear schedule with your estimate. Bathroom projects are often 2–3 weeks, larger kitchens 3–5 weeks, and many flooring jobs just a few days.';
    }

    // Licensing & insurance
    if (containsAny(['license', 'licensed', 'insured', 'insurance', 'bonded'])) {
      return 'Yes — Tier 1 Home Services is fully licensed and insured so you’re protected throughout your project. We’re happy to share documentation during your consultation.';
    }

    // Service area
    if (containsAny(['area', 'location', 'where are you', 'serve', 'service area'])) {
      return 'We serve homeowners across the DFW metroplex, including Frisco, Plano, McKinney, Lewisville, Denton, and surrounding communities. If you’re nearby, we can likely help — just share your city or ZIP code.';
    }

    // Process / how it works
    if (containsAny(['process', 'how it works', 'how does this work', 'steps'])) {
      return 'Our process is simple: (1) Free consultation & measurements, (2) Design and material selections, (3) Detailed written estimate & schedule, (4) Demo & installation, and (5) Final walkthrough to make sure you love the result.';
    }

    // Materials & quality
    if (containsAny(['material', 'tile', 'granite', 'quartz', 'lvp', 'hardwood', 'quality'])) {
      return 'We work with quality materials from trusted suppliers — including tile, quartz and granite countertops, hardwood, and luxury vinyl plank. During your consultation we’ll help you choose options that fit your style, durability needs, and budget.';
    }

    // Warranty
    if (containsAny(['warranty', 'guarantee', 'guaranteed'])) {
      return 'We stand behind our workmanship with a labor warranty, and most products we install also carry manufacturer warranties. We can go over the details for your specific project during your estimate.';
    }

    // Financing & payments
    if (containsAny(['financing', 'payment', 'payments', 'pay', 'credit card'])) {
      return 'We accept major payment methods and can discuss any current financing or payment-plan options during your consultation. Many customers like to see the full project price first and then decide what works best for them.';
    }

    // Contact info & other ways to reach out
    if (containsAny(['contact', 'phone', 'email', 'call you'])) {
      return 'You can reach us through our <a href="pages/contact.html" target="_blank">contact page</a>, or call us directly at <a href="tel:+14698663951">(469) 866-3951</a>. You can also stay here in chat and ask to schedule a consultation.';
    }

    // Fallback
    return "Thanks for reaching out about your project! I’m a remodeling assistant focused on bathroom, kitchen, and flooring upgrades. You can ask about pricing, timelines, our process, or say 'schedule a consultation' and I’ll help you get started.";
  };

  const handleUserMessage = (rawMsg) => {
    const msg = rawMsg.trim();
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
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleUserMessage(input.value);
  });

  // Quick reply chips inside chatbot messages
  messagesContainer.addEventListener('click', (event) => {
    const btn = event.target.closest('.chat-quick-reply');
    if (!btn) return;
    const text = btn.dataset.msg || btn.innerText;
    handleUserMessage(text);
  });
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChatbot);
} else {
  initChatbot();
}

export default initChatbot;
