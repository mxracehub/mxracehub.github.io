// Social Sharing for Big Wins - MXRaceHub
class WinSharingManager {
  constructor() {
    this.shareThreshold = 50; // Minimum win amount to trigger sharing option
    this.init();
  }
  
  init() {
    // Listen for bet settlement events
    document.addEventListener('betSettled', (event) => {
      this.handleBetSettlement(event.detail);
    });
    
    // Add share buttons to existing win notifications
    this.enhanceExistingWinNotifications();
  }
  
  handleBetSettlement(betData) {
    if (betData.status === 'won' && betData.payout >= this.shareThreshold) {
      setTimeout(() => {
        this.showWinSharingModal(betData);
      }, 2000); // Show after initial celebration
    }
  }
  
  showWinSharingModal(betData) {
    const modal = this.createWinSharingModal(betData);
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
      modal.classList.add('show');
    }, 100);
  }
  
  createWinSharingModal(betData) {
    const modal = document.createElement('div');
    modal.className = 'win-sharing-modal';
    modal.innerHTML = `
      <div class="win-sharing-overlay"></div>
      <div class="win-sharing-content">
        <div class="win-celebration-header">
          <div class="win-emoji-burst">🎉💰🏆</div>
          <h2 class="win-title">Amazing Win!</h2>
          <p class="win-subtitle">Share your victory with the racing community!</p>
        </div>
        
        <div class="win-details-card">
          <div class="win-amount-display">
            <span class="currency">$</span>
            <span class="amount">${betData.payout.toFixed(2)}</span>
          </div>
          
          <div class="win-details-grid">
            <div class="detail-item">
              <span class="label">Race:</span>
              <span class="value">${betData.raceName}</span>
            </div>
            <div class="detail-item">
              <span class="label">Bet Type:</span>
              <span class="value">${betData.betType}</span>
            </div>
            <div class="detail-item">
              <span class="label">Odds:</span>
              <span class="value">${betData.odds}</span>
            </div>
            <div class="detail-item">
              <span class="label">Profit:</span>
              <span class="value profit">+$${(betData.payout - betData.amount).toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div class="sharing-options">
          <h3>Share Your Win</h3>
          <div class="share-buttons">
            <button class="share-btn twitter-share" data-platform="twitter">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              Twitter
            </button>
            
            <button class="share-btn facebook-share" data-platform="facebook">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
            
            <button class="share-btn instagram-share" data-platform="instagram">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.926 3.708 13.775 3.708 12.478s.49-2.448 1.418-3.323C6.001 8.228 7.152 7.738 8.449 7.738s2.448.49 3.323 1.417c.875.927 1.365 2.078 1.365 3.375s-.49 2.448-1.365 3.323c-.875.927-2.026 1.417-3.323 1.417z"/>
              </svg>
              Instagram
            </button>
            
            <button class="share-btn copy-link" data-platform="copy">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
              Copy Link
            </button>
          </div>
        </div>
        
        <div class="sharing-privacy">
          <label class="privacy-toggle">
            <input type="checkbox" id="sharePublicly" checked>
            <span class="checkmark"></span>
            Share on MXRaceHub leaderboard
          </label>
          <p class="privacy-note">Your win will appear on our community wins feed</p>
        </div>
        
        <div class="modal-actions">
          <button class="btn-secondary close-modal">Maybe Later</button>
          <button class="btn-primary generate-share-image">Create Share Image</button>
        </div>
      </div>
    `;
    
    // Add event listeners
    this.addModalEventListeners(modal, betData);
    
    return modal;
  }
  
  addModalEventListeners(modal, betData) {
    // Close modal
    modal.querySelector('.close-modal').addEventListener('click', () => {
      this.closeModal(modal);
    });
    
    modal.querySelector('.win-sharing-overlay').addEventListener('click', () => {
      this.closeModal(modal);
    });
    
    // Share buttons
    modal.querySelectorAll('.share-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const platform = btn.dataset.platform;
        this.shareToSocial(platform, betData);
      });
    });
    
    // Generate share image
    modal.querySelector('.generate-share-image').addEventListener('click', () => {
      this.generateShareImage(betData, modal);
    });
  }
  
  shareToSocial(platform, betData) {
    const shareText = this.generateShareText(betData);
    const shareUrl = `${window.location.origin}/share/win/${betData.id}`;
    
    switch (platform) {
      case 'twitter':
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=MXRaceHub,MotocrossBetting,BigWin`;
        window.open(twitterUrl, '_blank', 'width=550,height=420');
        break;
        
      case 'facebook':
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
        window.open(facebookUrl, '_blank', 'width=580,height=296');
        break;
        
      case 'instagram':
        // For Instagram, we'll create a shareable image and copy text
        this.copyToClipboard(shareText + ' ' + shareUrl);
        this.showToast('Text copied! Open Instagram and paste to share your win!');
        break;
        
      case 'copy':
        this.copyToClipboard(shareText + ' ' + shareUrl);
        this.showToast('Win details copied to clipboard!');
        break;
    }
    
    // Track sharing analytics
    this.trackShare(platform, betData);
  }
  
  generateShareText(betData) {
    const profit = betData.payout - betData.amount;
    const profitPercentage = ((profit / betData.amount) * 100).toFixed(0);
    
    const messages = [
      `🏆 Just won $${betData.payout.toFixed(2)} on ${betData.raceName}! ${profitPercentage}% profit on my bet! 🏍️`,
      `💰 Big win alert! $${betData.payout.toFixed(2)} from betting on ${betData.raceName}! Who else is riding the wave? 🌊`,
      `🎉 Called it! My ${betData.betType} bet on ${betData.raceName} just paid out $${betData.payout.toFixed(2)}! 🚀`,
      `🔥 On fire! Another win - $${betData.payout.toFixed(2)} from ${betData.raceName}! Time to celebrate! 🎊`
    ];
    
    return messages[Math.floor(Math.random() * messages.length)];
  }
  
  async generateShareImage(betData, modal) {
    try {
      // Show loading state
      const btn = modal.querySelector('.generate-share-image');
      const originalText = btn.textContent;
      btn.textContent = 'Creating Image...';
      btn.disabled = true;
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas size for social media
      canvas.width = 1200;
      canvas.height = 630;
      
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#1e40af');
      gradient.addColorStop(0.5, '#3b82f6');
      gradient.addColorStop(1, '#60a5fa');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add pattern overlay
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      for (let i = 0; i < canvas.width; i += 40) {
        for (let j = 0; j < canvas.height; j += 40) {
          if ((i + j) % 80 === 0) {
            ctx.fillRect(i, j, 20, 20);
          }
        }
      }
      
      // Add MXRaceHub branding
      ctx.fillStyle = 'white';
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('MXRaceHub', canvas.width / 2, 80);
      
      // Add big win text
      ctx.font = 'bold 72px Arial';
      ctx.fillText('BIG WIN!', canvas.width / 2, 180);
      
      // Add emojis
      ctx.font = '64px Arial';
      ctx.fillText('🏆💰🎉', canvas.width / 2, 250);
      
      // Add win amount
      ctx.font = 'bold 96px Arial';
      ctx.fillStyle = '#fbbf24';
      ctx.fillText(`$${betData.payout.toFixed(2)}`, canvas.width / 2, 370);
      
      // Add race details
      ctx.font = '28px Arial';
      ctx.fillStyle = 'white';
      ctx.fillText(betData.raceName, canvas.width / 2, 420);
      ctx.fillText(`${betData.betType} • ${betData.odds}`, canvas.width / 2, 460);
      
      // Add profit info
      const profit = betData.payout - betData.amount;
      const profitPercentage = ((profit / betData.amount) * 100).toFixed(0);
      ctx.font = 'bold 32px Arial';
      ctx.fillStyle = '#10b981';
      ctx.fillText(`+${profitPercentage}% Profit`, canvas.width / 2, 520);
      
      // Add website
      ctx.font = '24px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fillText('Join the action at MXRaceHub.com', canvas.width / 2, 580);
      
      // Convert to blob and download
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `mxracehub-win-${betData.id}.png`;
        a.click();
        URL.revokeObjectURL(url);
        
        // Reset button
        btn.textContent = originalText;
        btn.disabled = false;
        
        this.showToast('Share image downloaded! Upload to your social media.');
      }, 'image/png');
      
    } catch (error) {
      console.error('Error generating share image:', error);
      this.showToast('Error creating image. Please try again.');
      
      // Reset button
      const btn = modal.querySelector('.generate-share-image');
      btn.textContent = 'Create Share Image';
      btn.disabled = false;
    }
  }
  
  closeModal(modal) {
    modal.classList.add('closing');
    setTimeout(() => {
      if (modal.parentNode) {
        modal.parentNode.removeChild(modal);
      }
    }, 300);
  }
  
  copyToClipboard(text) {
    navigator.clipboard.writeText(text).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    });
  }
  
  showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'share-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }
  
  trackShare(platform, betData) {
    // Track sharing analytics
    console.log(`Win shared on ${platform}:`, {
      platform,
      winAmount: betData.payout,
      race: betData.raceName,
      betType: betData.betType
    });
    
    // You could send this to your analytics service
    // analytics.track('Win Shared', { platform, amount: betData.payout });
  }
  
  enhanceExistingWinNotifications() {
    // Add share buttons to existing win notifications
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1 && node.classList && 
              (node.classList.contains('notification') || 
               node.classList.contains('bet-confirmation'))) {
            this.addShareButtonToNotification(node);
          }
        });
      });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
  }
  
  addShareButtonToNotification(notification) {
    // Check if this is a win notification
    const text = notification.textContent.toLowerCase();
    if (text.includes('win') || text.includes('won') || text.includes('payout')) {
      const shareBtn = document.createElement('button');
      shareBtn.className = 'share-win-btn';
      shareBtn.innerHTML = `
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
        </svg>
        Share Win
      `;
      
      shareBtn.addEventListener('click', () => {
        // Extract bet data from notification (you'd customize this based on your notification format)
        const sampleBetData = {
          id: Date.now(),
          payout: 150.00,
          amount: 25.00,
          raceName: 'Thunder Valley National',
          betType: 'Race Winner',
          odds: '+500',
          status: 'won'
        };
        
        this.showWinSharingModal(sampleBetData);
      });
      
      notification.appendChild(shareBtn);
    }
  }
}

// CSS for the sharing modal and components
const shareModalCSS = `
.win-sharing-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.win-sharing-modal.show {
  opacity: 1;
  visibility: visible;
}

.win-sharing-modal.closing {
  opacity: 0;
  visibility: hidden;
}

.win-sharing-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
}

.win-sharing-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  border-radius: 20px;
  padding: 2rem;
  max-width: 500px;
  width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  color: white;
}

