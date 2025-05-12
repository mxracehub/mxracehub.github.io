/**
 * Race Countdown Timer
 * 
 * This script manages the countdown timer for upcoming races, automatically adjusting based on
 * the race schedule from the race-updater.js file.
 */

document.addEventListener('DOMContentLoaded', function() {
  initializeCountdown();
});

function initializeCountdown() {
  // Get the target date elements
  const nextRaceTitleElement = document.querySelector('.next-race-title');
  const nextRaceDateElement = document.querySelector('.next-race-date');
  
  if (!nextRaceTitleElement || !nextRaceDateElement) return;
  
  // Get countdown display elements
  const daysElement = document.getElementById('countdown-days');
  const hoursElement = document.getElementById('countdown-hours');
  const minutesElement = document.getElementById('countdown-minutes');
  const secondsElement = document.getElementById('countdown-seconds');
  
  if (!daysElement || !hoursElement || !minutesElement || !secondsElement) return;
  
  // Get the date string from the element
  const dateText = nextRaceDateElement.textContent.trim();
  
  // Parse the date (assuming format like "APRIL 27, 2025")
  const targetDate = new Date(dateText);
  
  // If date is invalid, exit
  if (isNaN(targetDate.getTime())) {
    console.error('Invalid date format:', dateText);
    return;
  }
  
  // Update countdown every second
  updateCountdown();
  setInterval(updateCountdown, 1000);
  
  function updateCountdown() {
    // Get current date and time
    const now = new Date();
    
    // Calculate time difference in milliseconds
    const diff = targetDate.getTime() - now.getTime();
    
    // If past the target date, hide countdown or show "EVENT IN PROGRESS"
    if (diff <= 0) {
      daysElement.textContent = '00';
      hoursElement.textContent = '00';
      minutesElement.textContent = '00';
      secondsElement.textContent = '00';
      
      // Optional: Show "Event in progress" or similar
      const countdownSection = document.querySelector('.countdown-section');
      if (countdownSection) {
        const liveNowBanner = document.querySelector('.live-now-banner');
        if (liveNowBanner) {
          liveNowBanner.style.display = 'flex';
        }
      }
      
      return;
    }
    
    // Calculate days, hours, minutes, seconds
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // Update the countdown display
    daysElement.textContent = days.toString().padStart(2, '0');
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
  }
}