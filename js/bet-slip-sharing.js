// Real-time Bet Slip Sharing - MXRaceHub
class BetSlipSharingManager {
  constructor() {
    this.shareSessionId = null;
    this.friendsList = [];
    this.sharedBetSlips = new Map();
    this.websocket = null;
    this.init();
  }
  
  init() {
    this.setupWebSocket();
    this.createSharingInterface();
    this.setupEventListeners();
    this.loadFriendsList();
  }
  
  setupWebSocket() {
    try {
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const wsUrl = `${protocol}//${window.location.host}/ws/bet-sharing`;
      
      this.websocket = new WebSocket(wsUrl);
      
      this.websocket.onopen = () => {
        console.log('Bet sharing WebSocket connected');
        this.sendAuthentication();
      };
      
      this.websocket.onmessage = (event) => {
        this.handleWebSocketMessage(JSON.parse(event.data));
      };
      
      this.websocket.onclose = () => {
        console.log('Bet sharing WebSocket disconnected');
        setTimeout(() => this.setupWebSocket(), 5000); // Reconnect after 5 seconds
      };
      
      this.websocket.onerror = (error) => {
        console.log('WebSocket error:', error);
      };
    } catch (error) {
      console.log('WebSocket not available, using local sharing only');
    }
  }
  
  sendAuthentication() {
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.send(JSON.stringify({
        type: 'authenticate',
        userId: this.getCurrentUserId(),
        sessionId: this.shareSessionId
      }));
    }
  }
  
  handleWebSocketMessage(data) {
    switch (data.type) {
      case 'bet_slip_shared':
        this.displaySharedBetSlip(data.betSlip, data.fromUser);
        break;
      case 'bet_slip_updated':
        this.updateSharedBetSlip(data.betSlip, data.fromUser);
        break;
      case 'friend_online':
        this.updateFriendStatus(data.friendId, true);
        break;
      case 'friend_offline':
        this.updateFriendStatus(data.friendId, false);
        break;
      case 'bet_placed_notification':
        this.showFriendBetNotification(data);
        break;
    }
  }
  
  createSharingInterface() {
    const sharingPanel = document.createElement('div');
    sharingPanel.id = 'bet-slip-sharing-panel';
    sharingPanel.className = 'bet-sharing-panel hidden';
    sharingPanel.innerHTML = `
      <div class="sharing-header">
        <h3 class="sharing-title">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
          Share With Friends
        </h3>
        <button class="close-sharing-panel">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      
      <div class="current-bet-slip">
        <h4 class="bet-slip-title">Your Current Bet Slip</h4>
        <div id="current-bet-display" class="bet-display">
          <div class="empty-bet-slip">No active bets to share</div>
        </div>
        <div class="bet-slip-actions">
          <button id="share-bet-slip" class="share-btn" disabled>
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
            </svg>
            Share Bet Slip
          </button>
          <button id="copy-bet-link" class="copy-btn">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
            Copy Link
          </button>
        </div>
      </div>
      
      <div class="friends-section">
        <h4 class="friends-title">Online Friends</h4>
        <div id="friends-list" class="friends-list">
          <!-- Friends will be populated here -->
        </div>
      </div>
      
      <div class="shared-bets-section">
        <h4 class="shared-bets-title">Friends' Bet Slips</h4>
        <div id="shared-bets-container" class="shared-bets-container">
          <div class="no-shared-bets">No friends sharing bets right now</div>
        </div>
      </div>
    `;
    
    document.body.appendChild(sharingPanel);
  }
  
  setupEventListeners() {
    // Close panel
    document.querySelector('.close-sharing-panel')?.addEventListener('click', () => {
      this.hideSharingPanel();
    });
    
    // Share bet slip
    document.getElementById('share-bet-slip')?.addEventListener('click', () => {
      this.shareCurrentBetSlip();
    });
    
    // Copy bet link
    document.getElementById('copy-bet-link')?.addEventListener('click', () => {
      this.copyBetSlipLink();
    });
    
    // Listen for bet slip changes
    document.addEventListener('betSlipUpdated', (event) => {
      this.updateCurrentBetDisplay(event.detail);
    });
    
    // Add share button to existing betting interfaces
    this.addShareButtonsToExistingUI();
  }
  
  addShareButtonsToExistingUI() {
    // Add share button to betting modals
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1 && node.classList) {
            if (node.classList.contains('modal') || node.id === 'live-bet-modal') {
              this.addShareButtonToModal(node);
            }
          }
        });
      });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Add floating share button
    this.createFloatingShareButton();
  }
  
  createFloatingShareButton() {
    const floatingBtn = document.createElement('button');
    floatingBtn.id = 'floating-share-btn';
    floatingBtn.className = 'floating-share-btn';
    floatingBtn.innerHTML = `
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
      </svg>
      <span class="friend-count" id="online-friends-count">0</span>
    `;
    
    floatingBtn.addEventListener('click', () => {
      this.showSharingPanel();
    });
    
    document.body.appendChild(floatingBtn);
  }
  
  addShareButtonToModal(modal) {
    const existingShareBtn = modal.querySelector('.modal-share-btn');
    if (existingShareBtn) return; // Already added
    
    const actions = modal.querySelector('.modal-actions, .flex.gap-3');
    if (actions) {
      const shareBtn = document.createElement('button');
      shareBtn.className = 'modal-share-btn px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors';
      shareBtn.innerHTML = `
        <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
        </svg>
        Share with Friends
      `;
      
      shareBtn.addEventListener('click', () => {
        this.showSharingPanel();
      });
      
      actions.insertBefore(shareBtn, actions.firstChild);
    }
  }
  
  showSharingPanel() {
    const panel = document.getElementById('bet-slip-sharing-panel');
    panel.classList.remove('hidden');
    setTimeout(() => panel.classList.add('show'), 10);
    
    this.loadFriendsList();
    this.loadSharedBets();
  }
  
  hideSharingPanel() {
    const panel = document.getElementById('bet-slip-sharing-panel');
    panel.classList.remove('show');
    setTimeout(() => panel.classList.add('hidden'), 300);
  }
  
  async loadFriendsList() {
    try {
      // In a real app, this would fetch from your friends API
      const friends = await this.fetchFriends();
      this.displayFriendsList(friends);
    } catch (error) {
      console.log('Loading friends list...');
      this.displayFriendsList([]);
    }
  }
  
  async fetchFriends() {
    // Simulate API call - replace with real endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, username: 'RiderFan_23', online: true, avatar: 'RF' },
          { id: 2, username: 'MotoMaster', online: true, avatar: 'MM' },
          { id: 3, username: 'SX_Expert', online: false, avatar: 'SE' },
          { id: 4, username: 'TrackDay_Pro', online: true, avatar: 'TP' }
        ]);
      }, 500);
    });
  }
  
  displayFriendsList(friends) {
    const container = document.getElementById('friends-list');
    const onlineFriends = friends.filter(f => f.online);
    
    document.getElementById('online-friends-count').textContent = onlineFriends.length;
    
    if (onlineFriends.length === 0) {
      container.innerHTML = '<div class="no-friends">No friends online</div>';
      return;
    }
    
    container.innerHTML = onlineFriends.map(friend => `
      <div class="friend-item" data-friend-id="${friend.id}">
        <div class="friend-avatar">${friend.avatar}</div>
        <div class="friend-info">
          <div class="friend-name">${friend.username}</div>
          <div class="friend-status">
            <div class="online-indicator"></div>
            Online
          </div>
        </div>
        <button class="share-with-friend" data-friend-id="${friend.id}">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
          </svg>
        </button>
      </div>
    `).join('');
    
    // Add event listeners for sharing with specific friends
    container.querySelectorAll('.share-with-friend').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const friendId = e.target.closest('.share-with-friend').dataset.friendId;
        this.shareWithSpecificFriend(friendId);
      });
    });
  }
  
  shareCurrentBetSlip() {
    const currentBet = this.getCurrentBetSlip();
    if (!currentBet || currentBet.selections.length === 0) {
      this.showToast('No bets to share', 'warning');
      return;
    }
    
    const shareData = {
      type: 'bet_slip_shared',
      betSlip: currentBet,
      fromUser: {
        id: this.getCurrentUserId(),
        username: this.getCurrentUsername()
      },
      timestamp: Date.now()
    };
    
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.send(JSON.stringify(shareData));
      this.showToast('Bet slip shared with friends!', 'success');
    } else {
      this.showToast('Unable to share - offline mode', 'warning');
    }
  }
  
  shareWithSpecificFriend(friendId) {
    const currentBet = this.getCurrentBetSlip();
    if (!currentBet || currentBet.selections.length === 0) {
      this.showToast('No bets to share', 'warning');
      return;
    }
    
    const shareData = {
      type: 'private_bet_slip_shared',
      betSlip: currentBet,
      fromUser: {
        id: this.getCurrentUserId(),
        username: this.getCurrentUsername()
      },
      toFriend: friendId,
      timestamp: Date.now()
    };
    
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.send(JSON.stringify(shareData));
      this.showToast(`Bet slip shared with friend!`, 'success');
    } else {
      this.showToast('Unable to share - offline mode', 'warning');
    }
  }
  
  copyBetSlipLink() {
    const currentBet = this.getCurrentBetSlip();
    if (!currentBet || currentBet.selections.length === 0) {
      this.showToast('No bets to copy', 'warning');
      return;
    }
    
    const betLink = this.generateBetSlipLink(currentBet);
    this.copyToClipboard(betLink);
    this.showToast('Bet slip link copied to clipboard!', 'success');
  }
  
  generateBetSlipLink(betSlip) {
    const encoded = btoa(JSON.stringify({
      selections: betSlip.selections,
      totalAmount: betSlip.totalAmount,
      potentialPayout: betSlip.potentialPayout,
      timestamp: Date.now()
    }));
    
    return `${window.location.origin}/share/bet-slip/${encoded}`;
  }
  
  displaySharedBetSlip(betSlip, fromUser) {
    const container = document.getElementById('shared-bets-container');
    const noSharedBets = container.querySelector('.no-shared-bets');
    if (noSharedBets) noSharedBets.remove();
    
    const sharedBetElement = document.createElement('div');
    sharedBetElement.className = 'shared-bet-slip';
    sharedBetElement.innerHTML = `
      <div class="shared-bet-header">
        <div class="shared-bet-user">
          <div class="user-avatar">${fromUser.username.substring(0, 2).toUpperCase()}</div>
          <div class="user-info">
            <div class="username">${fromUser.username}</div>
            <div class="share-time">${this.formatTime(betSlip.timestamp)}</div>
          </div>
        </div>
        <div class="shared-bet-actions">
          <button class="copy-bet-button" data-bet-slip='${JSON.stringify(betSlip)}'>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div class="shared-bet-content">
        <div class="bet-selections">
          ${betSlip.selections.map(selection => `
            <div class="bet-selection">
              <div class="selection-info">
                <span class="race-name">${selection.raceName}</span>
                <span class="bet-type">${selection.betType}</span>
              </div>
              <div class="selection-odds">${selection.odds}</div>
            </div>
          `).join('')}
        </div>
        
        <div class="bet-summary">
          <div class="bet-amount">Stake: $${betSlip.totalAmount}</div>
          <div class="potential-payout">Potential: $${betSlip.potentialPayout}</div>
        </div>
      </div>
    `;
    
    container.appendChild(sharedBetElement);
    
    // Add copy functionality
    sharedBetElement.querySelector('.copy-bet-button').addEventListener('click', (e) => {
      const betData = JSON.parse(e.target.closest('.copy-bet-button').dataset.betSlip);
      this.copySharedBetSlip(betData);
    });
    
    // Auto-remove after 10 minutes
    setTimeout(() => {
      if (sharedBetElement.parentNode) {
        sharedBetElement.remove();
      }
    }, 600000);
  }
  
  copySharedBetSlip(betSlip) {
    // Copy the bet slip to user's current selections
    document.dispatchEvent(new CustomEvent('copyBetSlip', { detail: betSlip }));
    this.showToast('Bet slip copied to your selections!', 'success');
  }
  
  updateCurrentBetDisplay(betSlip) {
    const display = document.getElementById('current-bet-display');
    const shareBtn = document.getElementById('share-bet-slip');
    
    if (!betSlip || betSlip.selections.length === 0) {
      display.innerHTML = '<div class="empty-bet-slip">No active bets to share</div>';
      shareBtn.disabled = true;
      return;
    }
    
    display.innerHTML = `
      <div class="bet-selections">
        ${betSlip.selections.map(selection => `
          <div class="bet-selection">
            <div class="selection-info">
              <span class="race-name">${selection.raceName}</span>
              <span class="bet-type">${selection.betType}</span>
            </div>
            <div class="selection-odds">${selection.odds}</div>
          </div>
        `).join('')}
      </div>
      
      <div class="bet-summary">
        <div class="bet-amount">Total Stake: $${betSlip.totalAmount}</div>
        <div class="potential-payout">Potential Payout: $${betSlip.potentialPayout}</div>
      </div>
    `;
    
    shareBtn.disabled = false;
  }
  
  getCurrentBetSlip() {
    // This would integrate with your existing bet slip system
    // For demo purposes, return a sample bet slip
    return {
      selections: [
        {
          raceName: 'Thunder Valley National',
          betType: 'Race Winner - Jett Lawrence',
          odds: '+180',
          amount: 25
        }
      ],
      totalAmount: 25,
      potentialPayout: 70,
      timestamp: Date.now()
    };
  }
  
  getCurrentUserId() {
    // This would get the actual logged-in user ID
    return localStorage.getItem('userId') || 'demo_user_' + Math.random().toString(36).substr(2, 9);
  }
  
  getCurrentUsername() {
    // This would get the actual logged-in username
    return localStorage.getItem('username') || 'Demo User';
  }
  
  formatTime(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    return `${Math.floor(minutes / 60)}h ago`;
  }
  
  copyToClipboard(text) {
    navigator.clipboard.writeText(text).catch(() => {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    });
  }
  
  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `bet-sharing-toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3000);
  }
  
  async loadSharedBets() {
    // Load recent shared bets from friends
    try {
      const sharedBets = await this.fetchRecentSharedBets();
      // Display shared bets would go here
    } catch (error) {
      console.log('Loading shared bets...');
    }
  }
  
  updateFriendStatus(friendId, isOnline) {
    const friendElement = document.querySelector(`[data-friend-id="${friendId}"]`);
    if (friendElement) {
      const statusElement = friendElement.querySelector('.friend-status');
      if (isOnline) {
        statusElement.innerHTML = '<div class="online-indicator"></div>Online';
      } else {
        statusElement.innerHTML = '<div class="offline-indicator"></div>Offline';
        // Remove from friends list if offline
        setTimeout(() => {
          if (friendElement.parentNode) {
            friendElement.remove();
          }
        }, 2000);
      }
    }
    
    // Update online count
    const onlineCount = document.querySelectorAll('.online-indicator').length;
    document.getElementById('online-friends-count').textContent = onlineCount;
  }
  
  showFriendBetNotification(data) {
    const notification = document.createElement('div');
    notification.className = 'friend-bet-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <div class="notification-header">
          <div class="friend-avatar">${data.fromUser.username.substring(0, 2).toUpperCase()}</div>
          <div class="notification-text">
            <strong>${data.fromUser.username}</strong> just placed a bet!
          </div>
        </div>
        <div class="notification-details">
          ${data.betType} • ${data.raceName} • $${data.amount}
        </div>
      </div>
      <button class="view-bet-btn">View</button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        if (notification.parentNode) notification.parentNode.removeChild(notification);
      }, 300);
    }, 5000);
  }
}

// CSS for bet slip sharing
const betSharingCSS = `
.bet-sharing-panel {
  position: fixed;
  top: 0;
  right: -400px;
  width: 400px;
  height: 100vh;
  background: white;
  box-shadow: -4px 0 15px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: right 0.3s ease;
  overflow-y: auto;
}