.win-celebration-header {
  text-align: center;
  margin-bottom: 2rem;
}

.win-emoji-burst {
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: bounce 2s infinite;
}

.win-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  background: linear-gradient(45deg, #fbbf24, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.win-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
}

.win-details-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.win-amount-display {
  text-align: center;
  margin-bottom: 1.5rem;
}

.win-amount-display .currency {
  font-size: 2rem;
  opacity: 0.8;
}

.win-amount-display .amount {
  font-size: 3.5rem;
  font-weight: bold;
  color: #fbbf24;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.win-details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
}

.detail-item .label {
  font-size: 0.875rem;
  opacity: 0.8;
  margin-bottom: 0.25rem;
}

.detail-item .value {
  font-weight: bold;
  font-size: 1.1rem;
}

.detail-item .value.profit {
  color: #10b981;
}

.sharing-options {
  margin-bottom: 2rem;
}

.sharing-options h3 {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.share-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.share-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  gap: 0.5rem;
}

.twitter-share {
  background: #1da1f2;
  color: white;
}

.twitter-share:hover {
  background: #1a91da;
  transform: translateY(-2px);
}

.facebook-share {
  background: #4267b2;
  color: white;
}

.facebook-share:hover {
  background: #365899;
  transform: translateY(-2px);
}

