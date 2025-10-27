/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@300;400;600;700&display=swap');

/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Exo 2', sans-serif;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%);
    color: #ffffff;
    overflow-x: hidden;
    position: relative;
}

/* Animated Background */
.neon-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
        radial-gradient(circle at 20% 20%, rgba(255, 0, 128, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(0, 255, 255, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 40% 60%, rgba(255, 255, 0, 0.08) 0%, transparent 50%);
    animation: bgShift 15s ease-in-out infinite alternate;
    z-index: -1;
    will-change: background;
    backface-visibility: hidden;
}

@keyframes bgShift {
    0% { 
        background: 
            radial-gradient(circle at 20% 20%, rgba(255, 0, 128, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(0, 255, 255, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(255, 255, 0, 0.08) 0%, transparent 50%);
    }
    50% {
        background: 
            radial-gradient(circle at 50% 50%, rgba(255, 0, 128, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 60% 40%, rgba(0, 255, 255, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 30% 70%, rgba(255, 255, 0, 0.06) 0%, transparent 50%);
    }
    100% { 
        background: 
            radial-gradient(circle at 70% 30%, rgba(255, 0, 128, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 30% 70%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 60% 40%, rgba(255, 255, 0, 0.1) 0%, transparent 50%);
    }
}

/* Container */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Hero Section */
.hero {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    text-align: center;
    overflow: hidden;
}

.hero-content {
    z-index: 2;
    position: relative;
}

.neon-title {
    font-family: 'Orbitron', monospace;
    font-size: 4rem;
    font-weight: 900;
    margin-bottom: 1rem;
    text-shadow: 
        0 0 5px #ff0080,
        0 0 10px #ff0080,
        0 0 20px #ff0080,
        0 0 40px #ff0080;
    animation: neonFlicker 2s ease-in-out infinite alternate;
    letter-spacing: 3px;
}

@keyframes neonFlicker {
    0%, 100% {
        text-shadow: 
            0 0 5px #ff0080,
            0 0 10px #ff0080,
            0 0 20px #ff0080,
            0 0 40px #ff0080;
    }
    50% {
        text-shadow: 
            0 0 2px #ff0080,
            0 0 5px #ff0080,
            0 0 8px #ff0080,
            0 0 12px #ff0080;
    }
}

.hero-subtitle {
    font-size: 1.2rem;
    font-weight: 300;
    margin-bottom: 2rem;
    opacity: 0.8;
    letter-spacing: 2px;
}

.party-date {
    font-size: 1.5rem;
    font-weight: 600;
    color: #00ffff;
    text-shadow: 0 0 10px #00ffff;
}

.party-date i {
    margin-right: 10px;
}

/* Hero Graphics */
.hero-graphics {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.neon-circle {
    position: absolute;
    border: 2px solid #ff0080;
    border-radius: 50%;
    box-shadow: 
        0 0 20px #ff0080,
        inset 0 0 20px #ff0080;
    animation: float 6s ease-in-out infinite;
}

.neon-circle:nth-child(1) {
    width: 100px;
    height: 100px;
    top: 20%;
    left: 10%;
}

.neon-circle:nth-child(2) {
    width: 150px;
    height: 150px;
    top: 60%;
    right: 15%;
    border-color: #00ffff;
    box-shadow: 
        0 0 20px #00ffff,
        inset 0 0 20px #00ffff;
}

.neon-circle:nth-child(3) {
    width: 80px;
    height: 80px;
    bottom: 30%;
    left: 70%;
    border-color: #ffff00;
    box-shadow: 
        0 0 20px #ffff00,
        inset 0 0 20px #ffff00;
}

.neon-circle.delay-1 {
    animation-delay: -2s;
}

.neon-circle.delay-2 {
    animation-delay: -4s;
}

@keyframes float {
    0%, 100% {
        transform: translateY(0px) rotate(0deg);
    }
    50% {
        transform: translateY(-20px) rotate(180deg);
    }
}

/* Navigation */
.nav-bar {
    position: fixed;
    top: 50%;
    right: 30px;
    transform: translateY(-50%);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.nav-link {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    background: rgba(0, 0, 0, 0.7);
    border: 1px solid #ff0080;
    border-radius: 25px;
    color: #ffffff;
    text-decoration: none;
    transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
    backdrop-filter: blur(10px);
    font-weight: 600;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    will-change: transform;
}

.nav-link:hover {
    background: rgba(255, 0, 128, 0.2);
    box-shadow: 0 0 20px rgba(255, 0, 128, 0.5);
    transform: translateX(-10px);
}

.nav-link i {
    margin-right: 10px;
    font-size: 1.2rem;
}

/* Sections */
.section {
    padding: 100px 0;
    position: relative;
}

.section-title {
    font-family: 'Orbitron', monospace;
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 3rem;
    color: #00ffff;
    text-shadow: 0 0 10px #00ffff;
}

.section-title i {
    margin-right: 15px;
}

/* Attendees Grid */
.attendees-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-top: 2rem;
}

.attendee-card {
    background: linear-gradient(135deg, rgba(255, 0, 128, 0.1) 0%, rgba(0, 255, 255, 0.1) 100%);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    padding: 25px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    backdrop-filter: blur(10px);
    position: relative;
    overflow: hidden;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    will-change: transform;
}

.attendee-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
    transition: left 0.5s ease;
}

.attendee-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(255, 0, 128, 0.2);
    border-color: rgba(255, 0, 128, 0.4);
}

.attendee-card:hover::before {
    left: 100%;
}

.attendee-name {
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 10px;
    color: #ffffff;
}

.attendee-role {
    color: #00ffff;
    font-size: 0.9rem;
    margin-bottom: 15px;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.dropdown-btn {
    background: linear-gradient(45deg, #ff0080, #00ffff);
    border: none;
    border-radius: 25px;
    padding: 10px 20px;
    color: #ffffff;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    margin: 5px;
    font-family: 'Exo 2', sans-serif;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    will-change: transform;
}

.dropdown-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(255, 0, 128, 0.4);
}

.dropdown-btn:active {
    transform: scale(0.95);
}

.dropdown-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 10px;
    margin-top: 10px;
    backdrop-filter: blur(10px);
}

.dropdown-content.active {
    max-height: 200px;
    padding: 15px;
}

.info-item {
    margin: 8px 0;
    padding: 8px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 5px;
    font-size: 0.9rem;
}

/* Timeline */
.timeline {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
}

.timeline-day {
    margin-bottom: 50px;
}

.day-title {
    font-family: 'Orbitron', monospace;
    font-size: 1.5rem;
    color: #ffff00;
    text-align: center;
    margin-bottom: 30px;
    text-shadow: 0 0 10px #ffff00;
}

.timeline-events {
    position: relative;
    padding-left: 30px;
}

.timeline-events::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, #ff0080, #00ffff, #ffff00);
    box-shadow: 0 0 10px rgba(255, 0, 128, 0.5);
}

.event {
    display: flex;
    margin-bottom: 30px;
    position: relative;
}

.event::before {
    content: '';
    position: absolute;
    left: -37px;
    top: 10px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #ff0080;
    box-shadow: 0 0 10px #ff0080;
    z-index: 1;
}

.event-time {
    min-width: 100px;
    font-weight: 700;
    color: #00ffff;
    font-size: 1.1rem;
    margin-right: 20px;
}

.event-content {
    flex: 1;
    background: rgba(255, 255, 255, 0.05);
    padding: 20px;
    border-radius: 10px;
    border-left: 3px solid #ff0080;
    backdrop-filter: blur(10px);
}

.event-content h4 {
    color: #ffffff;
    margin-bottom: 8px;
    font-size: 1.1rem;
}

.event-content p {
    color: rgba(255, 255, 255, 0.8);
    margin: 5px 0;
}

.event-content i {
    color: #00ffff;
    margin-right: 8px;
}

/* Contact Grid */
.contact-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
    margin-top: 2rem;
}

.contact-card {
    background: linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(255, 255, 0, 0.1) 100%);
    border: 1px solid rgba(0, 255, 255, 0.3);
    border-radius: 15px;
    padding: 25px;
    text-align: center;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.contact-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 255, 255, 0.3);
}

.contact-card h3 {
    color: #00ffff;
    margin-bottom: 15px;
    font-size: 1.2rem;
}

.contact-card p {
    margin: 8px 0;
    color: rgba(255, 255, 255, 0.9);
}

/* Footer */
.footer {
    background: rgba(0, 0, 0, 0.8);
    padding: 30px 0;
    text-align: center;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
}

.footer p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
}

