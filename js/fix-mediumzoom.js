// Fix for mediumZoom errors
if (typeof mediumZoom === 'undefined') {
  window.mediumZoom = function() {
    return {
      attach: function() { return this; },
      detach: function() { return this; },
      update: function() { return this; },
      clone: function() { return this; },
      on: function() { return this; },
      off: function() { return this; },
      open: function() { return this; },
      close: function() { return this; },
      toggle: function() { return this; },
      getOptions: function() { return {}; },
      getImages: function() { return []; },
      getZoomedImage: function() { return null; }
    };
  };
}

// Simple image zoom functionality for teams pages
document.addEventListener('DOMContentLoaded', function() {
  // Handle image clicks for simple zoom effect
  const images = document.querySelectorAll('.gallery-img, .rider-image, .team-image');
  images.forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function() {
      // Simple zoom effect
      if (this.style.transform === 'scale(1.5)') {
        this.style.transform = 'scale(1)';
        this.style.zIndex = '1';
      } else {
        this.style.transform = 'scale(1.5)';
        this.style.zIndex = '1000';
        this.style.transition = 'transform 0.3s ease';
      }
    });
  });
});