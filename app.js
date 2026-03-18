document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            const isVisible = navLinks.style.display === 'flex';
            
            if (isVisible) {
                navLinks.style.display = 'none';
                mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '72px';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.backgroundColor = 'var(--bg-primary)';
                navLinks.style.padding = '24px';
                navLinks.style.borderBottom = '1px solid var(--border)';
                navLinks.style.gap = '24px';
                mobileMenuBtn.innerHTML = '<i data-lucide="x"></i>';
            }
            lucide.createIcons();
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Adjust for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768 && navLinks) {
                    navLinks.style.display = 'none';
                    if (mobileMenuBtn) {
                        mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
                        lucide.createIcons();
                    }
                }
            }
        });
    });

    // OS Detection for Default Download Button Focus
    const highlightOSButton = () => {
        const userAgent = window.navigator.userAgent;
        let os = "Unknown OS";
        
        if (userAgent.indexOf("Win") !== -1) os = "Windows";
        if (userAgent.indexOf("Mac") !== -1) os = "MacOS";
        
        const macBtns = document.querySelectorAll('[data-os="macOS"]');
        const winBtns = document.querySelectorAll('[data-os="windows"]');
        
        if (os === "Windows") {
            winBtns.forEach(btn => {
                btn.classList.remove('btn-secondary');
                btn.classList.add('btn-primary');
            });
            macBtns.forEach(btn => {
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-secondary');
            });
            
            // Re-order on mobile if needed (Windows first)
            const actionsContainers = document.querySelectorAll('.hero-actions');
            actionsContainers.forEach(container => {
                if (window.innerWidth <= 768) {
                   const winBtn = container.querySelector('[data-os="windows"]');
                   if (winBtn) container.insertBefore(winBtn, container.firstChild);
                }
            });
        } 
        // Mac is default styling in HTML already
    };
    
    highlightOSButton();

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all others
                faqItems.forEach(faq => faq.classList.remove('active'));
                
                // Toggle current
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // Trigger mock app animations on scroll
    const appMockup = document.querySelector('.app-mockup');
    let hasAnimatedMockup = false;
    
    if (appMockup) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimatedMockup) {
                    hasAnimatedMockup = true;
                    // Trigger some small JS animation on the progress bar inside the mockup
                    const progressBar = appMockup.querySelector('.progress-fill');
                    if (progressBar) {
                        setTimeout(() => {
                            progressBar.style.transition = 'width 2s cubic-bezier(0.4, 0, 0.2, 1)';
                            progressBar.style.width = '100%';
                            
                            // Transform the active state to done state
                            setTimeout(() => {
                                const activeItem = appMockup.querySelector('.mockup-queue-item.active');
                                if (activeItem) {
                                    activeItem.classList.remove('active');
                                    activeItem.classList.add('done');
                                    const badge = activeItem.querySelector('.badge');
                                    if (badge) {
                                        badge.className = 'badge success';
                                        badge.textContent = 'DONE';
                                    }
                                }
                            }, 2000);
                        }, 500);
                    }
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(appMockup);
    }
});
