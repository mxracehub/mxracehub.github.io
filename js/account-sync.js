// Account & Profile Sync Manager - Unified User Data Across All Pages
class AccountSyncManager {
  constructor() {
    this.userData = null;
    this.lastSync = null;
    this.syncInterval = null;
    this.listeners = new Set();
    
    // Auto-sync every 30 seconds when user is active
    this.startAutoSync();
    
    // Sync immediately on page load
    this.syncUserData();
  }

  // Main sync function - gets complete user profile with membership details
  async syncUserData() {
    try {
      const response = await fetch('/api/user/profile', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        this.userData = await response.json();
        this.lastSync = new Date();
        
        // Notify all listeners about the update
        this.notifyListeners();
        
        // Update all account pages automatically
        this.updateAccountPages();
        
        console.log('✅ Account data synced:', this.userData.username);
        return this.userData;
      } else if (response.status === 401) {
        // User not logged in
        this.userData = null;
        this.notifyListeners();
        this.handleLoggedOut();
        return null;
      }
    } catch (error) {
      console.error('Account sync error:', error);
      return null;
    }
  }

  // Update all account-related page elements
  updateAccountPages() {
    if (!this.userData) return;

    // Update membership status across all pages
    this.updateMembershipDisplay();
    
    // Update friend groups display
    this.updateFriendGroupsDisplay();
    
    // Update user profile info
    this.updateProfileDisplay();
    
    // Update account balance and stats
    this.updateAccountStats();
  }

  // Update membership status display
  updateMembershipDisplay() {
    const membershipElements = document.querySelectorAll('[data-membership-type]');
    const membershipStatus = document.querySelectorAll('[data-membership-status]');
    const membershipExpiry = document.querySelectorAll('[data-membership-expiry]');

    membershipElements.forEach(el => {
      el.textContent = this.formatMembershipType(this.userData.membershipDetails.type);
      el.className = `membership-badge ${this.userData.membershipDetails.type}`;
    });

    membershipStatus.forEach(el => {
      if (this.userData.membershipDetails.isActive) {
        el.textContent = this.userData.membershipDetails.isFree ? 'Active (Free via Friends)' : 'Active';
        el.className = 'status-active';
      } else {
        el.textContent = 'Inactive';
        el.className = 'status-inactive';
      }
    });

    membershipExpiry.forEach(el => {
      if (this.userData.membershipDetails.expiresAt) {
        const expiryDate = new Date(this.userData.membershipDetails.expiresAt);
        el.textContent = `Expires: ${expiryDate.toLocaleDateString()}`;
      } else {
        el.textContent = 'No expiration';
      }
    });

    // Update membership upgrade prompts
    this.updateMembershipPrompts();
  }

  // Update friend groups display
  updateFriendGroupsDisplay() {
    const friendGroupsContainer = document.querySelector('#friend-groups-list');
    const friendGroupsCount = document.querySelectorAll('[data-friend-groups-count]');

    // Update friend groups count
    friendGroupsCount.forEach(el => {
      el.textContent = this.userData.friendGroupsCount || 0;
    });

    // Update friend groups list if container exists
    if (friendGroupsContainer && this.userData.friendGroups) {
      friendGroupsContainer.innerHTML = '';
      
      this.userData.friendGroups.forEach(group => {
        const groupElement = this.createFriendGroupElement(group);
        friendGroupsContainer.appendChild(groupElement);
      });
    }

    // Show/hide friend membership benefits
    this.updateFriendMembershipBenefits();
  }

  // Create friend group display element
  createFriendGroupElement(group) {
    const groupDiv = document.createElement('div');
    groupDiv.className = 'friend-group-item';
    
    const membershipStatus = group.membershipActive ? 
      '<span class="premium-badge">Premium Active</span>' : 
      '<span class="inactive-badge">Inactive</span>';

    groupDiv.innerHTML = `
      <div class="friend-info">
        <img src="${group.friendAvatar || '/images/default-avatar.svg'}" alt="${group.friendUsername}" class="friend-avatar">
        <div class="friend-details">
          <h4>${group.friendUsername}</h4>
          <p>Bets together: ${group.totalBetsTogether || 0}</p>
          ${group.lastBetTogether ? `<p class="last-bet">Last: ${new Date(group.lastBetTogether).toLocaleDateString()}</p>` : ''}
        </div>
      </div>
      <div class="membership-status">
        ${membershipStatus}
        ${group.membershipExpiresAt ? `<p class="expiry">Until: ${new Date(group.membershipExpiresAt).toLocaleDateString()}</p>` : ''}
      </div>
    `;

    return groupDiv;
  }

  // Update profile display elements
  updateProfileDisplay() {
    const usernameElements = document.querySelectorAll('[data-username]');
    const emailElements = document.querySelectorAll('[data-user-email]');
    const nameElements = document.querySelectorAll('[data-user-name]');

    usernameElements.forEach(el => el.textContent = this.userData.username);
    emailElements.forEach(el => el.textContent = this.userData.email || 'Not provided');
    
    nameElements.forEach(el => {
      const fullName = [this.userData.firstName, this.userData.lastName]
        .filter(Boolean).join(' ') || this.userData.username;
      el.textContent = fullName;
    });
  }

  // Update account stats and balance
  updateAccountStats() {
    const balanceElements = document.querySelectorAll('[data-account-balance]');
    const activeBetsElements = document.querySelectorAll('[data-active-bets]');

    // Update account balance if available
    if (this.userData.accountBalance !== undefined) {
      balanceElements.forEach(el => {
        el.textContent = `$${parseFloat(this.userData.accountBalance).toFixed(2)}`;
      });
    }

    // Update active friend bets indicator
    activeBetsElements.forEach(el => {
      el.textContent = this.userData.hasActiveFriendBets ? 'Yes' : 'No';
      el.className = this.userData.hasActiveFriendBets ? 'active-indicator' : 'inactive-indicator';
    });
  }

