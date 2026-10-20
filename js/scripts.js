/* Edwin Nava - Portfolio scripts (no dependencies) */
(function () {
    document.documentElement.classList.add('js');

    var nav = document.querySelector('.nav');
    var toggle = document.querySelector('.nav-toggle');
    var links = document.querySelectorAll('.nav-links a');

    // Current year in footer
    var year = document.getElementById('current-year');
    if (year) year.textContent = new Date().getFullYear();

    // Solid nav background after scrolling
    function onScroll() {
        nav.classList.toggle('scrolled', window.scrollY > 20);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile menu
    function setMenu(open) {
        nav.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.innerHTML = '<i class="fa fa-' + (open ? 'times' : 'bars') + '" aria-hidden="true"></i>';
    }
    toggle.addEventListener('click', function () {
        setMenu(!nav.classList.contains('open'));
    });
    links.forEach(function (link) {
        link.addEventListener('click', function () { setMenu(false); });
    });

    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('visible'); });
        return;
    }

    // Fade sections in as they scroll into view
    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { revealObserver.observe(el); });

    // Highlight the nav link for the section in view
    var sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            links.forEach(function (link) {
                link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
            });
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { sectionObserver.observe(s); });
})();
