// Comprehensive Wallet Manager - Auto-sync with Account Login
class WalletManager {
  constructor() {
    this.walletData = null;
    this.isLoading = false;
    this.listeners = new Set();
    
    // Auto-sync wallet when account data changes
    if (window.accountSync) {
      window.accountSync.addSyncListener((userData) => {
        if (userData) {
          this.syncWalletData();
        }
      });
    }
    
    // Initialize wallet data
    this.syncWalletData();
  }

  // Main wallet sync function
  async syncWalletData() {
    if (this.isLoading) return;
    
    try {
      this.isLoading = true;
      
      const response = await fetch('/api/wallet', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        this.walletData = await response.json();
        this.notifyListeners();
        this.updateWalletDisplay();
        console.log('💰 Wallet data synced:', this.walletData.balance);
        return this.walletData;
      } else if (response.status === 401) {
        this.walletData = null;
        this.notifyListeners();
        return null;
      }
    } catch (error) {
      console.error('Wallet sync error:', error);
      return null;
    } finally {
      this.isLoading = false;
    }
  }

  // Update all wallet displays on the page
  updateWalletDisplay() {
    if (!this.walletData) return;

    // Update balance displays
    this.updateBalanceDisplays();
    
    // Update payment methods
    this.updatePaymentMethods();
    
    // Update transaction history
    this.updateTransactionHistory();
    
    // Update withdrawal options
    this.updateWithdrawalOptions();
  }

  // Update balance displays throughout the site
  updateBalanceDisplays() {
    const balanceElements = document.querySelectorAll('[data-wallet-balance]');
    const formattedBalance = `$${this.walletData.balance.toFixed(2)}`;
    
    balanceElements.forEach(el => {
      el.textContent = formattedBalance;
      el.classList.add('wallet-balance-updated');
    });

    // Update balance in betting forms
    const bettingBalances = document.querySelectorAll('.betting-balance, #account-balance-display');
    bettingBalances.forEach(el => {
      el.textContent = formattedBalance;
    });
  }

  // Update payment methods section
  updatePaymentMethods() {
    const paymentMethodsContainer = document.querySelector('#payment-methods-list');
    if (!paymentMethodsContainer) return;

    let methodsHTML = '';

    // Credit/Debit Cards
    if (this.walletData.paymentMethods) {
      this.walletData.paymentMethods.forEach(method => {
        methodsHTML += `
          <div class="payment-method-item" data-method-id="${method.id}">
            <div class="method-info">
              <div class="method-type">${this.getPaymentMethodIcon(method.type)} ${method.displayName}</div>
              <div class="method-details">**** ${method.lastFour || '****'}</div>
              ${method.expiresAt ? `<div class="method-expiry">Expires: ${new Date(method.expiresAt).toLocaleDateString()}</div>` : ''}
            </div>
            <div class="method-actions">
              ${method.isDefault ? '<span class="default-badge">Default</span>' : ''}
              <button class="remove-method-btn" data-method-id="${method.id}">Remove</button>
            </div>
          </div>
        `;
      });
    }

    // Bank Accounts
    if (this.walletData.bankAccounts && this.walletData.bankAccounts.length > 0) {
      methodsHTML += '<h4>Bank Accounts</h4>';
      this.walletData.bankAccounts.forEach(account => {
        methodsHTML += `
          <div class="payment-method-item bank-account" data-account-id="${account.id}">
            <div class="method-info">
              <div class="method-type">🏦 ${account.bankName || 'Bank Account'}</div>
              <div class="method-details">${account.accountType} ${account.accountNumber}</div>
              ${account.isVerified ? '<span class="verified-badge">✅ Verified</span>' : '<span class="unverified-badge">⏳ Pending</span>'}
            </div>
            <div class="method-actions">
              ${account.isDefault ? '<span class="default-badge">Default</span>' : ''}
              <button class="remove-method-btn" data-account-id="${account.id}">Remove</button>
            </div>
          </div>
        `;
      });
    }

    // Crypto Wallets
    if (this.walletData.cryptoWallets && this.walletData.cryptoWallets.length > 0) {
      methodsHTML += '<h4>Crypto Wallets</h4>';
      this.walletData.cryptoWallets.forEach(wallet => {
        methodsHTML += `
          <div class="payment-method-item crypto-wallet" data-wallet-id="${wallet.id}">
            <div class="method-info">
              <div class="method-type">${this.getCryptoIcon(wallet.cryptocurrency)} ${wallet.walletName}</div>
              <div class="method-details">${wallet.walletAddress.substring(0, 10)}...${wallet.walletAddress.slice(-6)}</div>
              <div class="crypto-network">${wallet.network || 'mainnet'}</div>
            </div>
            <div class="method-actions">
              ${wallet.isDefault ? '<span class="default-badge">Default</span>' : ''}
              <button class="remove-method-btn" data-wallet-id="${wallet.id}">Remove</button>
            </div>
          </div>
        `;
      });
    }

    if (methodsHTML === '') {
      methodsHTML = '<p class="no-methods">No payment methods added yet.</p>';
    }

    paymentMethodsContainer.innerHTML = methodsHTML;
  }