.bet-sharing-panel.show {
  right: 0;
}

.sharing-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

.sharing-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #374151;
  display: flex;
  align-items: center;
}

.close-sharing-panel {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #6b7280;
  border-radius: 0.375rem;
}

.close-sharing-panel:hover {
  background: #e5e7eb;
}

.current-bet-slip {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.bet-slip-title {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.75rem;
}

.bet-display {
  background: #f9fafb;
  border-radius: 0.5rem;
  padding: 0.75rem;
  margin-bottom: 1rem;
}

.empty-bet-slip {
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
  padding: 1rem;
}

.bet-selections {
  margin-bottom: 0.75rem;
}

.bet-selection {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.bet-selection:last-child {
  border-bottom: none;
}

.selection-info {
  display: flex;
  flex-direction: column;
}

.race-name {
  font-weight: 600;
  font-size: 0.875rem;
  color: #374151;
}

.bet-type {
  font-size: 0.75rem;
  color: #6b7280;
}

.selection-odds {
  font-weight: 600;
  color: #059669;
}

.bet-summary {
  display: flex;
  justify-content: space-between;
  padding-top: 0.5rem;
  border-top: 1px solid #e5e7eb;
  font-size: 0.875rem;
}

.bet-amount {
  color: #374151;
}

.potential-payout {
  color: #059669;
  font-weight: 600;
}

.bet-slip-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.share-btn, .copy-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.share-btn {
  background: #3b82f6;
  color: white;
}

.share-btn:hover:not(:disabled) {
  background: #2563eb;
}

.share-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.copy-btn {
  background: #e5e7eb;
  color: #374151;
}

.copy-btn:hover {
  background: #d1d5db;
}

.friends-section {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.friends-title {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.75rem;
}

.friends-list {
  max-height: 200px;
  overflow-y: auto;
}

.friend-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  background: #f9fafb;
  transition: background 0.2s;
}

.friend-item:hover {
  background: #e5e7eb;
}

.friend-avatar {
  width: 2.5rem;
  height: 2.5rem;
  background: #3b82f6;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  margin-right: 0.75rem;
}

.friend-info {
  flex: 1;
}

.friend-name {
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
}

.friend-status {
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  color: #6b7280;
}

.online-indicator, .offline-indicator {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  margin-right: 0.25rem;
}

.online-indicator {
  background: #10b981;
}

.offline-indicator {
  background: #6b7280;
}

.share-with-friend {
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: background 0.2s;
}

.share-with-friend:hover {
  background: #2563eb;
}

.no-friends {
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
  padding: 1rem;
}

.shared-bets-section {
  padding: 1rem;
}

.shared-bets-title {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.75rem;
}

.shared-bets-container {
  max-height: 300px;
  overflow-y: auto;
}

.no-shared-bets {
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
  padding: 1rem;
}

.shared-bet-slip {
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 0.5rem;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
}

.shared-bet-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.shared-bet-user {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 2rem;
  height: 2rem;
  background: #0ea5e9;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.75rem;
  margin-right: 0.5rem;
}

.username {
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
}

.share-time {
  font-size: 0.75rem;
  color: #6b7280;
}

.copy-bet-button {
  background: #0ea5e9;
  color: white;
  border: none;
  border-radius: 0.375rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: background 0.2s;
}

.copy-bet-button:hover {
  background: #0284c7;
}

.floating-share-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3.5rem;
  height: 3.5rem;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  z-index: 999;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.floating-share-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.5);
}

