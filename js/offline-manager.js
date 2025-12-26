// Offline Manager for MXRaceHub - Caches schedules and rider stats
class OfflineManager {
  constructor() {
    this.storageKey = 'mxracehub_offline_data';
    this.version = '1.0.0';
    this.cacheExpiry = 24 * 60 * 60 * 1000; // 24 hours
    this.init();
  }
  
  async init() {
    // Register service worker for offline support
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered for offline support');
      } catch (error) {
        console.log('Service Worker registration failed:', error);
      }
    }
    
    // Listen for online/offline status
    window.addEventListener('online', () => this.handleOnline());
    window.addEventListener('offline', () => this.handleOffline());
    
    // Initial connection check
    this.updateConnectionStatus();
  }
  
  isOnline() {
    return navigator.onLine;
  }
  
  handleOnline() {
    console.log('Connection restored - syncing latest data');
    this.showConnectionStatus('online');
    this.syncOfflineData();
  }
  
  handleOffline() {
    console.log('Connection lost - switching to offline mode');
    this.showConnectionStatus('offline');
  }
  
  showConnectionStatus(status) {
    // Remove any existing status indicators
    const existingIndicator = document.getElementById('connection-status');
    if (existingIndicator) {
      existingIndicator.remove();
    }
    
    // Create status indicator
    const indicator = document.createElement('div');
    indicator.id = 'connection-status';
    indicator.className = `fixed top-4 right-4 z-50 px-4 py-2 rounded-lg text-white text-sm font-medium transition-all duration-300 ${
      status === 'online' 
        ? 'bg-green-600 animate-bounce' 
        : 'bg-red-600'
    }`;
    indicator.innerHTML = status === 'online' 
      ? '🌐 Back Online - Data Synced!' 
      : '📱 Offline Mode Active';
    
    document.body.appendChild(indicator);
    
    // Auto-hide online indicator after 3 seconds
    if (status === 'online') {
      setTimeout(() => {
        if (indicator.parentNode) {
          indicator.style.transform = 'translateX(100%)';
          setTimeout(() => indicator.remove(), 300);
        }
      }, 3000);
    }
  }
  
  updateConnectionStatus() {
    if (!this.isOnline()) {
      this.showConnectionStatus('offline');
    }
  }
  
  // Cache essential data for offline viewing
  async cacheEssentialData() {
    if (!this.isOnline()) {
      console.log('Cannot cache data - offline');
      return;
    }
    
    try {
      const dataToCache = {
        schedules: await this.fetchRaceSchedules(),
        riders: await this.fetchRiderStats(),
        standings: await this.fetchChampionshipStandings(),
        tracks: await this.fetchTrackData(),
        teams: await this.fetchTeamData(),
        userBets: await this.fetchUserBettingData(),
        accountInfo: await this.fetchAccountInfo(),
        leaderboards: await this.fetchLeaderboardData(),
        achievements: await this.fetchUserAchievements(),
        timestamp: Date.now(),
        version: this.version
      };
      
      localStorage.setItem(this.storageKey, JSON.stringify(dataToCache));
      console.log('Essential data cached for offline viewing');
      
      // Show cache success notification
      this.showCacheNotification('Data cached for offline viewing!');
      
    } catch (error) {
      console.error('Failed to cache data:', error);
    }
  }
  
  // Fetch methods for different data types
  async fetchRaceSchedules() {
    try {
      const response = await fetch('/api/races/schedule');
      return await response.json();
    } catch (error) {
      console.log('Using fallback schedule data');
      return this.getFallbackScheduleData();
    }
  }
  
  async fetchRiderStats() {
    try {
      const response = await fetch('/api/riders/stats');
      return await response.json();
    } catch (error) {
      console.log('Using fallback rider data');
      return this.getFallbackRiderData();
    }
  }
  
  async fetchChampionshipStandings() {
    try {
      const response = await fetch('/api/standings/current');
      return await response.json();
    } catch (error) {
      console.log('Using fallback standings data');
      return this.getFallbackStandingsData();
    }
  }
  
  async fetchTrackData() {
    try {
      const response = await fetch('/api/tracks');
      return await response.json();
    } catch (error) {
      console.log('Using fallback track data');
      return this.getFallbackTrackData();
    }
  }
  
  async fetchTeamData() {
    try {
      const response = await fetch('/api/teams');
      return await response.json();
    } catch (error) {
      console.log('Using fallback team data');
      return this.getFallbackTeamData();
    }
  }
  
  async fetchUserBettingData() {
    try {
      const response = await fetch('/api/user/bets');
      if (response.status === 401) {
        return { bets: [], authenticated: false };
      }
      return await response.json();
    } catch (error) {
      console.log('Using fallback betting data');
      return this.getFallbackBettingData();
    }
  }
  
  async fetchAccountInfo() {
    try {
      const response = await fetch('/api/auth/user');
      if (response.status === 401) {
        return { user: null, authenticated: false };
      }
      return await response.json();
    } catch (error) {
      console.log('Using fallback account data');
      return this.getFallbackAccountData();
    }
  }
  
  async fetchLeaderboardData() {
    try {
      const response = await fetch('/api/leaderboards/weekly');
      return await response.json();
    } catch (error) {
      console.log('Using fallback leaderboard data');
      return this.getFallbackLeaderboardData();
    }
  }
  
  async fetchUserAchievements() {
    try {
      const response = await fetch('/api/user/achievements');
      if (response.status === 401) {
        return { achievements: [], authenticated: false };
      }
      return await response.json();
    } catch (error) {
      console.log('Using fallback achievement data');
      return this.getFallbackAchievementData();
    }
  }
  
  // Get cached data for offline viewing
  getCachedData(dataType = null) {
    try {
      const cachedData = localStorage.getItem(this.storageKey);
      if (!cachedData) {
        return null;
      }
      
      const parsed = JSON.parse(cachedData);
      
      // Check if cache has expired
      if (Date.now() - parsed.timestamp > this.cacheExpiry) {
        console.log('Cache expired, clearing old data');
        localStorage.removeItem(this.storageKey);
        return null;
      }
      
      return dataType ? parsed[dataType] : parsed;
    } catch (error) {
      console.error('Error reading cached data:', error);
      return null;
    }
  }
  
  // Get data with offline fallback
  async getData(dataType) {
    if (this.isOnline()) {
      // Try to fetch fresh data
      try {
        switch (dataType) {
          case 'schedules':
            return await this.fetchRaceSchedules();
          case 'riders':
            return await this.fetchRiderStats();
          case 'standings':
            return await this.fetchChampionshipStandings();
          case 'tracks':
            return await this.fetchTrackData();
          case 'teams':
            return await this.fetchTeamData();
          case 'userBets':
            return await this.fetchUserBettingData();
          case 'accountInfo':
            return await this.fetchAccountInfo();
          case 'leaderboards':
            return await this.fetchLeaderboardData();
          case 'achievements':
            return await this.fetchUserAchievements();
          default:
            throw new Error('Unknown data type');
        }
      } catch (error) {
        console.log('Failed to fetch fresh data, using cache');
        return this.getCachedData(dataType);
      }
    } else {
      // Use cached data when offline
      const cachedData = this.getCachedData(dataType);
      if (cachedData) {
        return cachedData;
      } else {
        // Return fallback data as last resort
        return this.getFallbackData(dataType);
      }
    }
  }
  
  // Sync data when coming back online
  async syncOfflineData() {
    if (this.isOnline()) {
      await this.cacheEssentialData();
    }
  }
  
  // Show cache notification
  showCacheNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 left-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium animate-bounce';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.transform = 'translateX(-100%)';
        setTimeout(() => notification.remove(), 300);
      }
    }, 3000);
  }
  
  // Fallback data methods for essential viewing
  getFallbackData(dataType) {
    switch (dataType) {
      case 'schedules':
        return this.getFallbackScheduleData();
      case 'riders':
        return this.getFallbackRiderData();
      case 'standings':
        return this.getFallbackStandingsData();
      case 'tracks':
        return this.getFallbackTrackData();
      case 'teams':
        return this.getFallbackTeamData();
      case 'userBets':
        return this.getFallbackBettingData();
      case 'accountInfo':
        return this.getFallbackAccountData();
      case 'leaderboards':
        return this.getFallbackLeaderboardData();
      case 'achievements':
        return this.getFallbackAchievementData();
      default:
        return null;
    }
  }
  
  getFallbackScheduleData() {
    return {
      upcomingRaces: [
        {
          id: 1,
          name: "Thunder Valley Motocross",
          date: "2025-06-07",
          location: "Lakewood, CO",
          track: "Thunder Valley MX",
          type: "motocross",
          status: "upcoming"
        },
        {
          id: 2,
          name: "High Point National",
          date: "2025-06-14",
          location: "Mount Morris, PA",
          track: "High Point Raceway",
          type: "motocross",
          status: "upcoming"
        }
      ],
      nextRace: {
        name: "Thunder Valley Motocross",
        date: "2025-06-07",
        daysUntil: 7
      }
    };
  }
  
  getFallbackRiderData() {
    return {
      "450": [
        {
          id: 1,
          name: "Jett Lawrence",
          number: 18,
          team: "Team Honda HRC",
          points: 425,
          wins: 5,
          nationality: "Australia"
        },
        {
          id: 2,
          name: "Chase Sexton",
          number: 1,
          team: "Red Bull KTM Factory Racing",
          points: 398,
          wins: 3,
          nationality: "USA"
        },
        {
          id: 3,
          name: "Eli Tomac",
          number: 3,
          team: "Monster Energy Yamaha Star Racing",
          points: 371,
          wins: 4,
          nationality: "USA"
        }
      ],
      "250": [
        {
          id: 4,
          name: "Haiden Deegan",
          number: 23,
          team: "Monster Energy Yamaha Star Racing",
          points: 387,
          wins: 6,
          nationality: "USA"
        },
        {
          id: 5,
          name: "Levi Kitchen",
          number: 55,
          team: "Monster Energy Pro Circuit Kawasaki",
          points: 356,
          wins: 2,
          nationality: "USA"
        }
      ]
    };
  }
  
  getFallbackStandingsData() {
    return {
      "450": {
        leader: "Jett Lawrence",
        gap: 0,
        totalRaces: 12
      },
      "250": {
        leader: "Haiden Deegan",
        gap: 0,
        totalRaces: 12
      }
    };
  }
  
  getFallbackTrackData() {
    return [
      {
        id: 1,
        name: "Thunder Valley MX",
        location: "Lakewood, CO",
        type: "motocross",
        surface: "natural"
      },
      {
        id: 2,
        name: "High Point Raceway",
        location: "Mount Morris, PA",
        type: "motocross",
        surface: "natural"
      }
    ];
  }
  
  getFallbackTeamData() {
    return [
      {
        id: 1,
        name: "Team Honda HRC",
        manufacturer: "Honda",
        primaryColor: "#CC0000"
      },
      {
        id: 2,
        name: "Red Bull KTM Factory Racing",
        manufacturer: "KTM",
        primaryColor: "#FF6600"
      },
      {
        id: 3,
        name: "Monster Energy Yamaha Star Racing",
        manufacturer: "Yamaha",
        primaryColor: "#0066FF"
      }
    ];
  }
  
  getFallbackBettingData() {
    return {
      bets: [],
      authenticated: false,
      message: "Please log in to view your betting history",
      offline: true
    };
  }
  
  getFallbackAccountData() {
    return {
      user: null,
      authenticated: false,
      message: "Please log in to view account information",
      offline: true
    };
  }
  
  getFallbackLeaderboardData() {
    return {
      leaderboard: [],
      userRank: null,
      userPoints: null,
      message: "Leaderboard data not available offline",
      offline: true
    };
  }
  
  getFallbackAchievementData() {
    return {
      achievements: [],
      authenticated: false,
      message: "Please log in to view your achievements",
      offline: true
    };
  }
  
  // Manual cache refresh
  async refreshCache() {
    if (this.isOnline()) {
      this.showCacheNotification('Refreshing offline data...');
      await this.cacheEssentialData();
    } else {
      this.showCacheNotification('Cannot refresh - offline mode active');
    }
  }
  
  // Get cache info for user
  getCacheInfo() {
    const cached = this.getCachedData();
    if (cached) {
      const age = Date.now() - cached.timestamp;
      const ageHours = Math.floor(age / (1000 * 60 * 60));
      return {
        available: true,
        age: ageHours,
        version: cached.version,
        expires: Math.max(0, 24 - ageHours)
      };
    }
    return { available: false };
  }
}

