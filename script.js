emailjs.init('vqfw7dmQN2RtdA-L7');

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const navContainer = document.querySelector('.nav-container');
                if (window.innerWidth < 768 && navContainer.classList.contains('active')) {
                    navContainer.classList.remove('active');
                }
            }
        });
    });

    // Mobile Menu
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navContainer = document.querySelector('.nav-container');
    
    if (mobileMenuToggle && navContainer) {
        mobileMenuToggle.addEventListener('click', function() {
            navContainer.classList.toggle('active');
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
            btn.disabled = true;

            emailjs.sendForm(
                'service_qru64od',
                'template_3xvge8n',
                this
            )
            .then(function() {
                btn.innerHTML = '<i class="bx bx-check"></i> Sent!';
                contactForm.reset();
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'form-success';
                successMsg.textContent = 'Message sent successfully!';
                contactForm.parentNode.insertBefore(successMsg, contactForm.nextSibling);
                
                setTimeout(() => successMsg.remove(), 5000);
            })
            .catch(function(error) {
                console.error('EmailJS Error:', error);
                btn.innerHTML = '<i class="bx bx-error"></i> Failed';
                alert('Error: Please email me directly at shreysingh1029@gmail.com');
            })
            .finally(function() {
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }, 3000);
            });
        });
    }

    // Project Video Fullscreen Toggle
    function toggleFullscreen(container) {
        if (container.classList.contains('fullscreen')) {
            container.classList.remove('fullscreen');
            const video = container.querySelector('.project-video-player');
            if (video) {
                video.pause();
                video.currentTime = 0;
                video.style.display = 'none';
            }
            const thumbnail = container.querySelector('.video-thumbnail');
            if (thumbnail) thumbnail.style.display = 'block';
        } else {
            container.classList.add('fullscreen');
            const video = container.querySelector('.project-video-player');
            if (video) {
                video.style.display = 'block';
                video.play().catch(e => console.error('Video play failed:', e));
            }
            const thumbnail = container.querySelector('.video-thumbnail');
            if (thumbnail) thumbnail.style.display = 'none';
        }
    }

    // Set up video toggles
    document.querySelectorAll('.project-video-container').forEach(container => {
        container.addEventListener('click', function(e) {
            if (e.target.closest('a')) return; // Don't toggle if clicking a link
            toggleFullscreen(this);
        });
    });

    // Close fullscreen when clicking outside
    document.addEventListener('click', function(e) {
        const fullscreenVideos = document.querySelectorAll('.project-video-container.fullscreen');
        fullscreenVideos.forEach(videoContainer => {
            if (!videoContainer.contains(e.target)) {
                toggleFullscreen(videoContainer);
            }
        });
    });

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);

    // Observe sections and cards
    document.querySelectorAll('section, .card, .project').forEach(el => {
        observer.observe(el);
    });

    // Skill Slider Interaction
    const skillItems = document.querySelectorAll('.skill-item');
    const skillDescription = document.querySelector('.skill-description');
    
    if (skillDescription) {
        const defaultDescription = skillDescription.innerHTML;
        
        // Mouse hover effects
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                skillItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                
                const skillName = this.getAttribute('data-skill');
                const level = this.querySelector('.level-bar')?.style.width || '0%';
                
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
            
            // Touch support for mobile
            item.addEventListener('touchstart', function(e) {
                e.preventDefault();
                skillItems.forEach(i => i.classList.remove('active'));
                
                if (this.classList.contains('active')) {
                    this.classList.remove('active');
                    skillDescription.innerHTML = defaultDescription;
                } else {
                    this.classList.add('active');
                    const skillName = this.getAttribute('data-skill');
                    const level = this.querySelector('.level-bar')?.style.width || '0%';
                    
                    skillDescription.innerHTML = `
                        <h3>${skillName}</h3>
                        <p>Proficiency: ${level}</p>
                        <p>${getSkillDescription(skillName)}</p>
                    `;
                }
            }, { passive: false });
        });
        
        // Pause animation on hover
        const skillTrack = document.querySelector('.skill-track');
        if (skillTrack) {
            skillTrack.addEventListener('mouseenter', function() {
                this.style.animationPlayState = 'paused';
            });
            
            skillTrack.addEventListener('mouseleave', function() {
                this.style.animationPlayState = 'running';
            });
        }
    }

    // Background Video Handling
    const bgVideos = document.querySelectorAll('.blackhole video, .galaxy-vid');
    
    function handleVideoPlay(video) {
        video.play().catch(error => {
            console.log('Video autoplay failed, will try again after interaction');
            if (video.poster) {
                video.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.className = 'video-fallback';
                fallback.style.backgroundImage = `url(${video.poster})`;
                fallback.style.backgroundSize = 'cover';
                fallback.style.backgroundPosition = 'center';
                video.parentNode.appendChild(fallback);
            }
        });
    }
    
    // Initialize background videos
    bgVideos.forEach(video => {
        handleVideoPlay(video);
        
        // Retry on user interaction
        document.addEventListener('click', function tryPlay() {
            if (video.paused) {
                handleVideoPlay(video);
            }
            document.removeEventListener('click', tryPlay);
        }, { once: true });
    });
});

// Helper function for skill descriptions
function getSkillDescription(skill) {
    const descriptions = {
        'JavaScript': 'Proficient in core concepts and modern ES6+ features, with experience building interactive web applications like this portfolio',
        'Python': 'Experienced in developing machine learning models and computer vision applications using Python extensive data science ecosystem',
        'Java': 'Primary language for data structures and algorithms, with additional experience in Android application development',
        'Kotlin': 'Primary Android development language with experience building production-ready mobile applications',
        'HTML': 'Expertise in semantic HTML5 markup and creating accessible web structures',
        'CSS': 'Strong skills in responsive design, CSS animations, and modern layout techniques',
        'Tableau': 'Skilled in creating complex data visualizations and interactive business intelligence dashboards',
        'MySQL': 'Experienced in database design, optimization, and writing complex queries',
        'Node.js': 'Competent in building RESTful APIs and server-side applications',
        'GitHub': 'Proficient in Git workflows, version control, and collaborative development practices',
        'Android': 'Extensive experience in native Android development using Jetpack components and Material Design',
        'Firebase': 'Implemented authentication systems, realtime databases, and cloud functions in production applications',
        'AWS': 'Familiar with core services including EC2, S3, and Lambda, with deployment experience'
    };
    
    return descriptions[skill] || `Professional experience working with ${skill} in production environments.`;
}

// Responsive menu setup
function setupMobileMenu() {
    const navContainer = document.querySelector('.nav-container');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (!navContainer || !menuToggle) return;
    
    function updateMenuVisibility() {
        if (window.innerWidth < 768) {
            menuToggle.style.display = 'flex';
            navContainer.style.display = 'none';
        } else {
            menuToggle.style.display = 'none';
            navContainer.style.display = 'flex';
        }
    }
    
    menuToggle.addEventListener('click', function() {
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
    
    window.addEventListener('resize', updateMenuVisibility);
    updateMenuVisibility();
}


// Initialize mobile menu
setupMobileMenu();
