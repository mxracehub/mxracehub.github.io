
// Teams page functionality
document.addEventListener('DOMContentLoaded', function() {
  // Handle image loading errors with proper fallback
  const images = document.querySelectorAll('.gallery-img, .rider-image, .partner-logo, .team-logo');
  images.forEach(img => {
    img.addEventListener('error', function() {
      // Create fallback container
      const fallback = document.createElement('div');
      fallback.style.cssText = `
        background-color: #f5f5f5;
        display: flex;
        align-items: center;
        justify-content: center;
        width: ${this.offsetWidth || 100}px;
        height: ${this.offsetHeight || 100}px;
        border-radius: 4px;
        border: 1px solid #e0e0e0;
      `;
      fallback.innerHTML = '<span style="color: #999; font-size: 14px; text-align: center;">Team Logo</span>';
      
      // Replace image with fallback
      this.parentNode.replaceChild(fallback, this);
    });
  });

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Add loading animation for dynamic content
  const cards = document.querySelectorAll('.rider-card, .gallery-item, .partner-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
});
