/**
 * Group Betting Functionality
 * Handles creating group bets, option management, and form validation
 */

document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const form = document.getElementById('group-bet-form');
  const optionsList = document.getElementById('options-list');
  const addOptionBtn = document.getElementById('add-option');
  const previewBtn = document.getElementById('preview-group-bet');
  const successMessage = document.getElementById('success-message');
  
  // Only initialize if we're on the group bet page
  if (!form) return;
  
  // Initialize auto-save functionality if available
  if (window.initBetFormAutoSave) {
    window.initBetFormAutoSave('group-bet', form, {
      // Process data before saving
      beforeSave: (data) => {
        // Get all betting options from the DOM
        const options = [];
        const optionElements = optionsList.querySelectorAll('.bet-option');
        
        optionElements.forEach((element, index) => {
          const optionText = element.querySelector('.option-text').value;
          const optionOdds = element.querySelector('.option-odds').value;
          
          if (optionText) {
            options.push({
              index,
              text: optionText,
              odds: optionOdds || '1.0'
            });
          }
        });
        
        // Add options to the data object
        data.options = options;
        return data;
      },
      // Process data after loading
      afterLoad: (data) => {
        // If we have saved options, recreate them in the UI
        if (data.options && Array.isArray(data.options)) {
          // Clear existing options first (except the first one)
          const existingOptions = optionsList.querySelectorAll('.bet-option');
          for (let i = 1; i < existingOptions.length; i++) {
            existingOptions[i].remove();
          }
          
          // Set the first option
          if (data.options.length > 0 && existingOptions.length > 0) {
            const firstOption = existingOptions[0];
            firstOption.querySelector('.option-text').value = data.options[0].text || '';
            firstOption.querySelector('.option-odds').value = data.options[0].odds || '1.0';
          }
          
          // Add additional options
          for (let i = 1; i < data.options.length; i++) {
            addNewOption();
            const options = optionsList.querySelectorAll('.bet-option');
            const currentOption = options[options.length - 1];
            
            currentOption.querySelector('.option-text').value = data.options[i].text || '';
            currentOption.querySelector('.option-odds').value = data.options[i].odds || '1.0';
          }
          
          // Set up remove buttons again
          setupRemoveOptionButtons();
        }
      }
    });
  }
  
  // Set up event listeners
  if (addOptionBtn) {
    addOptionBtn.addEventListener('click', addNewOption);
  }
  
  // Set up remove option buttons
  setupRemoveOptionButtons();
  
  // Handle form submission
  if (form) {
    form.addEventListener('submit', handleSubmit);
  }
  
  /**
   * Add a new betting option
   */
  function addNewOption() {
    // Get current options count
    const options = optionsList.querySelectorAll('.option-item');
    const newIndex = options.length;
    
    // Create new option HTML
    const optionHtml = `
      <div class="mb-3 p-3 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded option-item">
        <div class="flex items-center mb-2">
          <span class="font-medium">Option ${newIndex + 1}</span>
          <button type="button" class="ml-auto text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 remove-option">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <input type="text" name="options[${newIndex}][title]" placeholder="Option title" class="w-full mb-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded px-3 py-1.5 option-title">
        <input type="text" name="options[${newIndex}][description]" placeholder="Option description (optional)" class="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded px-3 py-1.5 option-description">
      </div>
    `;
    
    // Add the new option to the list
    optionsList.insertAdjacentHTML('beforeend', optionHtml);
    
    // Setup event listener for the new remove button
    setupRemoveOptionButtons();
    
    // Trigger form change event for autosave
    if (window.groupBetManager) {
      window.groupBetManager.handleFormChange();
    }
  }
  
  /**
   * Setup remove option buttons
   */
  function setupRemoveOptionButtons() {
    const removeButtons = document.querySelectorAll('.remove-option');
    
    removeButtons.forEach(button => {
      // Remove existing listener first to prevent duplicates
      button.removeEventListener('click', handleRemoveOption);
      // Add listener
      button.addEventListener('click', handleRemoveOption);
    });
  }
  
  /**
   * Handle remove option button click
   */
  function handleRemoveOption(event) {
    const optionItem = event.currentTarget.closest('.option-item');
    const options = optionsList.querySelectorAll('.option-item');
    
    // Don't allow removing if only 2 options are left
    if (options.length <= 2) {
      alert('A group bet must have at least two options.');
      return;
    }
    
    // Remove the option
    optionItem.remove();
    
    // Renumber remaining options
    const remainingOptions = optionsList.querySelectorAll('.option-item');
    remainingOptions.forEach((option, index) => {
      // Update option label
      option.querySelector('.font-medium').textContent = `Option ${index + 1}`;
      
      // Update input names
      const titleInput = option.querySelector('.option-title');
      const descInput = option.querySelector('.option-description');
      
      titleInput.name = `options[${index}][title]`;
      descInput.name = `options[${index}][description]`;
    });
    
    // Trigger form change event for autosave
    if (window.groupBetManager) {
      window.groupBetManager.handleFormChange();
    }
  }
  
  /**
   * Validate form inputs
   */
  function validateForm() {
    // Required fields
    const groupSelect = document.getElementById('group-select');
    const eventSelect = document.getElementById('event-select');
    const betTitle = document.getElementById('bet-title');
    const deadlineDate = document.getElementById('deadline-date');
    const options = optionsList.querySelectorAll('.option-item');
    
    let isValid = true;
    let errorMessage = '';
    
    // Check required fields
    if (!groupSelect.value) {
      isValid = false;
      errorMessage += 'Please select a group.\n';
    }
    
    if (!eventSelect.value) {
      isValid = false;
      errorMessage += 'Please select an event.\n';
    }
    
    if (!betTitle.value) {
      isValid = false;
      errorMessage += 'Please enter a bet title.\n';
    }
    
    if (!deadlineDate.value) {
      isValid = false;
      errorMessage += 'Please set an entry deadline.\n';
    }
    
    // Check that all options have titles
    options.forEach((option, index) => {
      const titleInput = option.querySelector('.option-title');
      
      if (!titleInput.value) {
        isValid = false;
        errorMessage += `Please enter a title for Option ${index + 1}.\n`;
      }
    });
    
    // Show error messages if any
    if (!isValid) {
      alert('Please fix the following errors:\n\n' + errorMessage);
    }
    
    return isValid;
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
      groupId: formData.get('groupId'),
      eventId: formData.get('eventId'),
      title: formData.get('title'),
      description: formData.get('description'),
      deadlineDate: formData.get('deadlineDate'),
      options: []
    };
    
    // Get all options
    const options = optionsList.querySelectorAll('.option-item');
    options.forEach((option, index) => {
      const titleInput = option.querySelector('.option-title');
      const descInput = option.querySelector('.option-description');
      
      betData.options.push({
        title: titleInput.value,
        description: descInput.value
      });
    });
    
    try {
      // Check if user is logged in
      const token = localStorage.getItem('mxracehub-token');
      
      if (!token) {
        // Redirect to login if not logged in
        window.location.href = '/account/login?redirect=' + encodeURIComponent(window.location.pathname);
        return;
      }
      
      // Send data to server
      const response = await fetch('/api/bets/group', {
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
        if (window.groupBetManager) {
          await window.groupBetManager.clearSavedData();
        }
        
        // Reset form
        form.reset();
        
        // Show success message
        if (successMessage) {
          successMessage.classList.remove('hidden');
          
          // Hide success message after 5 seconds
          setTimeout(() => {
            successMessage.classList.add('hidden');
          }, 5000);
        }
      } else {
        alert('Error creating group bet. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error creating group bet. Please try again.');
    }
  }
});