  // Update membership upgrade prompts based on current status
  updateMembershipPrompts() {
    const upgradePrompts = document.querySelectorAll('.membership-upgrade-prompt');
    const friendInvitePrompts = document.querySelectorAll('.friend-invite-prompt');

    if (this.userData.membershipDetails.type === 'free') {
      // Show upgrade prompts for free users
      upgradePrompts.forEach(el => el.style.display = 'block');
      
      // Show friend invite benefits prominently
      friendInvitePrompts.forEach(el => {
        el.style.display = 'block';
        el.innerHTML = `
          <h4>🎯 Get Free Premium!</h4>
          <p>Invite friends to bet together and unlock 30 days of premium features for both of you!</p>
          <button class="invite-friend-btn">Invite Friends</button>
        `;
      });
    } else if (this.userData.membershipDetails.isFree) {
      // Show premium features for friend-based premium users
      upgradePrompts.forEach(el => el.style.display = 'none');
      
      friendInvitePrompts.forEach(el => {
        el.style.display = 'block';
        el.innerHTML = `
          <h4>🔥 Premium Active via Friends!</h4>
          <p>Keep betting with friends to maintain your premium benefits!</p>
          <p class="expires">Expires: ${new Date(this.userData.membershipDetails.expiresAt).toLocaleDateString()}</p>
        `;
      });
    } else {
      // Hide prompts for paid premium users
      upgradePrompts.forEach(el => el.style.display = 'none');
      friendInvitePrompts.forEach(el => el.style.display = 'none');
    }
  }

  // Update friend membership benefits display
  updateFriendMembershipBenefits() {
    const benefitsContainer = document.querySelector('#friend-membership-benefits');
    
    if (benefitsContainer && this.userData.membershipDetails.eligibility) {
      const eligibility = this.userData.membershipDetails.eligibility;
      
      if (eligibility.eligible) {
        benefitsContainer.innerHTML = `
          <div class="benefits-active">
            <h4>✨ Friend Premium Benefits Active</h4>
            <p>You have premium access through ${eligibility.friendBetsCount} friend betting relationship(s)!</p>
            <ul>
              <li>✅ Advanced betting features</li>
              <li>✅ Real-time odds updates</li>
              <li>✅ Premium statistics</li>
              <li>✅ Social sharing tools</li>
            </ul>
          </div>
        `;
      } else {
        benefitsContainer.innerHTML = `
          <div class="benefits-inactive">
            <h4>🎯 Unlock Friend Premium Benefits</h4>
            <p>Start betting with friends to unlock premium features!</p>
            <p class="reason">${eligibility.reason}</p>
          </div>
        `;
      }
    }
  }

  // Handle logged out state
  handleLoggedOut() {
    // Redirect to login for protected pages
    const protectedPages = ['/account/', '/membership/', '/profile/'];
    const currentPath = window.location.pathname;
    
    if (protectedPages.some(page => currentPath.includes(page))) {
      setTimeout(() => {
        window.location.href = '/account/login/';
      }, 1000);
    }

    // Clear all user-specific displays
    document.querySelectorAll('[data-requires-auth]').forEach(el => {
      el.style.display = 'none';
    });
  }

  // Format membership type for display
  formatMembershipType(type) {
    switch(type) {
      case 'premium_free':
        return 'Premium (Free via Friends)';
      case 'premium':
        return 'Premium';
      case 'free':
      default:
        return 'Free';
    }
  }

  // Start automatic syncing
  startAutoSync() {
    // Sync every 30 seconds when page is visible
    this.syncInterval = setInterval(() => {
      if (!document.hidden && this.userData) {
        this.syncUserData();
      }
    }, 30000);

    // Sync when page becomes visible
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && this.userData) {
        this.syncUserData();
      }
    });

    // Sync on focus (user returns to tab)
    window.addEventListener('focus', () => {
      if (this.userData) {
        this.syncUserData();
      }
    });
  }

  // Add sync listener
  addSyncListener(callback) {
    this.listeners.add(callback);
  }

  // Remove sync listener
  removeSyncListener(callback) {
    this.listeners.delete(callback);
  }

  // Notify all listeners of data updates
  notifyListeners() {
    this.listeners.forEach(callback => {
      try {
        callback(this.userData);
      } catch (error) {
        console.error('Sync listener error:', error);
      }
    });
  }

  // Force immediate sync
  async forcSync() {
    return await this.syncUserData();
  }

  // Get current user data
  getUserData() {
    return this.userData;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.userData;
  }

  // Clean up
  destroy() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
    }
    this.listeners.clear();
  }
}

// Create global instance
window.accountSync = new AccountSyncManager();

// Auto-initialize on all account pages
document.addEventListener('DOMContentLoaded', () => {
  // Add click handlers for invite friend buttons
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('invite-friend-btn')) {
      // Redirect to friend invite/sharing page
      window.location.href = '/account/friends/';
    }
  });

  // Auto-refresh data when certain actions occur
  document.addEventListener('bet-placed', () => {
    setTimeout(() => window.accountSync.forcSync(), 1000);
  });

  document.addEventListener('membership-changed', () => {
    setTimeout(() => window.accountSync.forcSync(), 500);
  });

  console.log('🔄 Account sync manager initialized');
});