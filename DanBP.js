// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAnimations();
    initializeAttendeeCards();
    populateSquadAttendees();
});
// Squad attendee data
const squadAttendees = [
    { name: 'Dan Delos Santos', hotel: 'Paris', room: '', is21: true, phone: '(818) 422-7511' },    
    { name: 'Stephen Yoshida', hotel: 'Paris', room: '', is21: true, phone: '(530) 768-4352' },
    { name: 'Luis Ramos', hotel: 'Paris', room: '', is21: true, phone: '(310) 982-8814' },
    { name: 'Logan Marley', hotel: 'Paris', room: '', is21: true, phone: '(209) 918-8532' }
    // Add more attendees as needed
];

// Populate squad attendee buttons with dropdowns
function populateSquadAttendees() {
    const grid = document.querySelector('.attendees-grid');
    if (!grid) return;
    grid.innerHTML = '';
    squadAttendees.forEach((attendee, idx) => {
        const card = document.createElement('div');
        card.className = 'attendee-card';

        // Button
        const btn = document.createElement('button');
        btn.className = 'dropdown-btn';
        btn.type = 'button';
        btn.innerHTML = `<i class="fas fa-user"></i> ${attendee.name}`;
        btn.onclick = function(event) {
            event.stopPropagation();
            toggleDropdown(idx, 'squad');
        };
        card.appendChild(btn);

        // Dropdown
        const dropdown = document.createElement('div');
        dropdown.className = 'dropdown-content';
        dropdown.id = `squad-dropdown-${idx}`;
        dropdown.innerHTML = `
            <div class="info-item"><strong>Hotel:</strong> ${attendee.hotel ? attendee.hotel : 'N/A'}</div>
            <div class="info-item"><strong>Room:</strong> ${attendee.room}</div>
            <div class="info-item"><strong>21+?</strong> ${attendee.is21 ? 'Yes' : 'No'}</div>
            <div class="info-item"><strong>Phone:</strong> ${attendee.phone ? attendee.phone : 'N/A'}</div>
        `;
        card.appendChild(dropdown);

        grid.appendChild(card);
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        document.querySelectorAll('.dropdown-content.active').forEach(dd => dd.classList.remove('active'));
    });
}

// Initialize attendee card animations
function initializeAttendeeCards() {
    const attendeeCards = document.querySelectorAll('.attendee-card');
    
    attendeeCards.forEach((card, index) => {
        // Add entrance animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.animationDelay = `${index * 0.1}s`;
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Toggle dropdown functionality
function toggleDropdown(index, type) {
    const dropdown = document.getElementById(`${type}-dropdown-${index}`);
    const allDropdowns = document.querySelectorAll('.dropdown-content');
    
    // Close all other dropdowns
    allDropdowns.forEach(dd => {
        if (dd !== dropdown) {
            dd.classList.remove('active');
        }
    });
    
    // Toggle current dropdown with stable styling
    dropdown.classList.toggle('active');
    
    // Prevent any color/style conflicts during toggle
    const button = event.target.closest('.dropdown-btn');
    if (button) {
        button.style.transition = 'transform 0.2s ease';
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 100);
    }
}

// Play click sound effect
function playClickSound() {
    // Create a simple beep sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
        // Audio context not supported or blocked
        console.log('Audio not available');
    }
}

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Add visual feedback
                this.style.transform = 'translateX(-15px) scale(1.1)';
                setTimeout(() => {
                    this.style.transform = 'translateX(-10px)';
                }, 200);
            }
        });
    });
    
    // Highlight active navigation based on scroll position
    window.addEventListener('scroll', updateActiveNavigation);
}

// Update active navigation item based on scroll position
function updateActiveNavigation() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section.id;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Initialize animations and effects
function initializeAnimations() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && scrolled < hero.offsetHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Intersection Observer for section animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animation for timeline events
                if (entry.target.classList.contains('event')) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, Math.random() * 300);
                }
            }
        });
    }, observerOptions);
    
    // Observe sections and timeline events
    document.querySelectorAll('.section, .event').forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Add CSS for animations
    addAnimationStyles();
}

