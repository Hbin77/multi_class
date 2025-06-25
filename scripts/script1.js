document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const backToTopBtn = document.getElementById('back-to-top');
    const sections = document.querySelectorAll('section');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const contactForm = document.getElementById('contactForm');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        }

        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }

        updateActiveNavLink();

        animateOnScroll();
    });

    function updateActiveNavLink() {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('.skill-item, .project-card, .contact-item');

        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.classList.add('fadeIn');
            }
        });
    }

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            alert(`감사합니다, ${name}님! 메시지가 성공적으로 전송되었습니다.`);

            contactForm.reset();
        });
    }

    const skillProgress = document.querySelectorAll('.progress');

    function animateSkills() {
        skillProgress.forEach(progress => {
            const width = progress.style.width;
            progress.style.width = '0';

            setTimeout(() => {
                progress.style.transition = 'width 1.5s ease-in-out';
                progress.style.width = width;
            }, 300);
        });
    }

    function typeText() {
        const typingText = document.querySelector('.typing-text');

        if (typingText) {
            setTimeout(() => {
                typingText.style.animation = 'typing 4s steps(40, end), blink-caret .75s step-end infinite';

                setTimeout(() => {
                    typingText.style.width = '100%';
                }, 4000);
            }, 1000);
        }
    }

    setTimeout(animateSkills, 1000);
    typeText();

    const skillsSection = document.getElementById('skills');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (skillsSection) {
        observer.observe(skillsSection);
    }

    updateActiveNavLink();
    animateOnScroll();

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    document.querySelectorAll('.project-link .fa-github').forEach(icon => {
        const linkElement = icon.closest('a');
        if (linkElement) {
            linkElement.href = 'https://github.com/Hbin77';
            linkElement.target = '_blank';
            linkElement.rel = 'noopener noreferrer';
        }
    });
});