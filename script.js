// Toggle fullscreen for project videos
function toggleFullscreen(container) {
    if (container.classList.contains('fullscreen')) {
        container.classList.remove('fullscreen');
        const video = container.querySelector('.project-video-player');
        video.pause();
        video.currentTime = 0;
        video.style.display = 'none';
        container.querySelector('.video-thumbnail').style.display = 'block';
    } else {
        container.classList.add('fullscreen');
        const video = container.querySelector('.project-video-player');
        video.style.display = 'block';
        container.querySelector('.video-thumbnail').style.display = 'none';
        video.play();
    }
}

// Scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    document.querySelectorAll('.card, .project').forEach(el => {
        observer.observe(el);
    });

    // Close fullscreen video when clicking outside
    document.addEventListener('click', (e) => {
        const fullscreenVideos = document.querySelectorAll('.project-video-container.fullscreen');
        fullscreenVideos.forEach(videoContainer => {
            if (!videoContainer.contains(e.target)) {
                toggleFullscreen(videoContainer);
            }
        });
    });

    // Skill slider interaction
    const skillItems = document.querySelectorAll('.skill-item');
    const skillDescription = document.querySelector('.skill-description');
    const defaultDescription = skillDescription.innerHTML;
    
    // Set up hover effects
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Remove active class from all items
            skillItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to current item
            this.classList.add('active');
            
            // Update description
            const skillName = this.getAttribute('data-skill');
            const level = this.querySelector('.level-bar').style.width;
            
            skillDescription.innerHTML = `
                <h3>${skillName}</h3>
                <p>Proficiency: ${level}</p>
                <p>${getSkillDescription(skillName)}</p>
            `;
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('active');
            skillDescription.innerHTML = defaultDescription;
        });
    });
    
    // Touch support for mobile devices
    skillItems.forEach(item => {
        item.addEventListener('touchstart', function() {
            // Remove active class from all items
            skillItems.forEach(i => i.classList.remove('active'));
            
            // Toggle active class on current item
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                skillDescription.innerHTML = defaultDescription;
            } else {
                this.classList.add('active');
                const skillName = this.getAttribute('data-skill');
                const level = this.querySelector('.level-bar').style.width;
                
                skillDescription.innerHTML = `
                    <h3>${skillName}</h3>
                    <p>Proficiency: ${level}</p>
                    <p>${getSkillDescription(skillName)}</p>
                `;
            }
        }, {passive: true});
    });
    
    // Pause animation on hover
    const skillTrack = document.querySelector('.skill-track');
    skillTrack.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
    });
    
    skillTrack.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
    });
});

// Helper function for skill descriptions
// Helper function for skill descriptions
function getSkillDescription(skill) {
    const descriptions = {
        'JavaScript': 'Proficient in core concepts and modern ES6+ features, with experience building interactive web applications like this portfolio (50% proficiency)',
        'Python': 'Experienced in developing machine learning models and computer vision applications using Python extensive data science ecosystem (65% proficiency)',
        'Java': 'Primary language for data structures and algorithms, with additional experience in Android application development (75% proficiency)',
        'Kotlin': 'Primary Android development language with experience building production-ready mobile applications (50% proficiency)',
        'HTML': 'Expertise in semantic HTML5 markup and creating accessible web structures (80% proficiency)',
        'CSS': 'Strong skills in responsive design, CSS animations, and modern layout techniques (70% proficiency)',
        'Tableau': 'Skilled in creating complex data visualizations and interactive business intelligence dashboards (80% proficiency)',
        'MySQL': 'Experienced in database design, optimization, and writing complex queries (80% proficiency)',
        'Node.js': 'Competent in building RESTful APIs and server-side applications (65% proficiency)',
        'GitHub': 'Proficient in Git workflows, version control, and collaborative development practices (65% proficiency)',
        'Android': 'Extensive experience in native Android development using Jetpack components and Material Design (75% proficiency)',
        'Firebase': 'Implemented authentication systems, realtime databases, and cloud functions in production applications (75% proficiency)',
        'AWS': 'Familiar with core services including EC2, S3, and Lambda, with deployment experience (60% proficiency)'
    };
    
    return descriptions[skill] || `Professional experience working with ${skill} in production environments.`;
}

// Mobile menu toggle
function setupMobileMenu() {
    const navContainer = document.querySelector('.nav-container');
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="bx bx-menu"></i>';
    menuToggle.style.display = 'none';
    
    document.querySelector('.header').appendChild(menuToggle);
    
    if (window.innerWidth < 768) {
        menuToggle.style.display = 'flex';
        navContainer.style.display = 'none';
        
        menuToggle.addEventListener('click', () => {
            if (navContainer.style.display === 'none' || !navContainer.style.display) {
                navContainer.style.display = 'flex';
                navContainer.style.flexDirection = 'column';
                navContainer.style.position = 'absolute';
                navContainer.style.top = '100%';
                navContainer.style.left = '0';
                navContainer.style.width = '100%';
                navContainer.style.padding = '1rem';
                navContainer.style.backgroundColor = 'rgba(0, 15, 60, 0.9)';
            } else {
                navContainer.style.display = 'none';
            }
        });
    } else {
        menuToggle.style.display = 'none';
        navContainer.style.display = 'flex';
    }
}

window.addEventListener('resize', setupMobileMenu);
setupMobileMenu();

// Mobile menu toggle functionality
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navContainer = document.querySelector('.nav-container');

mobileMenuToggle.addEventListener('click', () => {
    navContainer.classList.toggle('active');
});