// Add animation styles dynamically
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .event {
            opacity: 0;
            transform: translateX(-50px);
            transition: all 0.6s ease;
        }
        
        .section {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
        
        .section.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .nav-link.active {
            background: rgba(255, 0, 128, 0.3) !important;
            box-shadow: 0 0 20px rgba(255, 0, 128, 0.5) !important;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .attendee-card:hover {
            animation: none;
            transform: translateY(-5px) !important;
        }
        
        .dropdown-btn {
            transition: transform 0.2s ease, box-shadow 0.2s ease !important;
        }
        
        .dropdown-btn:hover {
            transform: scale(1.05) !important;
        }
        
        .dropdown-btn:active {
            transform: scale(0.95) !important;
        }
        
        /* Prevent color inversion on interactions */
        .attendee-card, .dropdown-btn, .nav-link {
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            transform-style: preserve-3d;
            -webkit-transform-style: preserve-3d;
        }
    `;
    
    document.head.appendChild(style);
}

// Emergency contact quick dial functionality
function quickDial(phoneNumber) {
    // For mobile devices, this will attempt to open the phone dialer
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        window.location.href = `tel:${phoneNumber}`;
    } else {
        // For desktop, copy to clipboard and show notification
        navigator.clipboard.writeText(phoneNumber).then(() => {
            showNotification(`Phone number ${phoneNumber} copied to clipboard!`);
        }).catch(() => {
            showNotification(`Call: ${phoneNumber}`);
        });
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #ff0080, #00ffff);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 10000;
        font-weight: 600;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add slide animations for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(notificationStyles);

// Add quick contact functionality to contact cards
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const contactCards = document.querySelectorAll('.contact-card');
        contactCards.forEach(card => {
            card.addEventListener('click', function() {
                const phoneElement = this.querySelector('p:contains("(555)")');
                if (phoneElement) {
                    const phoneNumber = phoneElement.textContent.match(/\((\d{3})\) (\d{3}-\d{4})/);
                    if (phoneNumber) {
                        quickDial(phoneNumber[0]);
                    }
                }
            });
        });
    }, 1000);
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close all dropdowns
        document.querySelectorAll('.dropdown-content.active').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// Add mobile-specific enhancements
if (/Mobi|Android/i.test(navigator.userAgent)) {
    // Add touch-friendly enhancements
    document.addEventListener('DOMContentLoaded', function() {
        // Force dark background on mobile
        document.body.style.background = 'linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)';
        document.body.style.backgroundAttachment = 'fixed';
        document.body.style.minHeight = '100vh';
        
        // Ensure neon background works on mobile
        const neonBg = document.querySelector('.neon-bg');
        if (neonBg) {
            neonBg.style.position = 'fixed';
            neonBg.style.background = `
                radial-gradient(circle at 20% 20%, rgba(255, 0, 128, 0.06) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(0, 255, 255, 0.06) 0%, transparent 50%),
                radial-gradient(circle at 40% 60%, rgba(255, 255, 0, 0.06) 0%, transparent 50%)
            `;
            neonBg.style.zIndex = '-1';
        }
        
        const style = document.createElement('style');
        style.textContent = `
            .dropdown-btn {
                min-height: 44px;
                font-size: 1rem;
            }
            
            .nav-link {
                min-height: 44px;
                min-width: 44px;
                background: rgba(0, 0, 0, 0.8) !important;
            }
            
            .attendee-card {
                touch-action: manipulation;
                background: linear-gradient(135deg, rgba(255, 0, 128, 0.15) 0%, rgba(0, 255, 255, 0.15) 100%) !important;
            }
            
            /* Mobile viewport fix */
            html, body {
                background: linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%) !important;
                background-attachment: fixed !important;
                min-height: 100vh !important;
                overflow-x: hidden;
            }
            
            /* Prevent white flashes on mobile */
            * {
                -webkit-tap-highlight-color: transparent;
            }
        `;
        document.head.appendChild(style);
    });
}
