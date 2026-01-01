// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menuIcon');
    const navLinks = document.getElementById('navLinks');
    
    if (menuIcon) {
        menuIcon.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
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

    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            this.reset();
        });
    }

    // Skills animation on scroll
    const skills = document.querySelectorAll('.skill');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'bounce 1s ease';
                setTimeout(() => {
                    entry.target.style.animation = '';
                }, 1000);
            }
        });
    }, observerOptions);

    skills.forEach(skill => {
        observer.observe(skill);
    });

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Typing effect for hero section
    const heroText = document.querySelector('.hero h1');
    if (heroText && !sessionStorage.getItem('animationPlayed')) {
        const originalText = heroText.textContent;
        heroText.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                heroText.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                sessionStorage.setItem('animationPlayed', 'true');
            }
        }
        
        typeWriter();
    }

    // Dark/Light mode toggle
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '🌓';
    darkModeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        transition: transform 0.3s ease;
    `;
    
    darkModeToggle.addEventListener('click', toggleDarkMode);
    document.body.appendChild(darkModeToggle);

    // Add hover effect to all cards
    const allCards = document.querySelectorAll('.card, .project-card, .testimonial-card');
    allCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
});

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    // Add dark mode styles dynamically
    if (!document.querySelector('#dark-mode-styles')) {
        const darkStyles = document.createElement('style');
        darkStyles.id = 'dark-mode-styles';
        darkStyles.textContent = `
            body.dark-mode {
                background: #1a1a1a;
                color: #fff;
            }
            body.dark-mode .card,
            body.dark-mode .project-card,
            body.dark-mode .testimonial-card,
            body.dark-mode .contact-form {
                background: #2d2d2d;
                color: #fff;
            }
            body.dark-mode .form-group input,
            body.dark-mode .form-group textarea {
                background: #2d2d2d;
                color: #fff;
                border-color: #444;
            }
        `;
        document.head.appendChild(darkStyles);
    }
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Intersection Observer for fade-in animations
const fadeElements = document.querySelectorAll('.card, .project-card, .testimonial-card');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
    el.style.opacity = '0';
    fadeObserver.observe(el);
});
// script.js
// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuIcon = document.getElementById('menuIcon');
  const navLinks = document.getElementById('navLinks');
  
  if (menuIcon && navLinks) {
    menuIcon.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }
  
  // Close menu when clicking on a link
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      navLinks.classList.remove('active');
    });
  });
});
// Language Detection and Switching
document.addEventListener('DOMContentLoaded', function() {
  const langBtn = document.getElementById('langBtn');
  const langDropdown = document.getElementById('langDropdown');
  const currentLang = document.getElementById('currentLang');
  
  // 1. DETECT BROWSER LANGUAGE
  function detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0]; // Get 'en', 'fr', 'ar'
    
    // Check if it's French or Arabic
    if (langCode === 'fr') {
      return 'fr';
    } else if (langCode === 'ar') {
      return 'ar';
    } else {
      return 'en'; // Default to English
    }
  }
  
  // 2. AUTO-DETECT ON PAGE LOAD
  const detectedLang = detectBrowserLanguage();
  
  // Show language notification (optional)
  if (detectedLang !== 'en') {
    setTimeout(() => {
      showLanguageNotification(detectedLang);
    }, 1000);
  }
  
  // 3. TOGGLE DROPDOWN
  langBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    langDropdown.classList.toggle('show');
  });
  
  // 4. LANGUAGE SELECTION
  document.querySelectorAll('.lang-option').forEach(option => {
    option.addEventListener('click', function() {
      const selectedLang = this.getAttribute('data-lang');
      currentLang.textContent = selectedLang.toUpperCase();
      
      // Apply translation
      applyTranslation(selectedLang);
      
      // Close dropdown
      langDropdown.classList.remove('show');
      
      // Save preference
      localStorage.setItem('preferredLanguage', selectedLang);
    });
  });
  
  // 5. LOAD SAVED PREFERENCE
  const savedLang = localStorage.getItem('preferredLanguage');
  if (savedLang) {
    currentLang.textContent = savedLang.toUpperCase();
  }
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function() {
    langDropdown.classList.remove('show');
  });
});

// Function to show language notification
function showLanguageNotification(lang) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: #0056b3;
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 10px;
    animation: slideIn 0.5s ease;
  `;
  
  const langName = lang === 'fr' ? 'Français' : 'العربية';
  notification.innerHTML = `
    <i class="fas fa-language"></i>
    <div>
      <strong>Website available in ${langName}</strong>
      <div style="font-size: 0.9em; opacity: 0.9;">Click the language button to translate</div>
    </div>
    <button style="background: transparent; border: none; color: white; cursor: pointer; margin-left: 10px;" onclick="this.parentElement.remove()">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  document.body.appendChild(notification);
  
  // Auto-remove after 10 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 10000);
}

// Function to apply Google Translate
function applyTranslation(lang) {
  // Load Google Translate if not loaded
  if (!window.google || !google.translate) {
    const script = document.createElement('script');
    script.src = `https://translate.google.com/translate_a/element.js?cb=initGoogleTranslate&hl=${lang}`;
    document.body.appendChild(script);
  } else {
    // Trigger translation
    const translateDiv = document.getElementById('google_translate_element');
    translateDiv.style.display = 'block';
    
    // Simulate click on language option
    setTimeout(() => {
      if (window.google && google.translate) {
        const iframe = document.querySelector('.goog-te-menu-frame');
        if (iframe && iframe.contentWindow) {
          const langOption = iframe.contentWindow.document.querySelector(`[value="${lang}"]`);
          if (langOption) langOption.click();
        }
      }
    }, 500);
  }
}

// Google Translate initialization
function initGoogleTranslate() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: 'en,fr,ar',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    autoDisplay: false
  }, 'google_translate_element');
  
  // Hide Google's default banner
  const style = document.createElement('style');
  style.innerHTML = `
    .goog-te-banner-frame { display: none !important; }
    body { top: 0 !important; }
    .goog-te-gadget-simple { border: none !important; background: transparent !important; }
  `;
  document.head.appendChild(style);
}