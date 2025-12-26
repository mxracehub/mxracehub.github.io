/**
 * Betting Form Auto-Save Functionality
 * Handles saving and loading form data from the user's account
 */

let autoSaveTimeout = null;
const AUTO_SAVE_DELAY = 2000; // 2 seconds

// Always use the dynamic API
const isStaticSite = false;

/**
 * Initialize auto-save functionality for a form
 * @param {string} formType - Type of form (e.g., 'friend-bet', 'group-bet')
 * @param {HTMLFormElement} form - The form element to auto-save
 * @param {Object} options - Additional options
 * @param {Function} options.beforeSave - Function to run before saving (can transform data)
 * @param {Function} options.afterLoad - Function to run after loading data
 */
function initAutoSave(formType, form, options = {}) {
  if (!form) {
    console.error(`Form for ${formType} not found.`);
    return;
  }

  const saveButton = document.createElement('button');
  saveButton.type = 'button';
  saveButton.className = 'save-form-btn btn btn-sm btn-secondary mt-3';
  saveButton.innerHTML = '<i class="fas fa-save mr-1"></i> Save Form';
  saveButton.addEventListener('click', () => saveFormData(formType, form, options.beforeSave));
  
  const resetButton = document.createElement('button');
  resetButton.type = 'button';
  resetButton.className = 'reset-form-btn btn btn-sm btn-danger mt-3 ml-2';
  resetButton.innerHTML = '<i class="fas fa-trash-alt mr-1"></i> Reset Form';
  resetButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset this form? All unsaved changes will be lost.')) {
      form.reset();
      scheduleAutoSave(formType, form, options.beforeSave);
    }
  });
  
  const saveStatusSpan = document.createElement('span');
  saveStatusSpan.className = 'save-status ml-2 text-muted';
  saveStatusSpan.id = `${formType}-save-status`;
  
  // Find a good place to add the buttons
  const submitBtn = form.querySelector('button[type="submit"]');
  if (submitBtn && submitBtn.parentNode) {
    submitBtn.parentNode.appendChild(saveButton);
    submitBtn.parentNode.appendChild(resetButton);
    submitBtn.parentNode.appendChild(saveStatusSpan);
  } else {
    form.appendChild(saveButton);
    form.appendChild(resetButton);
    form.appendChild(saveStatusSpan);
  }
  
  // Add event listeners to form fields for auto-save
  const formElements = form.querySelectorAll('input, select, textarea');
  formElements.forEach(element => {
    element.addEventListener('change', () => scheduleAutoSave(formType, form, options.beforeSave));
    element.addEventListener('keyup', () => scheduleAutoSave(formType, form, options.beforeSave));
  });
  
  // Load saved form data when page loads
  loadFormData(formType, form, options.afterLoad);
}

/**
 * Schedule auto-save after a delay
 */
function scheduleAutoSave(formType, form, beforeSaveFn) {
  if (autoSaveTimeout) {
    clearTimeout(autoSaveTimeout);
  }
  
  autoSaveTimeout = setTimeout(() => {
    saveFormData(formType, form, beforeSaveFn, true);
  }, AUTO_SAVE_DELAY);
}

/**
 * Save form data to the server
 */
async function saveFormData(formType, form, beforeSaveFn, isAutoSave = false) {
  // Make sure the user is logged in
  if (!isUserLoggedIn()) {
    updateSaveStatus(formType, 'Please log in to save forms', 'text-warning');
    return;
  }
  
  // Get auth token
  const token = localStorage.getItem('mxracehub-token');
  if (!token) {
    updateSaveStatus(formType, 'Authentication required', 'text-warning');
    return;
  }
  
  // Collect form data
  const formData = new FormData(form);
  let data = {};
  
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }
  
  // For radio buttons, find the selected value
  const radioGroups = {};
  form.querySelectorAll('input[type="radio"]:checked').forEach(radio => {
    data[radio.name] = radio.value;
  });
  
  // Allow customization of data before saving
  if (typeof beforeSaveFn === 'function') {
    data = beforeSaveFn(data);
  }
  
  try {
    updateSaveStatus(formType, 'Saving...', 'text-info');
    
    const response = await fetch('/api/bets/saved-forms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      body: JSON.stringify({
        formType: formType,
        formData: JSON.stringify(data)
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to save form');
    }
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || 'Failed to save form');
    }
    
    updateSaveStatus(
      formType, 
      isAutoSave ? 'Auto-saved' : 'Saved successfully', 
      'text-success'
    );
    
    // Clear status after 3 seconds
    setTimeout(() => {
      updateSaveStatus(formType, '', '');
    }, 3000);
    
  } catch (error) {
    console.error('Error saving form:', error);
    updateSaveStatus(formType, 'Error saving form', 'text-danger');
  }
}

