/**
 * Friend Betting Functionality
 * Handles creating friend bets, bet type switching, and form validation
 */

document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const form = document.getElementById('friend-bet-form');
  const betTypeSelect = document.getElementById('bet-type');
  const raceWinnerPrediction = document.getElementById('race-winner-prediction');
  const headToHeadPrediction = document.getElementById('head-to-head-prediction');
  const customPrediction = document.getElementById('custom-prediction');
  const rider1Select = document.getElementById('rider1-select');
  const rider2Select = document.getElementById('rider2-select');
  const rider1Name = document.getElementById('rider1-name');
  const rider2Name = document.getElementById('rider2-name');
  const previewBetBtn = document.getElementById('preview-bet');
  const createBetBtn = document.getElementById('create-bet');
  const betSummary = document.getElementById('bet-summary');
  const summaryContent = document.getElementById('summary-content');
  const successMessage = document.getElementById('success-message');
  
  // Only initialize if we're on the friend bet page
  if (!form) return;
  
  // Initialize auto-save functionality if available
  if (window.initBetFormAutoSave) {
    window.initBetFormAutoSave('friend-bet', form, {
      // Process data before saving
      beforeSave: (data) => {
        // Additional custom processing for specific fields if needed
        return data;
      },
      // Process data after loading
      afterLoad: (data) => {
        // Run type-specific UI updates after loading data
        handleBetTypeChange();
        
        // If head-to-head, update rider names
        if (data.betType === 'head-to-head' && 
            rider1Select && rider2Select && 
            rider1Name && rider2Name) {
          updateRiderNames();
        }
      }
    });
  }
  
  // Set up event listeners
  if (betTypeSelect) {
    betTypeSelect.addEventListener('change', handleBetTypeChange);
    // Initial setup based on current value
    handleBetTypeChange();
  }
  
  if (rider1Select && rider2Select) {
    rider1Select.addEventListener('change', updateRiderNames);
    rider2Select.addEventListener('change', updateRiderNames);
    // Initial setup
    updateRiderNames();
  }
  
  if (previewBetBtn) {
    previewBetBtn.addEventListener('click', previewBet);
  }
  
  // Form submission
  if (form) {
    form.addEventListener('submit', handleSubmit);
  }
  
  /**
   * Handle bet type change
   */
  function handleBetTypeChange() {
    const betType = betTypeSelect.value;
    
    // Hide all prediction sections
    raceWinnerPrediction.classList.add('hidden');
    headToHeadPrediction.classList.add('hidden');
    customPrediction.classList.add('hidden');
    
    // Show the selected one
    if (betType === 'race-winner') {
      raceWinnerPrediction.classList.remove('hidden');
    } else if (betType === 'head-to-head') {
      headToHeadPrediction.classList.remove('hidden');
    } else if (betType === 'custom') {
      customPrediction.classList.remove('hidden');
    }
    
    // Trigger form change event for autosave
    if (window.friendBetManager) {
      window.friendBetManager.handleFormChange();
    }
  }
  
  /**
   * Update rider names in head-to-head section
   */
  function updateRiderNames() {
    if (rider1Select && rider2Select && rider1Name && rider2Name) {
      const rider1Text = rider1Select.options[rider1Select.selectedIndex].text;
      const rider2Text = rider2Select.options[rider2Select.selectedIndex].text;
      
      rider1Name.textContent = rider1Text;
      rider2Name.textContent = rider2Text;
      
      // Trigger form change event for autosave
      if (window.friendBetManager) {
        window.friendBetManager.handleFormChange();
      }
    }
  }
  
  /**
   * Validate form inputs
   */
  function validateForm() {
    // Required fields
    const eventSelect = document.getElementById('event-select');
    const friendSelect = document.getElementById('friend-select');
    const wagerAmount = document.getElementById('wager-amount');
    const betType = betTypeSelect.value;
    
    let isValid = true;
    let errorMessage = '';
    
    // Check required fields
    if (!eventSelect.value) {
      isValid = false;
      errorMessage += 'Please select an event.\n';
    }
    
    if (!friendSelect.value) {
      isValid = false;
      errorMessage += 'Please select a friend to challenge.\n';
    }
    
    if (!wagerAmount.value || wagerAmount.value < 5) {
      isValid = false;
      errorMessage += 'Please enter a wager amount (minimum $5).\n';
    }
    
    // Check type-specific fields
    if (betType === 'race-winner') {
      const riderPrediction = document.getElementById('rider-prediction');
      if (!riderPrediction.value) {
        isValid = false;
        errorMessage += 'Please select a rider for your prediction.\n';
      }
    } else if (betType === 'head-to-head') {
      if (rider1Select.value === rider2Select.value) {
        isValid = false;
        errorMessage += 'Please select two different riders for the matchup.\n';
      }
    } else if (betType === 'custom') {
      const customProp = document.getElementById('custom-prop');
      if (!customProp.value) {
        isValid = false;
        errorMessage += 'Please enter your custom proposition.\n';
      }
    }
    
    // Show error messages if any
    if (!isValid) {
      alert('Please fix the following errors:\n\n' + errorMessage);
    }
    
    return isValid;
  }
  
  /**
   * Preview the bet before submission
   */
  function previewBet() {
    if (!validateForm()) {
      return;
    }
    
    // Get form data
    const eventText = document.getElementById('event-select').options[document.getElementById('event-select').selectedIndex].text;
    const friendText = document.getElementById('friend-select').options[document.getElementById('friend-select').selectedIndex].text;
    const wagerAmount = document.getElementById('wager-amount').value;
    const betType = betTypeSelect.value;
    const customTerms = document.getElementById('custom-terms').value;
    
    let predictionText = '';
    
    if (betType === 'race-winner') {
      const riderText = document.getElementById('rider-prediction').options[document.getElementById('rider-prediction').selectedIndex].text;
      predictionText = `${riderText} will win the race`;
    } else if (betType === 'head-to-head') {
      const selectedRider = document.querySelector('input[name="rider-pick"]:checked').value;
      const riderText = selectedRider === 'rider1' ? rider1Name.textContent : rider2Name.textContent;
      predictionText = `${riderText} will finish ahead of ${selectedRider === 'rider1' ? rider2Name.textContent : rider1Name.textContent}`;
    } else if (betType === 'custom') {
      predictionText = document.getElementById('custom-prop').value;
    }
    
    // Create summary HTML
    const summaryHtml = `
      <div class="text-sm space-y-2">
        <p><strong>Event:</strong> ${eventText}</p>
        <p><strong>Friend:</strong> ${friendText}</p>
        <p><strong>Bet Type:</strong> ${betType === 'race-winner' ? 'Race Winner' : betType === 'head-to-head' ? 'Head-to-Head' : 'Custom Proposition'}</p>
        <p><strong>Prediction:</strong> ${predictionText}</p>
        <p><strong>Wager Amount:</strong> $${wagerAmount}</p>
        ${customTerms ? `<p><strong>Custom Terms:</strong> ${customTerms}</p>` : ''}
      </div>
    `;
    
    // Update and show summary
    summaryContent.innerHTML = summaryHtml;
    betSummary.classList.remove('hidden');
  }
  
  /**
   * Handle form submission
   */
  async function handleSubmit(event) {
    event.preventDefault();
    
    // Validate the form
    if (!validateForm()) {
      return;
    }
    
    // Get form data
    const formData = new FormData(form);
    const betData = {
      eventId: formData.get('eventId'),
      betType: formData.get('betType'),
      friendId: formData.get('friendId'),
      wagerAmount: parseFloat(formData.get('wagerAmount')),
      customTerms: formData.get('customTerms')
    };
    
    // Add type-specific data
    if (betData.betType === 'race-winner') {
      betData.selectedRiderId = formData.get('selectedRiderId');
    } else if (betData.betType === 'head-to-head') {
      betData.riderOneId = formData.get('riderOneId');
      betData.riderTwoId = formData.get('riderTwoId');
      betData.selectedRiderId = document.querySelector('input[name="rider-pick"]:checked').value === 'rider1' ? 
        formData.get('riderOneId') : formData.get('riderTwoId');
    } else if (betData.betType === 'custom') {
      betData.prediction = formData.get('prediction');
    }
    
    try {
      // Check if user is logged in
      const token = localStorage.getItem('mxracehub-token');
      
      if (!token) {
        // Redirect to login if not logged in
        window.location.href = '/account/login?redirect=' + encodeURIComponent(window.location.pathname);
        return;
      }
      
      // Send data to server
      const response = await fetch('/api/bets/friend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(betData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Clear saved form data
        if (window.friendBetManager) {
          await window.friendBetManager.clearSavedData();
        }
        
        // Reset form
        form.reset();
        
        // Hide summary
        betSummary.classList.add('hidden');
        
        // Show success message
        if (successMessage) {
          successMessage.classList.remove('hidden');
          
          // Hide success message after 5 seconds
          setTimeout(() => {
            successMessage.classList.add('hidden');
          }, 5000);
        }
      } else {
        alert('Error creating friend bet. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error creating friend bet. Please try again.');
    }
  }
});