/* Responsive Design */
@media (max-width: 768px) {
    /* Ensure dark background on mobile */
    body {
        background: linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%) !important;
        background-attachment: fixed;
        min-height: 100vh;
    }
    
    /* Fix animated background for mobile */
    .neon-bg {
        position: fixed !important;
        background: 
            radial-gradient(circle at 20% 20%, rgba(255, 0, 128, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(0, 255, 255, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(255, 255, 0, 0.06) 0%, transparent 50%) !important;
        animation: none; /* Disable animation on mobile for better performance */
        z-index: -1 !important;
    }
    
    .neon-title {
        font-size: 2.5rem;
    }
    
    .hero-subtitle {
        font-size: 1rem;
    }
    
    .nav-bar {
        position: fixed;
        bottom: 20px;
        right: 20px;
        top: auto;
        transform: none;
        flex-direction: row;
        gap: 10px;
    }
    
    .nav-link {
        padding: 10px 15px;
        font-size: 0.9rem;
        background: rgba(0, 0, 0, 0.8) !important;
    }
    
    .nav-link span {
        display: none;
    }
    
    .section-title {
        font-size: 2rem;
    }
    
    .attendees-grid {
        grid-template-columns: 1fr;
    }
    
    .timeline {
        padding: 0 20px;
    }
    
    .timeline-events {
        padding-left: 20px;
    }
    
    .event {
        flex-direction: column;
    }
    
    .event-time {
        margin-bottom: 10px;
    }
    
    .hero-graphics .neon-circle {
        display: none;
    }
    
    /* Ensure all sections have proper background on mobile */
    .section {
        background: transparent !important;
    }
    
    .attendee-card {
        background: linear-gradient(135deg, rgba(255, 0, 128, 0.15) 0%, rgba(0, 255, 255, 0.15) 100%) !important;
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
    }
    
    .dropdown-content {
        background: rgba(0, 0, 0, 0.9) !important;
    }
}

@media (max-width: 480px) {
    /* Extra mobile fixes */
    body {
        background: linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%) !important;
        background-attachment: fixed !important;
    }
    
    .neon-bg {
        background: 
            radial-gradient(circle at 30% 30%, rgba(255, 0, 128, 0.08) 0%, transparent 60%),
            radial-gradient(circle at 70% 70%, rgba(0, 255, 255, 0.08) 0%, transparent 60%) !important;
    }
    
    .neon-title {
        font-size: 2rem;
    }
    
    .party-date {
        font-size: 1.2rem;
    }
    
    .section {
        padding: 60px 0;
        background: transparent !important;
    }
    
    .contact-grid {
        grid-template-columns: 1fr;
    }
    
    .contact-card {
        background: linear-gradient(135deg, rgba(0, 255, 255, 0.15) 0%, rgba(255, 255, 0, 0.15) 100%) !important;
        border: 1px solid rgba(0, 255, 255, 0.4) !important;
    }
}

/* Custom Scrollbar */
::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #ff0080, #00ffff);
    border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #ff0080, #ffff00);
}