  // Update transaction history
  updateTransactionHistory() {
    const transactionContainer = document.querySelector('#transaction-history');
    if (!transactionContainer || !this.walletData.recentTransactions) return;

    let transactionsHTML = '';
    
    this.walletData.recentTransactions.forEach(transaction => {
      const isDeposit = transaction.transactionType === 'deposit';
      const statusClass = transaction.status === 'completed' ? 'status-completed' : 
                         transaction.status === 'pending' ? 'status-pending' : 'status-failed';
      
      transactionsHTML += `
        <div class="transaction-item ${statusClass}">
          <div class="transaction-icon">
            ${isDeposit ? '💰' : '📤'}
          </div>
          <div class="transaction-details">
            <div class="transaction-type">${isDeposit ? 'Deposit' : 'Withdrawal'}</div>
            <div class="transaction-method">${this.formatTransactionMethod(transaction.method)}</div>
            <div class="transaction-date">${new Date(transaction.createdAt).toLocaleDateString()}</div>
          </div>
          <div class="transaction-amount ${isDeposit ? 'amount-positive' : 'amount-negative'}">
            ${isDeposit ? '+' : '-'}$${parseFloat(transaction.amount).toFixed(2)}
          </div>
          <div class="transaction-status ${statusClass}">
            ${this.formatTransactionStatus(transaction.status)}
          </div>
        </div>
      `;
    });

    if (transactionsHTML === '') {
      transactionsHTML = '<p class="no-transactions">No recent transactions.</p>';
    }

    transactionContainer.innerHTML = transactionsHTML;
  }

  // Update withdrawal options based on available methods
  updateWithdrawalOptions() {
    const withdrawalContainer = document.querySelector('#withdrawal-options');
    if (!withdrawalContainer) return;

    let optionsHTML = '';

    // Bank withdrawal options
    if (this.walletData.bankAccounts && this.walletData.bankAccounts.length > 0) {
      optionsHTML += `
        <div class="withdrawal-option" data-method="bank_transfer">
          <div class="option-icon">🏦</div>
          <div class="option-details">
            <h4>Bank Transfer</h4>
            <p>Transfer to your linked bank account</p>
            <p class="option-fee">Fee: $2.50 • Takes 1-3 business days</p>
          </div>
          <button class="select-withdrawal-btn" data-method="bank_transfer">Select</button>
        </div>
      `;
    }

    // Crypto withdrawal options
    if (this.walletData.cryptoWallets && this.walletData.cryptoWallets.length > 0) {
      optionsHTML += `
        <div class="withdrawal-option" data-method="crypto">
          <div class="option-icon">₿</div>
          <div class="option-details">
            <h4>Cryptocurrency</h4>
            <p>Withdraw to your crypto wallet</p>
            <p class="option-fee">Fee: 1% (max $25) • Usually instant</p>
          </div>
          <button class="select-withdrawal-btn" data-method="crypto">Select</button>
        </div>
      `;
    }

    if (optionsHTML === '') {
      optionsHTML = `
        <div class="no-withdrawal-options">
          <p>Add a bank account or crypto wallet to enable withdrawals.</p>
          <button class="add-payment-method-btn">Add Payment Method</button>
        </div>
      `;
    }

    withdrawalContainer.innerHTML = optionsHTML;
  }

