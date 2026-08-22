/* ==========================================================================
   Umesh Patel - Portfolio interactivity
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Header border on scroll
    const header = document.querySelector('.header');
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile menu
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileToggle && navLinks) {
        const setOpen = (open) => {
            navLinks.classList.toggle('mobile-open', open);
            const icon = mobileToggle.querySelector('i');
            if (icon) icon.className = open ? 'fas fa-times' : 'fas fa-bars';
        };
        mobileToggle.addEventListener('click', () => setOpen(!navLinks.classList.contains('mobile-open')));
        navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
    }

    // Active nav link highlighting
    const sections = [...document.querySelectorAll('main section[id]')];
    const linkFor = (id) => navLinks?.querySelector(`a[href="#${id}"]`);
    if (sections.length && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                navLinks.querySelectorAll('a').forEach(a => a.classList.remove('active'));
                linkFor(entry.target.id)?.classList.add('active');
            });
        }, { rootMargin: '-40% 0px -55% 0px' });
        sections.forEach(s => observer.observe(s));
    }

    // Experience filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const timelineEntries = document.querySelectorAll('.timeline-item, .timeline-divider');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            timelineEntries.forEach(item => {
                const company = item.getAttribute('data-company') || '';
                const tags = (item.getAttribute('data-tags') || '').toLowerCase();
                const show = filter === 'all' || company === filter || tags.includes(filter.toLowerCase());
                item.classList.toggle('hidden', !show);
            });
        });
    });

    // Copy email + toast
    window.copyEmail = function (emailStr = 'umeshsoftdev@gmail.com') {
        navigator.clipboard.writeText(emailStr)
            .then(() => showToast('Email address copied to clipboard'))
            .catch(() => showToast(`Email: ${emailStr}`));
    };

    let toastTimer;
    function showToast(message) {
        let toast = document.getElementById('toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast';
            toast.className = 'toast';
            toast.innerHTML = '<i class="fas fa-check-circle" style="color: var(--green);"></i> <span id="toastMsg"></span>';
            document.body.appendChild(toast);
        }
        document.getElementById('toastMsg').textContent = message;
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
    }

    // Stat counters
    const counters = document.querySelectorAll('.counter');
    let animated = false;

    function animateStats() {
        if (animated) return;
        const heroStats = document.querySelector('.hero-stats');
        if (!heroStats) return;
        const rect = heroStats.getBoundingClientRect();
        if (rect.top > window.innerHeight || rect.bottom < 0) return;
        animated = true;

        counters.forEach(counter => {
            const target = Number(counter.dataset.target) || 0;
            const suffix = counter.dataset.suffix || '';
            const duration = 900;
            const start = performance.now();
            const tick = (now) => {
                const p = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - p, 3);
                counter.textContent = Math.round(target * eased) + suffix;
                if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        });
    }

    window.addEventListener('scroll', animateStats, { passive: true });
    animateStats();
});