// Initialize offline manager when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  window.offlineManager = new OfflineManager();
  
  // Auto-cache data on page load if online
  if (navigator.onLine) {
    setTimeout(() => {
      window.offlineManager.cacheEssentialData();
    }, 2000); // Wait 2 seconds after page load
  }
  
  // Add manual refresh button for cached data
  addOfflineControls();
});

function addOfflineControls() {
  // Add offline status indicator to the page
  const offlineIndicator = document.createElement('div');
  offlineIndicator.id = 'offline-controls';
  offlineIndicator.className = 'fixed bottom-4 left-4 z-40 space-y-2';
  offlineIndicator.innerHTML = `
    <button id="cache-refresh-btn" class="hidden lg:flex items-center px-3 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg text-sm hover:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-200">
      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
      </svg>
      Sync Data
    </button>
  `;
  
  document.body.appendChild(offlineIndicator);
  
  // Add click handler for cache refresh
  document.getElementById('cache-refresh-btn')?.addEventListener('click', () => {
    window.offlineManager.refreshCache();
  });
}

// Utility functions for pages to use offline data
window.getOfflineData = async function(dataType) {
  if (window.offlineManager) {
    return await window.offlineManager.getData(dataType);
  }
  return null;
};

window.isOfflineMode = function() {
  return !navigator.onLine;
};

window.getCacheStatus = function() {
  if (window.offlineManager) {
    return window.offlineManager.getCacheInfo();
  }
  return { available: false };
};