  // Add funds to account
  async addFunds(method, amount, paymentDetails) {
    try {
      this.isLoading = true;
      
      const response = await fetch('/api/wallet/add-funds', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          method,
          amount: parseFloat(amount),
          paymentDetails
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        // Refresh wallet data
        await this.syncWalletData();
        
        // Trigger account sync to update balance everywhere
        if (window.accountSync) {
          await window.accountSync.forcSync();
        }
        
        return { success: true, ...result };
      } else {
        throw new Error(result.message || 'Failed to add funds');
      }
    } catch (error) {
      console.error('Error adding funds:', error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  // Withdraw funds
  async withdrawFunds(method, amount, destinationDetails) {
    try {
      this.isLoading = true;
      
      const response = await fetch('/api/wallet/withdraw', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          method,
          amount: parseFloat(amount),
          destinationDetails
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        // Refresh wallet data
        await this.syncWalletData();
        
        // Trigger account sync to update balance everywhere
        if (window.accountSync) {
          await window.accountSync.forcSync();
        }
        
        return { success: true, ...result };
      } else {
        throw new Error(result.message || 'Failed to withdraw funds');
      }
    } catch (error) {
      console.error('Error withdrawing funds:', error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  // Add bank account
  async addBankAccount(accountDetails) {
    try {
      const response = await fetch('/api/wallet/bank-accounts', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(accountDetails)
      });

      const result = await response.json();
      
      if (response.ok) {
        await this.syncWalletData();
        return { success: true, bankAccount: result };
      } else {
        throw new Error(result.message || 'Failed to add bank account');
      }
    } catch (error) {
      console.error('Error adding bank account:', error);
      throw error;
    }
  }

  // Add crypto wallet
  async addCryptoWallet(walletDetails) {
    try {
      const response = await fetch('/api/wallet/crypto-wallets', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(walletDetails)
      });

      const result = await response.json();
      
      if (response.ok) {
        await this.syncWalletData();
        return { success: true, cryptoWallet: result };
      } else {
        throw new Error(result.message || 'Failed to add crypto wallet');
      }
    } catch (error) {
      console.error('Error adding crypto wallet:', error);
      throw error;
    }
  }

  // Helper methods for display formatting
  getPaymentMethodIcon(type) {
    const icons = {
      card: '💳',
      bank: '🏦',
      crypto: '₿',
      paypal: '🅿️'
    };
    return icons[type] || '💳';
  }

  getCryptoIcon(crypto) {
    const icons = {
      BTC: '₿',
      ETH: 'Ξ',
      USDC: '💎',
      USDT: '💎'
    };
    return icons[crypto] || '🪙';
  }

  formatTransactionMethod(method) {
    const methods = {
      stripe_card: 'Credit Card',
      bank_transfer: 'Bank Transfer',
      crypto: 'Cryptocurrency',
      paypal: 'PayPal'
    };
    return methods[method] || method;
  }

  formatTransactionStatus(status) {
    const statuses = {
      completed: 'Completed',
      pending: 'Pending',
      failed: 'Failed',
      cancelled: 'Cancelled'
    };
    return statuses[status] || status;
  }

  // Listener management
  addListener(callback) {
    this.listeners.add(callback);
  }

  removeListener(callback) {
    this.listeners.delete(callback);
  }

  notifyListeners() {
    this.listeners.forEach(callback => {
      try {
        callback(this.walletData);
      } catch (error) {
        console.error('Wallet listener error:', error);
      }
    });
  }

  // Get current wallet data
  getWalletData() {
    return this.walletData;
  }

  // Get current balance
  getBalance() {
    return this.walletData?.balance || 0;
  }

  // Check if user can withdraw
  canWithdraw() {
    return this.walletData?.canWithdraw || false;
  }
}

// Initialize global wallet manager
window.walletManager = new WalletManager();

// Auto-initialize wallet functionality on pages
document.addEventListener('DOMContentLoaded', () => {
  // Initialize funding forms
  initializeFundingForms();
  
  // Initialize withdrawal forms
  initializeWithdrawalForms();
  
  // Initialize payment method management
  initializePaymentMethodForms();
  
  console.log('💰 Wallet manager initialized');
});

// Initialize funding forms
function initializeFundingForms() {
  const fundingForms = document.querySelectorAll('.add-funds-form');
  
  fundingForms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const method = formData.get('method');
      const amount = formData.get('amount');
      
      try {
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processing...';
        
        let paymentDetails = {};
        
        // Collect payment details based on method
        if (method === 'stripe_card') {
          paymentDetails = {
            paymentMethodId: formData.get('paymentMethodId'),
            returnUrl: window.location.origin + '/account/wallet/'
          };
        } else if (method === 'bank_transfer') {
          paymentDetails = {
            bankAccountId: formData.get('bankAccountId')
          };
        } else if (method === 'crypto') {
          paymentDetails = {
            cryptocurrency: formData.get('cryptocurrency')
          };
        }
        
        const result = await window.walletManager.addFunds(method, amount, paymentDetails);
        
        // Show success message
        showSuccessMessage('Funds added successfully!');
        
        // Reset form
        form.reset();
        
      } catch (error) {
        showErrorMessage(error.message);
      } finally {
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Add Funds';
      }
    });
  });
}

