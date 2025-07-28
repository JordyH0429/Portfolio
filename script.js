document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle code...
    const toggle = document.getElementById('theme-toggle');
    const body = document.body;
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
    }
    toggle.addEventListener('click', function() {
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });

    // Hamburger menu code
    const hamburger = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');
    });

    // Close menu on link click (mobile)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
        });
    });

    // Optional: Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Project Carousel ---
    const projects = [
        {
            title: "Nova AI Desktop Companion",
            image: "images/nova_ai_placeholder.jpg",
            desc: "A smart assistant that reads screen content using Tesseract OCR and interacts via locally hosted AI using Ollama LLM API. Built with Python (Tkinter GUI), JSON-based chat history logging.",
            links: [
                { label: "GitHub", url: "https://github.com/yourusername/nova-ai-desktop" }
            ]
        },
        {
            title: "Game Prototype",
            image: "images/game_placeholder.jpg",
            desc: "A Unity-based game prototype demonstrating core gameplay mechanics and C# scripting. Features basic 3D models and interactive UI.",
            links: [
                { label: "GitHub", url: "https://github.com/yourusername/game-prototype" }
            ]
        },
        // Add more projects as needed
    ];

    let currentProject = 0;

    function renderSlides() {
        return projects.map((project, i) => `
            <div class="project-slide${i === currentProject ? ' active' : ''}">
                <img src="${project.image}" alt="${project.title} image" class="project-image" />
                <div class="project-title">${project.title}</div>
                ${i === currentProject ? `
                    <div class="project-desc">${project.desc}</div>
                    <div class="project-links">
                        ${project.links.map(link => `<a href="${link.url}" target="_blank">${link.label}</a>`).join('')}
                    </div>
                ` : ''}
            </div>
        `).join('');
    }

    function updateCarousel() {
        const track = document.querySelector('.carousel-track');
        const slideWidth = 320; // 300px + 2*10px margin
        const carousel = document.getElementById('project-carousel');
        const visibleWidth = carousel.offsetWidth;
        // Center the active slide
        const offset = (visibleWidth / 2) - (slideWidth / 2) - (currentProject * slideWidth);
        track.style.transform = `translateX(${offset}px)`;
        // Update active class
        document.querySelectorAll('.project-slide').forEach((slide, i) => {
            slide.classList.toggle('active', i === currentProject);
        });
    }

    const carousel = document.getElementById('project-carousel');
    carousel.innerHTML = `<div class="carousel-track">${renderSlides()}</div>`;
    updateCarousel();

    document.getElementById('prev-project').addEventListener('click', function() {
        currentProject = (currentProject - 1 + projects.length) % projects.length;
        updateCarousel();
    });

    document.getElementById('next-project').addEventListener('click', function() {
        currentProject = (currentProject + 1) % projects.length;
        updateCarousel();
    });
});