.instagram-share {
  background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  color: white;
}

.instagram-share:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.copy-link {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.copy-link:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.sharing-privacy {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 2rem;
}

.privacy-toggle {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 0.5rem;
}

.privacy-toggle input[type="checkbox"] {
  margin-right: 0.75rem;
  transform: scale(1.2);
}

.privacy-note {
  font-size: 0.875rem;
  opacity: 0.8;
  margin: 0;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn-secondary, .btn-primary {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.3);
}

.btn-primary {
  background: linear-gradient(45deg, #fbbf24, #f59e0b);
  color: #1f2937;
  font-weight: bold;
}

.btn-primary:hover {
  background: linear-gradient(45deg, #f59e0b, #d97706);
  transform: translateY(-2px);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.share-toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: #10b981;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  z-index: 10000;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
}

.share-toast.show {
  opacity: 1;
  transform: translateY(0);
}

.share-win-btn {
  background: linear-gradient(45deg, #fbbf24, #f59e0b);
  color: #1f2937;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.875rem;
  display: inline-flex;
  align-items: center;
  margin-left: 1rem;
  transition: all 0.2s ease;
}

.share-win-btn:hover {
  background: linear-gradient(45deg, #f59e0b, #d97706);
  transform: translateY(-1px);
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

/* Mobile responsive */
@media (max-width: 768px) {
  .win-sharing-content {
    padding: 1.5rem;
    border-radius: 15px;
  }
  
  .win-title {
    font-size: 2rem;
  }
  
  .win-amount-display .amount {
    font-size: 2.5rem;
  }
  
  .share-buttons {
    grid-template-columns: 1fr;
  }
  
  .modal-actions {
    flex-direction: column;
  }
  
  .share-toast {
    left: 1rem;
    right: 1rem;
    bottom: 1rem;
  }
}
`;

// Inject CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = shareModalCSS;
document.head.appendChild(styleSheet);

// Initialize the sharing manager
window.winSharingManager = new WinSharingManager();

// Export for external use
window.shareWin = function(betData) {
  window.winSharingManager.showWinSharingModal(betData);
};

// Simulate a big win for testing (remove in production)
window.simulateBigWin = function() {
  const sampleWin = {
    id: Date.now(),
    payout: 750.00,
    amount: 50.00,
    raceName: 'Thunder Valley National - 450 Main Event',
    betType: 'Race Winner',
    odds: '+1400',
    status: 'won'
  };
  
  window.winSharingManager.showWinSharingModal(sampleWin);
};