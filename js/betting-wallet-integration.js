// Betting System with Automatic Wallet Integration
class BettingWalletIntegration {
  constructor() {
    this.currentBalance = 0;
    this.activeBets = [];
    this.isPlacingBet = false;
    
    // Initialize when wallet manager is ready
    if (window.walletManager) {
      this.initializeIntegration();
    } else {
      // Wait for wallet manager to load
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => this.initializeIntegration(), 1000);
      });
    }
  }

  // Initialize betting-wallet integration
  async initializeIntegration() {
    try {
      // Sync with wallet manager
      if (window.walletManager) {
        window.walletManager.addListener((walletData) => {
          if (walletData) {
            this.currentBalance = walletData.balance;
            this.updateBettingInterface();
          }
        });
        
        // Get initial balance
        const walletData = window.walletManager.getWalletData();
        if (walletData) {
          this.currentBalance = walletData.balance;
        }
      }

      // Load user's active bets
      await this.loadUserBets();
      
      // Update betting interface
      this.updateBettingInterface();
      
      // Initialize betting forms
      this.initializeBettingForms();
      
      console.log('🎰 Betting-wallet integration initialized');
    } catch (error) {
      console.error('Error initializing betting integration:', error);
    }
  }

  // Load user's active bets and balance
  async loadUserBets() {
    try {
      const response = await fetch('/api/bets/user', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        this.activeBets = data.bets || [];
        this.currentBalance = data.currentBalance || 0;
        this.canPlaceBets = data.canPlaceBets;
        
        console.log('📊 User bets loaded:', this.activeBets.length, 'Balance:', this.currentBalance);
      }
    } catch (error) {
      console.error('Error loading user bets:', error);
    }
  }

  // Update betting interface with current balance and bet status
  updateBettingInterface() {
    // Update balance displays in betting forms
    const balanceElements = document.querySelectorAll('.betting-balance, #betting-balance, .current-balance');
    balanceElements.forEach(el => {
      el.textContent = `$${this.currentBalance.toFixed(2)}`;
      el.classList.toggle('insufficient-funds', this.currentBalance <= 0);
    });

    // Update bet amount validation
    this.updateBetAmountValidation();
    
    // Update betting buttons state
    this.updateBettingButtons();
    
    // Update active bets display
    this.updateActiveBetsDisplay();
  }

  // Update bet amount input validation
  updateBetAmountValidation() {
    const betAmountInputs = document.querySelectorAll('.bet-amount-input, #bet-amount, input[name="betAmount"]');
    
    betAmountInputs.forEach(input => {
      // Set maximum to current balance
      input.setAttribute('max', this.currentBalance);
      
      // Add real-time validation
      input.addEventListener('input', (e) => {
        const amount = parseFloat(e.target.value) || 0;
        const isValid = amount > 0 && amount <= this.currentBalance;
        
        e.target.classList.toggle('invalid-amount', !isValid);
        
        // Update parent form submit button
        const form = e.target.closest('form');
        if (form) {
          const submitBtn = form.querySelector('button[type="submit"], .place-bet-btn');
          if (submitBtn) {
            submitBtn.disabled = !isValid;
            submitBtn.textContent = !isValid ? 
              (amount > this.currentBalance ? 'Insufficient Funds' : 'Enter Amount') : 
              'Place Bet';
          }
        }
      });
    });
  }

  // Update betting buttons based on balance
  updateBettingButtons() {
    const bettingButtons = document.querySelectorAll('.place-bet-btn, #place-bet-button, button[data-action="place-bet"]');
    
    bettingButtons.forEach(btn => {
      if (this.currentBalance <= 0) {
        btn.disabled = true;
        btn.textContent = 'Add Funds to Bet';
        btn.classList.add('insufficient-funds');
      } else {
        btn.disabled = false;
        btn.textContent = 'Place Bet';
        btn.classList.remove('insufficient-funds');
      }
    });

    // Add fund button links
    const insufficientFundButtons = document.querySelectorAll('.insufficient-funds');
    insufficientFundButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (this.currentBalance <= 0) {
          e.preventDefault();
          window.location.href = '/account/wallet/';
        }
      });
    });
  }

  // Update active bets display
  updateActiveBetsDisplay() {
    const activeBetsContainer = document.querySelector('#active-bets-list, .active-bets');
    if (!activeBetsContainer) return;

    let betsHTML = '';
    
    if (this.activeBets.length === 0) {
      betsHTML = '<p class="no-bets">No active bets. Place a bet to get started!</p>';
    } else {
      this.activeBets.forEach(bet => {
        const betAmount = parseFloat(bet.amount || 0);
        betsHTML += `
          <div class="bet-card active-bet" data-bet-id="${bet.id}">
            <div class="bet-header">
              <div class="bet-type">${this.formatBetType(bet.betType)}</div>
              <div class="bet-status ${bet.status}">${bet.status.toUpperCase()}</div>
            </div>
            <div class="bet-details">
              <div class="bet-amount">$${betAmount.toFixed(2)}</div>
              <div class="bet-info">${this.formatBetDetails(bet.betDetails)}</div>
            </div>
            <div class="bet-footer">
              <div class="bet-date">${new Date(bet.createdAt).toLocaleDateString()}</div>
              ${bet.status === 'active' ? '<button class="cancel-bet-btn" data-bet-id="' + bet.id + '">Cancel</button>' : ''}
            </div>
          </div>
        `;
      });
    }

    activeBetsContainer.innerHTML = betsHTML;
  }

  // Initialize betting forms with wallet integration
  initializeBettingForms() {
    const bettingForms = document.querySelectorAll('.betting-form, #betting-form, form[data-type="bet"]');
    
    bettingForms.forEach(form => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await this.handleBetSubmission(form);
      });
    });

    // Initialize friend betting forms
    const friendBettingForms = document.querySelectorAll('.friend-bet-form, #friend-betting-form');
    friendBettingForms.forEach(form => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await this.handleFriendBetSubmission(form);
      });
    });
  }

  // Handle regular bet submission
  async handleBetSubmission(form) {
    if (this.isPlacingBet) return;

    try {
      this.isPlacingBet = true;
      const formData = new FormData(form);
      
      const betData = {
        raceId: formData.get('raceId') || formData.get('selectedRaceId'),
        groupId: formData.get('groupId') || formData.get('selectedGroupId'),
        betType: formData.get('betType') || formData.get('activeBetType'),
        amount: parseFloat(formData.get('amount') || formData.get('betAmount')),
        betDetails: this.extractBetDetails(formData)
      };

      // Validate bet data
      if (!this.validateBetData(betData)) {
        return;
      }

      // Show loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Placing Bet...';

      // Place the bet
      const response = await fetch('/api/bets', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(betData)
      });

      const result = await response.json();

      if (response.ok) {
        // Update balance
        this.currentBalance = result.newBalance;
        
        // Trigger wallet sync
        if (window.walletManager) {
          await window.walletManager.syncWalletData();
        }

        // Show success message
        this.showBettingMessage('Bet placed successfully!', 'success');
        
        // Reset form
        form.reset();
        
        // Reload bets
        await this.loadUserBets();
        this.updateBettingInterface();
        
      } else {
        throw new Error(result.message || 'Failed to place bet');
      }

    } catch (error) {
      console.error('Error placing bet:', error);
      this.showBettingMessage(error.message, 'error');
    } finally {
      this.isPlacingBet = false;
      
      // Restore button
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Place Bet';
    }
  }

  // Handle friend bet submission
  async handleFriendBetSubmission(form) {
    if (this.isPlacingBet) return;

    try {
      this.isPlacingBet = true;
      const formData = new FormData(form);
      
      const friendBetData = {
        targetId: parseInt(formData.get('targetId') || formData.get('friendId')),
        amount: parseFloat(formData.get('amount') || formData.get('betAmount')),
        betType: formData.get('betType'),
        betDetails: this.extractBetDetails(formData)
      };

      // Validate friend bet data
      if (!this.validateFriendBetData(friendBetData)) {
        return;
      }

      // Place the friend bet
      const response = await fetch('/api/bets/friend', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(friendBetData)
      });

      const result = await response.json();

      if (response.ok) {
        // Update balance
        this.currentBalance = result.newBalance;
        
        // Trigger wallet sync
        if (window.walletManager) {
          await window.walletManager.syncWalletData();
        }

        this.showBettingMessage('Friend bet created! Waiting for your friend to accept.', 'success');
        form.reset();
        
      } else {
        throw new Error(result.message || 'Failed to create friend bet');
      }

    } catch (error) {
      console.error('Error creating friend bet:', error);
      this.showBettingMessage(error.message, 'error');
    } finally {
      this.isPlacingBet = false;
    }
  }

  // Extract bet details from form data
  extractBetDetails(formData) {
    const betType = formData.get('betType') || formData.get('activeBetType');
    const details = {};

    switch (betType) {
      case 'winner':
        details.riderId = formData.get('selectedRider') || formData.get('riderId');
        break;
      case 'podium':
        details.riderId = formData.get('selectedPodiumRider') || formData.get('riderId');
        details.position = formData.get('podiumPosition') || 'yes';
        break;
      case 'head_to_head':
        details.winner = formData.get('h2h_winner') || formData.get('headToHeadWinner');
        details.loser = formData.get('h2h_loser') || formData.get('headToHeadLoser');
        break;
      default:
        // Extract any additional bet details
        for (let [key, value] of formData.entries()) {
          if (key.startsWith('bet_') || key.startsWith('detail_')) {
            details[key.replace(/^(bet_|detail_)/, '')] = value;
          }
        }
    }

    return details;
  }

  // Validate bet data
  validateBetData(betData) {
    if (!betData.amount || betData.amount <= 0) {
      this.showBettingMessage('Please enter a valid bet amount', 'error');
      return false;
    }

    if (betData.amount > this.currentBalance) {
      this.showBettingMessage('Insufficient funds. Please add money to your wallet.', 'error');
      return false;
    }

    if (!betData.raceId) {
      this.showBettingMessage('Please select a race', 'error');
      return false;
    }

    if (!betData.betType) {
      this.showBettingMessage('Please select a bet type', 'error');
      return false;
    }

    return true;
  }

  // Validate friend bet data
  validateFriendBetData(friendBetData) {
    if (!friendBetData.amount || friendBetData.amount <= 0) {
      this.showBettingMessage('Please enter a valid bet amount', 'error');
      return false;
    }

    if (friendBetData.amount > this.currentBalance) {
      this.showBettingMessage('Insufficient funds. Please add money to your wallet.', 'error');
      return false;
    }

    if (!friendBetData.targetId) {
      this.showBettingMessage('Please select a friend to bet with', 'error');
      return false;
    }

    return true;
  }

  // Format bet type for display
  formatBetType(betType) {
    const types = {
      'winner': 'Race Winner',
      'podium': 'Podium Finish',
      'head_to_head': 'Head to Head',
      'friend': 'Friend Bet'
    };
    return types[betType] || betType;
  }

  // Format bet details for display
  formatBetDetails(betDetails) {
    if (!betDetails) return '';
    
    if (betDetails.riderId) {
      return `Rider #${betDetails.riderId}`;
    }
    
    if (betDetails.winner && betDetails.loser) {
      return `#${betDetails.winner} vs #${betDetails.loser}`;
    }
    
    return JSON.stringify(betDetails);
  }

  // Show betting message to user
  showBettingMessage(message, type = 'info') {
    // Create or update message element
    let messageEl = document.querySelector('.betting-message');
    if (!messageEl) {
      messageEl = document.createElement('div');
      messageEl.className = 'betting-message';
      
      // Insert at top of betting form or page
      const bettingContainer = document.querySelector('.betting-container, .betting-form, #betting-content') || document.body;
      bettingContainer.insertBefore(messageEl, bettingContainer.firstChild);
    }
    
    messageEl.className = `betting-message ${type}`;
    messageEl.textContent = message;
    messageEl.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      messageEl.style.display = 'none';
    }, 5000);
  }

  // Get current balance
  getCurrentBalance() {
    return this.currentBalance;
  }

  // Check if user can place bet
  canPlaceBet(amount) {
    return this.currentBalance >= amount && amount > 0;
  }
}

// Initialize global betting integration
window.bettingWallet = new BettingWalletIntegration();

// Auto-initialize betting functionality on pages
document.addEventListener('DOMContentLoaded', () => {
  // Add balance display to existing betting forms
  const bettingForms = document.querySelectorAll('.betting-form, #betting-form');
  bettingForms.forEach(form => {
    if (!form.querySelector('.betting-balance')) {
      const balanceDiv = document.createElement('div');
      balanceDiv.className = 'betting-balance-display';
      balanceDiv.innerHTML = `
        <div class="current-balance">
          Balance: <span class="betting-balance">$0.00</span>
        </div>
      `;
      form.insertBefore(balanceDiv, form.firstChild);
    }
  });

  console.log('🎰 Betting-wallet integration loaded');
});