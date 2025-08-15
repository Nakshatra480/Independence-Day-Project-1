// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add spokes to the Ashoka Chakra
    createChakraSpokes();
    
    // Initialize the greeting modal functionality
    initGreetingModal();
    
    // Add additional animations
    addRandomConfetti();
    
    // Initialize the countdown timer
    initCountdown();
    
    // Add parallax effect to floating symbols
    initParallaxEffect();
    
    // Add gallery hover effects
    initGallery();
    
    // Add share button functionality
    initShareButtons();
    
    // Add new function call
    addTouchSupport();
});

// Function to create the 24 spokes in the Ashoka Chakra
function createChakraSpokes() {
    const chakraWheel = document.querySelector('.chakra-wheel');
    const spokeCount = 24;
    
    for (let i = 0; i < spokeCount; i++) {
        const spoke = document.createElement('div');
        spoke.classList.add('chakra-spoke');
        spoke.style.transform = `rotate(${i * (360 / spokeCount)}deg)`;
        spoke.style.position = 'absolute';
        spoke.style.width = '2px';
        spoke.style.height = '50%';
        spoke.style.backgroundColor = 'white';
        spoke.style.top = '0';
        spoke.style.left = 'calc(50% - 1px)';
        spoke.style.transformOrigin = 'bottom center';
        spoke.style.boxShadow = '0 0 5px rgba(255, 255, 255, 0.7)';
        chakraWheel.appendChild(spoke);
    }
}