.friend-count {
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
}

.bet-sharing-toast {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  color: white;
  font-weight: 500;
  z-index: 10000;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
}

.bet-sharing-toast.show {
  opacity: 1;
  transform: translateY(0);
}

.bet-sharing-toast.success {
  background: #10b981;
}

.bet-sharing-toast.warning {
  background: #f59e0b;
}

.bet-sharing-toast.info {
  background: #3b82f6;
}

.friend-bet-notification {
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  z-index: 10001;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  opacity: 0;
  transform: translateX(100%);
  transition: all 0.3s ease;
}

.friend-bet-notification.show {
  opacity: 1;
  transform: translateX(0);
}

.notification-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.notification-text {
  margin-left: 0.5rem;
  font-size: 0.875rem;
}

.notification-details {
  color: #6b7280;
  font-size: 0.75rem;
}

.view-bet-btn {
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin-top: 0.5rem;
  font-size: 0.875rem;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .bet-sharing-panel {
    width: 100vw;
    right: -100vw;
  }
  
  .floating-share-btn {
    bottom: 1rem;
    right: 1rem;
  }
  
  .friend-bet-notification {
    left: 1rem;
    right: 1rem;
    max-width: none;
  }
}
`;

// Inject CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = betSharingCSS;
document.head.appendChild(styleSheet);

// Initialize the bet slip sharing manager
window.betSlipSharingManager = new BetSlipSharingManager();

// Export for external use
window.shareCurrentBets = function() {
  window.betSlipSharingManager.shareCurrentBetSlip();
};

window.showBetSharingPanel = function() {
  window.betSlipSharingManager.showSharingPanel();
};