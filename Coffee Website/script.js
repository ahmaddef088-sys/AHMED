/* =============================================
   COFFEE HOUSE - JAVASCRIPT
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ========== NAVBAR ACTIVE LINK ON SCROLL ==========
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const updateActiveNav = () => {
    const scrollY = window.scrollY + 80;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNav();
    handleBackToTop();
    revealOnScroll();
  });

  // Smooth scroll on nav links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Close mobile menu
          document.getElementById('navLinks').classList.remove('open');
          document.getElementById('hamburger').classList.remove('open');
        }
      }
    });
  });

  // ========== HAMBURGER MENU ==========
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksContainer.classList.toggle('open');
  });

  // ========== TESTIMONIALS SLIDER ==========
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  let currentSlide = 0;
  let autoSlideInterval;

  const goToSlide = (index) => {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  };

  // Initialize first slide
  goToSlide(0);

  prevBtn.addEventListener('click', () => {
    goToSlide(currentSlide - 1);
    resetAutoSlide();
  });

  nextBtn.addEventListener('click', () => {
    goToSlide(currentSlide + 1);
    resetAutoSlide();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-slide'));
      goToSlide(idx);
      resetAutoSlide();
    });
  });

  // Auto slide every 5 seconds
  const startAutoSlide = () => {
    autoSlideInterval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 5000);
  };

  const resetAutoSlide = () => {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  };

  startAutoSlide();

  // ========== SCROLL REVEAL ==========
  const revealElements = document.querySelectorAll(
    '.menu-card, .gallery-item, .contact-item, .about-img-circle, .about-content, .testimonial-card'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < windowHeight - 80) {
        el.classList.add('visible');
      }
    });
  };

  // Run once on load
  revealOnScroll();

  // ========== BACK TO TOP ==========
  const backToTopBtn = document.getElementById('backToTop');

  const handleBackToTop = () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  };

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ========== CONTACT FORM ==========
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmailInput').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all required fields.');
      return;
    }

    // Simulate form submission
    const submitBtn = document.getElementById('submitContact');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
      formSuccess.style.display = 'block';
      contactForm.reset();
      setTimeout(() => {
        formSuccess.style.display = 'none';
      }, 5000);
    }, 1500);
  });

  // ========== HERO PARALLAX EFFECT ==========
  const heroImg = document.querySelector('.hero-img');
  if (heroImg) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      heroImg.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  // ========== MENU CARD STAGGER ANIMATION ==========
  const menuCards = document.querySelectorAll('.menu-card');
  menuCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
  });

  // ========== GALLERY LIGHTBOX (simple) ==========
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position:fixed; inset:0; background:rgba(0,0,0,0.9);
        display:flex; align-items:center; justify-content:center;
        z-index:9999; cursor:zoom-out; animation:fadeIn 0.3s ease;
      `;
      const bigImg = document.createElement('img');
      bigImg.src = img.src;
      bigImg.style.cssText = `
        max-width:90vw; max-height:90vh; border-radius:12px;
        box-shadow:0 20px 60px rgba(0,0,0,0.5);
      `;
      overlay.appendChild(bigImg);
      document.body.appendChild(overlay);
      overlay.addEventListener('click', () => overlay.remove());
    });
  });

});