// Function to initialize the greeting modal
function initGreetingModal() {
    const modal = document.getElementById('greetingModal');
    const btn = document.getElementById('greetingBtn');
    const closeBtn = document.querySelector('.close-btn');
    
    // Add button pulse animation
    btn.classList.add('pulse-animation');
    const style = document.createElement('style');
    style.textContent = `
        .pulse-animation {
            animation: buttonPulse 2s infinite;
        }
        @keyframes buttonPulse {
            0% {
                box-shadow: 0 0 0 0 rgba(255, 153, 51, 0.7);
            }
            70% {
                box-shadow: 0 0 0 10px rgba(255, 153, 51, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(255, 153, 51, 0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Open modal when button is clicked
    btn.addEventListener('click', function() {
        modal.style.display = 'flex';
        playGreetingSound();
        showConfetti();
    });
    
    // Close modal when close button is clicked
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Function to play a greeting sound
function playGreetingSound() {
    // Create an audio element for the greeting sound
    const audio = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3');
    audio.volume = 0.5;
    audio.play().catch(error => {
        console.log('Audio playback failed:', error);
    });
}

// Function to add random confetti elements to the page
function addRandomConfetti() {
    const colors = ['#FF9933', '#FFFFFF', '#138808', '#000080', '#FFD700'];
    const confettiCount = 100;
    const content = document.querySelector('.content');
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.position = 'absolute';
            confetti.style.width = `${Math.random() * 10 + 5}px`;
            confetti.style.height = `${Math.random() * 10 + 5}px`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.top = `-50px`;
            confetti.style.opacity = '0';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.zIndex = '-1';
            confetti.style.animation = `fall ${Math.random() * 5 + 3}s linear forwards`;
            confetti.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.2)';
            content.appendChild(confetti);
            
            // Remove confetti after animation completes
            setTimeout(() => {
                confetti.remove();
            }, 8000);
        }, i * 100);
    }
    
    // Add falling confetti animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(1000px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Function to show confetti when greeting is displayed
function showConfetti() {
    const colors = ['#FF9933', '#FFFFFF', '#138808', '#000080', '#FFD700'];
    const shapes = ['circle', 'square', 'triangle'];
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '9';
    document.body.appendChild(confettiContainer);
    
    // Create 150 confetti pieces
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        
        // Randomly select shape
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        if (shape === 'circle') {
            const size = Math.random() * 10 + 5;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.borderRadius = '50%';
        } else if (shape === 'square') {
            const size = Math.random() * 10 + 5;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
        } else if (shape === 'triangle') {
            const size = Math.random() * 15 + 10;
            confetti.style.width = '0';
            confetti.style.height = '0';
            confetti.style.borderLeft = `${size/2}px solid transparent`;
            confetti.style.borderRight = `${size/2}px solid transparent`;
            confetti.style.borderBottom = `${size}px solid ${colors[Math.floor(Math.random() * colors.length)]}`;
            confetti.style.backgroundColor = 'transparent';
        }
        
        if (shape !== 'triangle') {
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        }
        
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = `-50px`;
        confetti.style.animation = `modalConfetti ${Math.random() * 3 + 2}s linear forwards`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        confetti.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.1)';
        confettiContainer.appendChild(confetti);
    }
    
    // Add modal confetti animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes modalConfetti {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Remove confetti container after animations complete
    setTimeout(() => {
        confettiContainer.remove();
    }, 5000);
}

// Add a tricolor text effect to the title
function addTricolorTextEffect() {
    const title = document.querySelector('.title');
    const text = title.textContent;
    title.textContent = '';
    
    const colors = ['#FF9933', '#FFFFFF', '#138808'];
    
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i];
        span.style.color = colors[i % 3];
        span.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.3)';
        span.style.display = 'inline-block';
        span.style.animation = `bounce 1s ease-in-out ${i * 0.1}s infinite alternate`;
        title.appendChild(span);
    }
    
    // Add bounce animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounce {
            0% {
                transform: translateY(0);
            }
            100% {
                transform: translateY(-10px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize countdown timer to Republic Day (January 26)
function initCountdown() {
    const countdownDays = document.getElementById('countdown-days');
    const countdownHours = document.getElementById('countdown-hours');
    const countdownMinutes = document.getElementById('countdown-minutes');
    const countdownSeconds = document.getElementById('countdown-seconds');
    
    // Set the date for next Republic Day
    const currentYear = new Date().getFullYear();
    const nextYear = new Date().getMonth() > 0 ? currentYear + 1 : currentYear;
    const republicDay = new Date(`January 26, ${nextYear} 00:00:00`);
    
    function updateCountdown() {
        const currentTime = new Date();
        const diff = republicDay - currentTime;
        
        const days = Math.floor(diff / 1000 / 60 / 60 / 24);
        const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
        const minutes = Math.floor(diff / 1000 / 60) % 60;
        const seconds = Math.floor(diff / 1000) % 60;
        
        countdownDays.textContent = days;
        countdownHours.textContent = hours < 10 ? '0' + hours : hours;
        countdownMinutes.textContent = minutes < 10 ? '0' + minutes : minutes;
        countdownSeconds.textContent = seconds < 10 ? '0' + seconds : seconds;
    }
    
    // Update the countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Initialize parallax effect for floating symbols
function initParallaxEffect() {
    const symbols = document.querySelectorAll('.symbol');
    
    window.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        symbols.forEach(symbol => {
            const speed = parseFloat(symbol.getAttribute('data-speed') || 0.05);
            const offsetX = (x - 0.5) * 50 * speed;
            const offsetY = (y - 0.5) * 50 * speed;
            
            symbol.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    });
    
    // Add data-speed attribute to symbols
    symbols.forEach((symbol, index) => {
        symbol.setAttribute('data-speed', (0.03 + (index * 0.01)).toString());
    });
}

// Initialize gallery hover effects
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Initialize share buttons
function initShareButtons() {
    const facebookBtn = document.querySelector('.share-btn.facebook');
    const twitterBtn = document.querySelector('.share-btn.twitter');
    const whatsappBtn = document.querySelector('.share-btn.whatsapp');
    
    const shareText = 'Celebrating India\'s 79th Independence Day! 🇮🇳 #IndependenceDay #India';
    const shareUrl = window.location.href;
    
    if (facebookBtn) {
        facebookBtn.addEventListener('click', function() {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`, '_blank');
        });
    }
    
    if (twitterBtn) {
        twitterBtn.addEventListener('click', function() {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        });
    }
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
        });
    }
}

// Add touch support for mobile devices
function addTouchSupport() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        item.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        });
    });
}