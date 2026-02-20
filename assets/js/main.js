(() => {
    'use strict';

    /* ---- Mobile navigation ---- */
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    const mobileClose = document.getElementById('mobile-close');

    function openMenu() { navMenu.classList.add('open'); }
    function closeMenu() { navMenu.classList.remove('open'); }

    hamburger.addEventListener('click', openMenu);
    mobileClose.addEventListener('click', closeMenu);

    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    /* ---- Sticky nav shadow on scroll ---- */
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });

    /* ---- Active nav link on scroll ---- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        const scrollY = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            navLinks.forEach(link => {
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.toggle('active', scrollY >= top && scrollY < top + height);
                }
            });
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });

    /* ---- Typed.js ---- */
    if (typeof Typed !== 'undefined') {
        new Typed('.typed-text', {
            strings: [
                'Software Engineer',
                'AI Engineer',
                'ML Developer',
                'Data Scientist',
                'Full-Stack Developer'
            ],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 2000,
            loop: true,
            showCursor: false
        });
    }

    /* ---- Scroll reveal (IntersectionObserver) ---- */
    const revealElements = document.querySelectorAll(
        '.section-header, .about-content, .timeline-item, .project-card, .contact-info, .contact-form, .hero-text, .hero-image'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    /* ---- Stagger reveal for project grid ---- */
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
        projectsGrid.classList.add('reveal-stagger');
        revealObserver.observe(projectsGrid);
    }

    /* ---- Project filtering ---- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            projectCards.forEach(card => {
                const match = filter === 'all' || card.dataset.category === filter;
                card.classList.toggle('hidden', !match);
            });
        });
    });

    /* ---- Smooth scroll for anchor links ---- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    /* ---- Contact form ---- */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Sent! <i class="uil uil-check"></i>';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                contactForm.reset();
            }, 2500);
        });
    }
})();
