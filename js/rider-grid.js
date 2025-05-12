
document.addEventListener('DOMContentLoaded', () => {
  const riderGrids = document.querySelectorAll('.rider-grid');
  
  riderGrids.forEach(grid => {
    const division = grid.dataset.division;
    
    // Link rider cards to their profile pages
    grid.querySelectorAll('.rider-card').forEach(card => {
      card.addEventListener('click', () => {
        const riderName = card.querySelector('.rider-name').textContent;
        const slug = riderName.toLowerCase().replace(/\s+/g, '-');
        window.location.href = `/riders/${division}/${slug}/`;
      });
      
      // Add hover effect
      card.classList.add('cursor-pointer', 'hover:shadow-lg', 'transition-shadow');
    });
  });
});