/**
 * Load saved form data from the server
 */
async function loadFormData(formType, form, afterLoadFn) {
  // Make sure the user is logged in
  if (!isUserLoggedIn()) {
    return;
  }
  
  try {
    updateSaveStatus(formType, 'Loading saved data...', 'text-info');
    
    // Get auth token
    const token = localStorage.getItem('mxracehub-token');
    if (!token) {
      updateSaveStatus(formType, '', '');
      return;
    }
    
    const response = await fetch('/api/bets/saved-forms', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to load saved forms');
    }
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || 'Failed to load saved forms');
    }
    
    // Find the form data for this form type
    const savedForm = result.data.find(form => form.form_type === formType);
    
    if (savedForm) {
      const formData = JSON.parse(savedForm.form_data);
      
      // Set form field values
      Object.keys(formData).forEach(key => {
        const input = form.querySelector(`[name="${key}"]`);
        if (input) {
          // Handle different input types
          if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = formData[key] === true || formData[key] === 'true' || formData[key] === input.value;
          } else {
            input.value = formData[key];
          }
        } else {
          // Try to find radio buttons or checkbox groups
          const radioButtons = form.querySelectorAll(`input[type="radio"][name="${key}"]`);
          if (radioButtons.length > 0) {
            radioButtons.forEach(radio => {
              radio.checked = radio.value === formData[key];
            });
          }
        }
      });
      
      // Allow for custom processing after loading
      if (typeof afterLoadFn === 'function') {
        afterLoadFn(formData);
      }
      
      updateSaveStatus(formType, 'Loaded saved form', 'text-success');
      
      // Clear status after 3 seconds
      setTimeout(() => {
        updateSaveStatus(formType, '', '');
      }, 3000);
    } else {
      updateSaveStatus(formType, '', '');
    }
    
  } catch (error) {
    console.error('Error loading saved forms:', error);
    updateSaveStatus(formType, '', '');
  }
}

/**
 * Update save status message
 */
function updateSaveStatus(formType, message, className) {
  const statusElement = document.getElementById(`${formType}-save-status`);
  if (statusElement) {
    statusElement.textContent = message;
    statusElement.className = `save-status ml-2 ${className}`;
  }
}

/**
 * Check if the user is logged in
 */
function isUserLoggedIn() {
  // For static site, always return false to show appropriate messages
  if (isStaticSite) {
    return false;
  }
  
  // Check for authentication token in local storage
  const token = localStorage.getItem('mxracehub-token');
  return !!token;
}

/**
 * Clear saved form data
 * @param {string} formType - Type of form to clear
 */
async function clearSavedData(formType) {
  // Get auth token
  const token = localStorage.getItem('mxracehub-token');
  if (!token) {
    return;
  }
  
  try {
    const response = await fetch(`/api/bets/saved-forms/${formType}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to clear form data');
    }
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || 'Failed to clear form data');
    }
    
    // Success - form data cleared
    return true;
  } catch (error) {
    console.error('Error clearing form data:', error);
    return false;
  }
}

// Create managers for different form types
class BetFormManager {
  constructor(formType, form, options = {}) {
    this.formType = formType;
    this.form = form;
    this.options = options;
  }
  
  handleFormChange() {
    scheduleAutoSave(this.formType, this.form, this.options.beforeSave);
  }
  
  async clearSavedData() {
    return clearSavedData(this.formType);
  }
}

// Export functions for use in other scripts
window.initBetFormAutoSave = function(formType, form, options = {}) {
  // For static site, add a demo notice instead of initializing autosave
  if (isStaticSite) {
    const demoNotice = document.createElement('div');
    demoNotice.className = 'static-site-notice p-3 mb-4 bg-warning-100 text-warning-800 rounded';
    demoNotice.innerHTML = `
      <strong>Demo Mode:</strong> Form saving is not available in this static demo.
      <span class="block mt-1 text-sm">Visit the full version for complete functionality.</span>
    `;
    
    // Find a good place to add the notice
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn && submitBtn.parentNode) {
      submitBtn.parentNode.insertBefore(demoNotice, submitBtn);
    } else {
      form.insertBefore(demoNotice, form.firstChild);
    }
    
    // Create manager with limited functionality
    window[`${formType.replace(/-/g, '')}Manager`] = new BetFormManager(formType, form, options);
    return window[`${formType.replace(/-/g, '')}Manager`];
  }
  
  // Normal initialization for non-static site
  initAutoSave(formType, form, options);
  
  // Create and expose form manager
  window[`${formType.replace(/-/g, '')}Manager`] = new BetFormManager(formType, form, options);
  
  return window[`${formType.replace(/-/g, '')}Manager`];
};