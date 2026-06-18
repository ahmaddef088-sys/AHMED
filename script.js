/* ==========================================================================
   AHMED DEFALLA PORTFOLIO - JAVASCRIPT INTERACTIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- MOBILE MENU TOGGLE ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // Close mobile menu when a nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('open');
                navMenu.classList.remove('open');
            }
        });
    }

    // --- ACTIVE NAVIGATION LINK HIGHLIGHT ON SCROLL ---
    const sections = document.querySelectorAll('section');
    
    function highlightNavLink() {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            // The top position of the section minus the header height (80px)
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.remove('active');
            }
        });
    }

    // Use passive listener for scroll performance
    window.addEventListener('scroll', highlightNavLink, { passive: true });
    // Initial call on page load
    highlightNavLink();

    // --- CONTACT FORM SUBMISSION ---
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple visual response
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            submitBtn.innerHTML = `<span>Sending...</span> <i class="fas fa-spinner fa-spin btn-icon"></i>`;
            
            // Mock server timeout (1.5 seconds)
            setTimeout(() => {
                // Show success status
                submitBtn.innerHTML = `<span>Sent Successfully!</span> <i class="fas fa-check btn-icon"></i>`;
                submitBtn.style.backgroundColor = 'var(--color-success)';
                submitBtn.style.boxShadow = '0 10px 20px rgba(46, 204, 113, 0.2)';
                
                // Reset form fields
                contactForm.reset();
                
                // Revert button status after 3 seconds
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.backgroundColor = 'var(--color-primary)';
                    submitBtn.style.boxShadow = 'var(--shadow-teal)';
                    submitBtn.innerHTML = originalText;
                }, 3000);
                
            }, 1500);
        });
    }
});
