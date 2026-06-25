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
            
            const submitBtn = contactForm.querySelector('.btn-submit');
            const formStatus = document.getElementById('formStatus');
            const originalText = submitBtn.innerHTML;
            
            // Helper to set status message
            function showStatus(text, type) {
                if (!formStatus) return;
                formStatus.className = `form-status ${type}`;
                formStatus.innerHTML = text;
                formStatus.style.display = 'block';
            }
            
            // Helper to hide status message
            function hideStatus() {
                if (!formStatus) return;
                formStatus.style.display = 'none';
                formStatus.className = 'form-status';
                formStatus.innerHTML = '';
            }
            
            // Clear any previous status
            hideStatus();
            
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            submitBtn.innerHTML = `<span>Sending...</span> <i class="fas fa-spinner fa-spin btn-icon"></i>`;
            
            // Check if browsing as a local file (file:// protocol)
            if (window.location.protocol === 'file:') {
                console.warn("FormSubmit does not support direct file:// protocol submission. Simulating submission success for local testing.");
                
                setTimeout(() => {
                    // Show success on button
                    submitBtn.innerHTML = `<span>Sent (Local Demo)!</span> <i class="fas fa-check btn-icon"></i>`;
                    submitBtn.style.backgroundColor = 'var(--color-success)';
                    submitBtn.style.boxShadow = '0 10px 20px rgba(46, 204, 113, 0.2)';
                    
                    // Show friendly demo notice
                    showStatus(
                        `<strong>⚠️ Note:</strong> Form submitted in <strong>Local Demo Mode</strong>. <br>FormSubmit requires a web server (like VS Code Live Server) or live hosting (like GitHub Pages) to send real emails.`,
                        'warning'
                    );
                    
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
                    
                    // Clear the warning after 8 seconds
                    setTimeout(() => {
                        hideStatus();
                    }, 8000);
                }, 1000);
                return;
            }
            
            // Send real email using FormSubmit AJAX
            fetch("https://formsubmit.co/ajax/ahmaddef088@gmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message
                })
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errData => {
                        throw new Error(errData.message || `HTTP error! Status: ${response.status}`);
                    }).catch(() => {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    });
                }
                return response.json();
            })
            .then(data => {
                if (data.success === "true" || data.success === true) {
                    // Show success status
                    submitBtn.innerHTML = `<span>Sent Successfully!</span> <i class="fas fa-check btn-icon"></i>`;
                    submitBtn.style.backgroundColor = 'var(--color-success)';
                    submitBtn.style.boxShadow = '0 10px 20px rgba(46, 204, 113, 0.2)';
                    
                    showStatus("<strong>Success!</strong> Your message has been sent successfully.", "success");
                    
                    // Reset form fields
                    contactForm.reset();
                } else {
                    throw new Error(data.message || "Failed to send message.");
                }
            })
            .catch(error => {
                console.error("Error submitting form:", error);
                // Show error status
                submitBtn.innerHTML = `<span>Error! Try again</span> <i class="fas fa-exclamation-triangle btn-icon"></i>`;
                submitBtn.style.backgroundColor = '#e74c3c'; // red color for error
                submitBtn.style.boxShadow = '0 10px 20px rgba(231, 76, 60, 0.2)';
                
                showStatus(`<strong>Error:</strong> ${error.message}`, "error");
            })
            .finally(() => {
                // Revert button status after 3 seconds
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.backgroundColor = 'var(--color-primary)';
                    submitBtn.style.boxShadow = 'var(--shadow-teal)';
                    submitBtn.innerHTML = originalText;
                }, 3000);
            });
        });
    }
});
