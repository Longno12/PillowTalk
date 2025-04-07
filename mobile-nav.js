document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('nav ul');
    const overlay = document.querySelector('.overlay');
    
    if (mobileNavToggle) {
      mobileNavToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        if (overlay) {
          overlay.classList.toggle('active');
        }
        
        // Prevent scrolling when menu is open
        document.body.classList.toggle('no-scroll');
      });
    }
    
    if (overlay) {
      overlay.addEventListener('click', function() {
        mobileNavToggle.classList.remove('active');
        navMenu.classList.remove('active');
        this.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    }
    
    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileNavToggle.classList.remove('active');
        navMenu.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
  });