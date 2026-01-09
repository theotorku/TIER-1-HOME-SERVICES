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
            I can help you:
            <ul class="chatbot-capabilities">
              <li>See if your project is a good fit for our team</li>
              <li>Get a free estimate or schedule a consultation</li>
              <li>Understand typical timelines and what to expect</li>
            </ul>
            <div class="chat-quick-replies">
              <button type="button" class="chat-quick-reply" data-msg="See if my project is a fit">See if my project is a fit</button>
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
  let chatState = 'idle'; // idle, scheduling_*, qualify_*
  let appointmentData = {};
  let qualificationData = {};
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

    // Lead qualification flow (multi-step, button-driven)
    if (chatState === 'qualify_location') {
      qualificationData.locationRaw = msg;

      let locationCategory = 'unknown';
      if (containsAny(['dfw', 'dallas', 'fort worth'])) {
        locationCategory = 'dfw';
      } else if (containsAny(['within', 'nearby', 'close'])) {
        locationCategory = 'nearby';
      } else if (containsAny(['outside texas', 'out of state', 'another state'])) {
        locationCategory = 'outside_tx';
      } else if (containsAny(['texas'])) {
        locationCategory = 'texas_far';
      }

      qualificationData.locationCategory = locationCategory;

      if (locationCategory === 'outside_tx') {
        chatState = 'idle';
        return 'Thanks for sharing that. Right now we focus on interior remodeling projects in the DFW metroplex and nearby communities. Based on your location, we may not be the best fit. You are still welcome to reach out through our <a href="pages/contact.html" target="_blank">contact page</a>.';
      }

      chatState = 'qualify_project_type';
      return `
        Great, thank you. What kind of project are you planning?
        <div class="chat-quick-replies">
          <button type="button" class="chat-quick-reply" data-msg="Bathroom remodel">Bathroom remodel</button>
          <button type="button" class="chat-quick-reply" data-msg="Kitchen remodel">Kitchen remodel</button>
          <button type="button" class="chat-quick-reply" data-msg="Flooring project">Flooring</button>
          <button type="button" class="chat-quick-reply" data-msg="Multiple rooms / whole-home remodel">Multiple rooms / whole-home</button>
          <button type="button" class="chat-quick-reply" data-msg="Other interior renovation">Other interior renovation</button>
          <button type="button" class="chat-quick-reply" data-msg="Small repair or single door/window">Small repair / door / window</button>
          <button type="button" class="chat-quick-reply" data-msg="Mostly exterior work like roof or siding">Mostly exterior</button>
        </div>
      `;
    }

    if (chatState === 'qualify_project_type') {
      qualificationData.projectRaw = msg;

      let projectCategory = 'other_interior';
      if (containsAny(['bathroom'])) {
        projectCategory = 'bathroom';
      } else if (containsAny(['kitchen'])) {
        projectCategory = 'kitchen';
      } else if (containsAny(['floor', 'flooring'])) {
        projectCategory = 'flooring';
      } else if (containsAny(['whole-home', 'whole home', 'multiple rooms'])) {
        projectCategory = 'whole_home';
      }

      if (containsAny(['small repair', 'patch', 'single door', 'single window'])) {
        projectCategory = 'small_repair';
      }
      if (containsAny(['exterior', 'roof', 'siding', 'gutter', 'outside'])) {
        projectCategory = 'exterior';
      }

      qualificationData.projectCategory = projectCategory;

      if (projectCategory === 'small_repair' || projectCategory === 'exterior') {
        chatState = 'idle';
        return 'Thanks for the info. We focus on larger interior remodeling projects like bathrooms, kitchens, flooring, and whole-home remodels. For small repairs, single doors/windows, or exterior-only work, we may not be the best fit. You can still reach us through our <a href="pages/contact.html" target="_blank">contact page</a> or review our <a href="pages/services.html" target="_blank">services</a>.';
      }

      chatState = 'qualify_budget';
      return `
        That sounds like a great interior project. What’s your approximate budget range?
        <div class="chat-quick-replies">
          <button type="button" class="chat-quick-reply" data-msg="Under $5,000">Under $5,000</button>
          <button type="button" class="chat-quick-reply" data-msg="$5,000 – $15,000">$5,000 – $15,000</button>
          <button type="button" class="chat-quick-reply" data-msg="$15,000 – $30,000">$15,000 – $30,000</button>
          <button type="button" class="chat-quick-reply" data-msg="$30,000 – $50,000">$30,000 – $50,000</button>
          <button type="button" class="chat-quick-reply" data-msg="$50,000+">$50,000+</button>
        </div>
      `;
    }

    if (chatState === 'qualify_budget') {
      qualificationData.budget = msg;
      chatState = 'qualify_timeline';
      return `
        Thanks, that helps. When are you hoping to start the project?
        <div class="chat-quick-replies">
          <button type="button" class="chat-quick-reply" data-msg="As soon as possible (next 30 days)">As soon as possible (next 30 days)</button>
          <button type="button" class="chat-quick-reply" data-msg="1–3 months">1–3 months</button>
          <button type="button" class="chat-quick-reply" data-msg="3–6 months">3–6 months</button>
          <button type="button" class="chat-quick-reply" data-msg="6+ months / just planning">6+ months / just planning</button>
        </div>
      `;
    }

    if (chatState === 'qualify_timeline') {
      qualificationData.timeline = msg;
      chatState = 'qualify_ownership';
      return `
        Got it. Are you one of the decision-makers for this property?
        <div class="chat-quick-replies">
          <button type="button" class="chat-quick-reply" data-msg="Yes, I own the property">Yes, I own the property</button>
          <button type="button" class="chat-quick-reply" data-msg="I own or manage the rental">I own or manage the rental</button>
          <button type="button" class="chat-quick-reply" data-msg="I don’t own the property / just exploring">I don’t own the property / just exploring</button>
        </div>
      `;
    }

    if (chatState === 'qualify_ownership') {
      qualificationData.ownership = msg;
      chatState = 'idle';

      const projectSummary = (qualificationData.projectCategory || 'remodeling').replace('_', ' ');
      let locationSummary = 'near you';
      if (qualificationData.locationCategory === 'dfw' || qualificationData.locationCategory === 'nearby') {
        locationSummary = 'in the DFW area';
      } else if (qualificationData.locationCategory === 'texas_far') {
        locationSummary = 'in Texas';
      }

      const budgetSummary = qualificationData.budget || 'your budget range';
      const timelineSummary = qualificationData.timeline || 'your ideal timeline';

      return `
        Thanks for walking through those questions with me.
        From what you’ve shared — a ${projectSummary} project ${locationSummary} with a budget of ${budgetSummary} and a timeline of ${timelineSummary} — this sounds like a project we’d like to learn more about.
        <br /><br />
        The best next step is to complete our detailed estimate form so our team can review everything and follow up with a quote:
        <br />
        <a href="pages/estimate.html" target="_blank">Request a Free Estimate</a>
      `;
    }

    // Lead qualification entry point (when user asks if their project is a fit)
    const wantsQualification = chatState === 'idle' && lowerMsg.includes('project') && lowerMsg.includes('fit');

    if (wantsQualification) {
      qualificationData = {};
      chatState = 'qualify_location';
      return `
        Great, let's see if your project is a good fit.
        First, where is the property located?
        <div class="chat-quick-replies">
          <button type="button" class="chat-quick-reply" data-msg="In the DFW Metroplex">In the DFW Metroplex</button>
          <button type="button" class="chat-quick-reply" data-msg="Within about 30 miles of DFW">Within about 30 miles of DFW</button>
          <button type="button" class="chat-quick-reply" data-msg="In Texas, but farther away">In Texas, but farther away</button>
          <button type="button" class="chat-quick-reply" data-msg="Outside Texas">Outside Texas</button>
        </div>
      `;
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
