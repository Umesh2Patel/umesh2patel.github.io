/* ==========================================================================
   Umesh Patel - Portfolio Interactivity & Controls
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Shadow Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-open');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('mobile-open')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            }
        });

        // Close mobile nav on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-open');
                const icon = mobileToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            });
        });
    }

    // Interactive Experience Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const timelineItems = document.querySelectorAll('.timeline-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            timelineItems.forEach(item => {
                if (filter === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'translateY(0)'; }, 50);
                } else {
                    const company = item.getAttribute('data-company');
                    const tags = item.getAttribute('data-tags') || '';
                    if (company === filter || tags.toLowerCase().includes(filter.toLowerCase())) {
                        item.style.display = 'block';
                        setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'translateY(0)'; }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => { item.style.display = 'none'; }, 300);
                    }
                }
            });
        });
    });

    // One-Click Email Copying & Toast Notification
    window.copyEmail = function(emailStr = 'umeshsoftdev@gmail.com') {
        navigator.clipboard.writeText(emailStr).then(() => {
            showToast('Email address copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
            showToast(`Contact: ${emailStr}`);
        });
    };

    function showToast(message) {
        let toast = document.getElementById('toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast';
            toast.className = 'toast';
            toast.innerHTML = `<i class="fas fa-check-circle" style="color: var(--accent-emerald);"></i> <span id="toastMsg"></span>`;
            document.body.appendChild(toast);
        }
        document.getElementById('toastMsg').innerText = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    }

    // Number Counter Animation for Stats
    const statCounters = document.querySelectorAll('.counter');
    let animated = false;

    function animateStats() {
        if (animated) return;
        const heroStats = document.querySelector('.hero-stats');
        if (!heroStats) return;

        const rect = heroStats.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            statCounters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const speed = 200;
                const updateCount = () => {
                    const count = +counter.innerText.replace('+', '');
                    const inc = target / speed;
                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc) + (counter.getAttribute('data-suffix') || '');
                        setTimeout(updateCount, 15);
                    } else {
                        counter.innerText = target + (counter.getAttribute('data-suffix') || '');
                    }
                };
                updateCount();
            });
            animated = true;
        }
    }

    window.addEventListener('scroll', animateStats);
    animateStats();
});
