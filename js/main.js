// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation removed — no mobile menu handlers
    
    // Form submission handler
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Format WhatsApp message
            const message = `*New Booking Request*%0A%0A` +
                          `Name: ${data.name}%0A` +
                          `Phone: ${data.phone}%0A` +
                          `Email: ${data.email}%0A` +
                          `Check-in: ${data.checkin}%0A` +
                          `Check-out: ${data.checkout}%0A` +
                          `Guests: ${data.guests}%0A` +
                          `Package: ${data.package}%0A` +
                          `Message: ${data.message || 'None'}`;
            
            // Open WhatsApp
            window.open(`https://wa.me/919075112200?text=${message}`, '_blank');
        });
    }
    
    // Package selection
    document.querySelectorAll('.package-btn').forEach(button => {
        button.addEventListener('click', function() {
            const packageCard = this.closest('.package-card');
            const packageName = packageCard.querySelector('h3').textContent;
            const packagePrice = packageCard.querySelector('.package-price').textContent;
            
            // Store in session storage for booking form
            sessionStorage.setItem('selectedPackage', `${packageName} - ${packagePrice}`);
            
            // Redirect to packages page
            window.location.href = 'packages.html';
        });
    });
    
    // Set active nav link based on current page
    function setActiveNav() {
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('nav ul li a');

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }
    
    setActiveNav();
    
    // Header Hide/Show on Scroll
    let lastScrollTop = 0;
    const header = document.getElementById('main-header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            
            if (currentScroll > lastScrollTop && currentScroll > 100) {
                // Scrolling DOWN - Hide header
                header.classList.add('hide-header');
            } else {
                // Scrolling UP - Show header
                header.classList.remove('hide-header');
            }
            
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        }, false);
    }
});