// Initialize withdrawal forms
function initializeWithdrawalForms() {
  const withdrawalForms = document.querySelectorAll('.withdraw-funds-form');
  
  withdrawalForms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const method = formData.get('method');
      const amount = formData.get('amount');
      
      try {
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processing...';
        
        let destinationDetails = {};
        
        if (method === 'bank_transfer') {
          destinationDetails = {
            bankAccountId: formData.get('bankAccountId')
          };
        } else if (method === 'crypto') {
          destinationDetails = {
            walletId: formData.get('walletId')
          };
        }
        
        const result = await window.walletManager.withdrawFunds(method, amount, destinationDetails);
        
        showSuccessMessage(`Withdrawal initiated! ${result.fees > 0 ? `Fee: $${result.fees.toFixed(2)}` : ''}`);
        form.reset();
        
      } catch (error) {
        showErrorMessage(error.message);
      } finally {
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Withdraw';
      }
    });
  });
}

// Initialize payment method forms
function initializePaymentMethodForms() {
  // Bank account form
  const bankAccountForm = document.querySelector('#add-bank-account-form');
  if (bankAccountForm) {
    bankAccountForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(bankAccountForm);
      
      try {
        const accountDetails = {
          accountHolderName: formData.get('accountHolderName'),
          accountNumber: formData.get('accountNumber'),
          routingNumber: formData.get('routingNumber'),
          accountType: formData.get('accountType'),
          bankName: formData.get('bankName'),
          isDefault: formData.get('isDefault') === 'on'
        };
        
        await window.walletManager.addBankAccount(accountDetails);
        showSuccessMessage('Bank account added successfully!');
        bankAccountForm.reset();
        
      } catch (error) {
        showErrorMessage(error.message);
      }
    });
  }
  
  // Crypto wallet form
  const cryptoWalletForm = document.querySelector('#add-crypto-wallet-form');
  if (cryptoWalletForm) {
    cryptoWalletForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(cryptoWalletForm);
      
      try {
        const walletDetails = {
          walletName: formData.get('walletName'),
          walletAddress: formData.get('walletAddress'),
          cryptocurrency: formData.get('cryptocurrency'),
          network: formData.get('network'),
          isDefault: formData.get('isDefault') === 'on'
        };
        
        await window.walletManager.addCryptoWallet(walletDetails);
        showSuccessMessage('Crypto wallet added successfully!');
        cryptoWalletForm.reset();
        
      } catch (error) {
        showErrorMessage(error.message);
      }
    });
  }
}

// Utility functions for user feedback
function showSuccessMessage(message) {
  // Create or update success message element
  let messageEl = document.querySelector('.wallet-success-message');
  if (!messageEl) {
    messageEl = document.createElement('div');
    messageEl.className = 'wallet-success-message';
    document.body.appendChild(messageEl);
  }
  
  messageEl.textContent = message;
  messageEl.style.display = 'block';
  
  setTimeout(() => {
    messageEl.style.display = 'none';
  }, 5000);
}

function showErrorMessage(message) {
  // Create or update error message element
  let messageEl = document.querySelector('.wallet-error-message');
  if (!messageEl) {
    messageEl = document.createElement('div');
    messageEl.className = 'wallet-error-message';
    document.body.appendChild(messageEl);
  }
  
  messageEl.textContent = message;
  messageEl.style.display = 'block';
  
  setTimeout(() => {
    messageEl.style.display = 'none';
  }, 5000);
}