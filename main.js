/**
 * Passo Crafto — Main JavaScript
 * Features: scroll progress, nav spy, mobile menu,
 *           reveal animations, counter animation, back-to-top
 */

(function () {
    'use strict';

    /* --------------------------------------------------------
       SCROLL PROGRESS BAR
    -------------------------------------------------------- */
    const scrollProgress = document.getElementById('scrollProgress');

    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (scrollProgress) scrollProgress.style.width = progress + '%';
    }

    /* --------------------------------------------------------
       HEADER SCROLL SHADOW
    -------------------------------------------------------- */
    const header = document.getElementById('header');

    function updateHeaderStyle() {
        if (!header) return;
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    /* --------------------------------------------------------
       BACK TO TOP
    -------------------------------------------------------- */
    const backToTop = document.getElementById('backToTop');

    function updateBackToTop() {
        if (!backToTop) return;
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* --------------------------------------------------------
       SCROLL SPY — Highlight active nav link
    -------------------------------------------------------- */
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = Array.from(navLinks)
        .map(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                return document.querySelector(href);
            }
            return null;
        })
        .filter(Boolean);

    function updateScrollSpy() {
        const scrollMid = window.scrollY + window.innerHeight / 3;

        let activeSection = null;
        sections.forEach(section => {
            if (!section) return;
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            if (scrollMid >= top && scrollMid < bottom) {
                activeSection = section.id;
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            const id = href ? href.replace('#', '') : '';
            link.classList.toggle('active', id === activeSection);
        });
    }

    /* --------------------------------------------------------
       MOBILE HAMBURGER MENU
    -------------------------------------------------------- */
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function toggleMobileMenu(open) {
        if (!hamburger || !mobileNav) return;
        const isOpen = open !== undefined ? open : !hamburger.classList.contains('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
        mobileNav.classList.toggle('open', isOpen);
        mobileNav.setAttribute('aria-hidden', !isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    if (hamburger) {
        hamburger.addEventListener('click', () => toggleMobileMenu());
    }

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => toggleMobileMenu(false));
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
        if (!hamburger || !mobileNav) return;
        if (
            !hamburger.contains(e.target) &&
            !mobileNav.contains(e.target) &&
            mobileNav.classList.contains('open')
        ) {
            toggleMobileMenu(false);
        }
    });

    // Close on resize to desktop
    window.addEventListener('resize', function () {
        if (window.innerWidth > 767) toggleMobileMenu(false);
    });

    /* --------------------------------------------------------
       REVEAL ON SCROLL (IntersectionObserver)
    -------------------------------------------------------- */
    const revealElements = document.querySelectorAll('.reveal, .animate-in');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        const delay = parseInt(el.dataset.delay || '0', 10);
                        setTimeout(() => {
                            el.classList.add('visible');
                        }, delay);
                        revealObserver.unobserve(el);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: '0px 0px -48px 0px',
            }
        );

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback: show everything immediately
        revealElements.forEach(el => el.classList.add('visible'));
    }

    /* --------------------------------------------------------
       ANIMATED COUNTERS
    -------------------------------------------------------- */
    function animateCounter(el) {
        const target = parseInt(el.dataset.target || '0', 10);
        const duration = 1800;
        const startTime = performance.now();

        function easeOutQuart(t) {
            return 1 - Math.pow(1 - t, 4);
        }

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.round(easeOutQuart(progress) * target);
            el.textContent = current;
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        }

        requestAnimationFrame(update);
    }

    const counterElements = document.querySelectorAll('.count-up, .hero-stat-number');
    let countersStarted = false;

    function startCounters() {
        if (countersStarted) return;
        countersStarted = true;
        counterElements.forEach(el => animateCounter(el));
    }

    // Start counters when hero stats come into view
    if ('IntersectionObserver' in window) {
        const heroStats = document.querySelector('.hero-stats');
        if (heroStats) {
            const counterObserver = new IntersectionObserver(
                function (entries) {
                    if (entries[0].isIntersecting) {
                        startCounters();
                        counterObserver.disconnect();
                    }
                },
                { threshold: 0.5 }
            );
            counterObserver.observe(heroStats);
        }
    } else {
        startCounters();
    }

    /* --------------------------------------------------------
       SMOOTH SCROLL — All anchor links
    -------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    /* --------------------------------------------------------
       UNIFIED SCROLL HANDLER — Single listener for performance
    -------------------------------------------------------- */
    let ticking = false;

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(function () {
                updateScrollProgress();
                updateHeaderStyle();
                updateBackToTop();
                updateScrollSpy();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    /* --------------------------------------------------------
       INIT — Run once on load
    -------------------------------------------------------- */
    updateScrollProgress();
    updateHeaderStyle();
    updateBackToTop();
    updateScrollSpy();

    // Accessibility: mark hero animate-in elements visible
    // after a short delay so they run even without scrolling
    setTimeout(() => {
        document.querySelectorAll('.animate-in').forEach(el => {
            const delay = parseInt(el.dataset.delay || '0', 10);
            setTimeout(() => el.classList.add('visible'), delay);
        });
    }, 100);

})();