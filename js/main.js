document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Hamburger Menu ---
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Opcional: Anima o ícone
            const icon = mobileMenuBtn.querySelector('ion-icon');
            if (navLinks.classList.contains('active')) {
                icon.setAttribute('name', 'close-outline');
            } else {
                icon.setAttribute('name', 'menu-outline');
            }
        });

        // Fechar o menu ao clicar em um link interno
        const linksMenu = navLinks.querySelectorAll('a[href^="#"]');
        linksMenu.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (mobileMenuBtn.querySelector('ion-icon')) {
                    mobileMenuBtn.querySelector('ion-icon').setAttribute('name', 'menu-outline');
                }
            });
        });
    }

    // --- Navbar Scroll Effect ---
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.add('scrolled');
            // header.classList.remove('scrolled');
        }
    });

    // Make sure header is styled correctly on load if midway down page
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Adjust for fixed header
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible if you want it to trigger only once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements with the .fade-up class
    const animatedElements = document.querySelectorAll('.fade-up');
    animatedElements.forEach(el => observer.observe(el));

    // --- Copy PIX Email ---
    const copyPixBtn = document.getElementById('copy-pix-btn');
    const pixEmail = document.getElementById('pix-email');

    if (copyPixBtn && pixEmail) {
        copyPixBtn.addEventListener('click', () => {
            const emailText = pixEmail.innerText || pixEmail.textContent;
            navigator.clipboard.writeText(emailText.trim()).then(() => {
                const originalHtml = copyPixBtn.innerHTML;
                copyPixBtn.innerHTML = '<ion-icon name="checkmark-done-outline"></ion-icon> <span>CHAVE PIX COPIADA</span>';
                copyPixBtn.classList.remove('btn-secondary');
                copyPixBtn.classList.add('btn-primary');

                setTimeout(() => {
                    copyPixBtn.innerHTML = originalHtml;
                    copyPixBtn.classList.remove('btn-primary');
                    copyPixBtn.classList.add('btn-secondary');
                }, 3000); // Revert after 3 seconds
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    }
});
