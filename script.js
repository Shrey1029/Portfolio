document.addEventListener('DOMContentLoaded', function() {
    // Initialize Intersection Observer for animations
    const animateOnScroll = function() {
        const sections = document.querySelectorAll('section');
        const cards = document.querySelectorAll('.card, .project');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                } else {
                    entry.target.classList.add('show');
                    appearOnScroll.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            appearOnScroll.observe(section);
        });
        
        cards.forEach(card => {
            appearOnScroll.observe(card);
        });
    };
    
    // Initialize video functionality
    const initVideos = function() {
        document.querySelectorAll('.project-video-container').forEach(container => {
            container.addEventListener('click', function() {
                const video = this.querySelector('video');
                const isFullscreen = this.classList.toggle('fullscreen');
                
                if (isFullscreen) {
                    video.controls = true;
                    video.play();
                    document.body.style.overflow = 'hidden';
                } else {
                    video.controls = false;
                    video.pause();
                    document.body.style.overflow = '';
                }
            });
        });
    };
    
    // Initialize everything
    animateOnScroll();
    initVideos();
    
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});