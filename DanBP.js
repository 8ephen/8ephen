// Attendees data with phone numbers and hotel information
const attendeesData = [
    {
        name: "Dan Rodriguez",
        role: "The Groom",
        phone: "(555) 123-4567",
        hotel: "Grand Plaza Hotel",
        room: "Suite 1205",
        floorPlan: "12th Floor - Presidential Suite"
    },
    {
        name: "Mike Thompson",
        role: "Best Man",
        phone: "(555) 234-5678",
        hotel: "Grand Plaza Hotel", 
        room: "Room 1156",
        floorPlan: "11th Floor - Deluxe King"
    },
    {
        name: "Jake Wilson",
        role: "Groomsman",
        phone: "(555) 345-6789",
        hotel: "Grand Plaza Hotel",
        room: "Room 1157",
        floorPlan: "11th Floor - Deluxe King"
    },
    {
        name: "Chris Davis",
        role: "Groomsman", 
        phone: "(555) 456-7890",
        hotel: "Skyline Suites",
        room: "Room 815",
        floorPlan: "8th Floor - Standard Double"
    },
    {
        name: "Alex Martinez",
        role: "Groomsman",
        phone: "(555) 567-8901",
        hotel: "Grand Plaza Hotel",
        room: "Room 1134",
        floorPlan: "11th Floor - Deluxe King"
    },
    {
        name: "Ryan Chen",
        role: "College Buddy",
        phone: "(555) 678-9012",
        hotel: "Downtown Marriott",
        room: "Room 624",
        floorPlan: "6th Floor - Executive Suite"
    },
    {
        name: "Tyler Brooks",
        role: "Work Friend",
        phone: "(555) 789-0123",
        hotel: "Grand Plaza Hotel",
        room: "Room 1098",
        floorPlan: "10th Floor - Standard King"
    },
    {
        name: "Jordan Smith",
        role: "Childhood Friend",
        phone: "(555) 890-1234",
        hotel: "Skyline Suites",
        room: "Room 923",
        floorPlan: "9th Floor - Family Suite"
    }
];

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    renderAttendees();
    initializeNavigation();
    initializeAnimations();
});

// Render attendees cards
function renderAttendees() {
    const attendeesGrid = document.querySelector('.attendees-grid');
    
    attendeesData.forEach((attendee, index) => {
        const attendeeCard = createAttendeeCard(attendee, index);
        attendeesGrid.appendChild(attendeeCard);
    });
}

// Create individual attendee card
function createAttendeeCard(attendee, index) {
    const card = document.createElement('div');
    card.className = 'attendee-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
        <div class="attendee-name">${attendee.name}</div>
        <div class="attendee-role">${attendee.role}</div>
        
        <button class="dropdown-btn" onclick="toggleDropdown(${index}, 'phone')">
            <i class="fas fa-phone"></i> Phone Info
        </button>
        
        <button class="dropdown-btn" onclick="toggleDropdown(${index}, 'hotel')">
            <i class="fas fa-bed"></i> Hotel Info
        </button>
        
        <div id="phone-dropdown-${index}" class="dropdown-content">
            <div class="info-item">
                <i class="fas fa-phone"></i> <strong>Phone:</strong> ${attendee.phone}
            </div>
            <div class="info-item">
                <i class="fas fa-sms"></i> <strong>Text/Call:</strong> Available 24/7
            </div>
        </div>
        
        <div id="hotel-dropdown-${index}" class="dropdown-content">
            <div class="info-item">
                <i class="fas fa-hotel"></i> <strong>Hotel:</strong> ${attendee.hotel}
            </div>
            <div class="info-item">
                <i class="fas fa-door-open"></i> <strong>Room:</strong> ${attendee.room}
            </div>
            <div class="info-item">
                <i class="fas fa-map-marker-alt"></i> <strong>Location:</strong> ${attendee.floorPlan}
            </div>
        </div>
    `;
    
    // Add entrance animation
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, index * 100);
    
    return card;
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
    
    // Toggle current dropdown
    dropdown.classList.toggle('active');
    
    // Add sound effect (optional - requires sound file)
    playClickSound();
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
            background: rgba(255, 0, 128, 0.3);
            box-shadow: 0 0 20px rgba(255, 0, 128, 0.5);
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .attendee-card:hover {
            animation: pulse 0.6s ease-in-out;
        }
        
        .dropdown-btn:active {
            transform: scale(0.95);
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
        const style = document.createElement('style');
        style.textContent = `
            .dropdown-btn {
                min-height: 44px;
                font-size: 1rem;
            }
            
            .nav-link {
                min-height: 44px;
                min-width: 44px;
            }
            
            .attendee-card {
                touch-action: manipulation;
            }
        `;
        document.head.appendChild(style);
    });
}