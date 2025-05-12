document.addEventListener('DOMContentLoaded', function() {
  // Get elements
  const betTypeSelect = document.getElementById('bet-type');
  const riderSelect = document.querySelector('.rider-select');
  const friendSelect = document.getElementById('friend-select');
  const headToHeadSection = document.getElementById('head-to-head-section');

  // Fetch all riders from both classes
  async function fetchRiders() {
    try {
      const [response250, response450] = await Promise.all([
        fetch('/api/riders/250'),
        fetch('/api/riders/450')
      ]);
      
      const riders250 = await response250.json();
      const riders450 = await response450.json();
      
      return {
        '250': riders250.sort((a, b) => a.number - b.number),
        '450': riders450.sort((a, b) => a.number - b.number)
      };
    } catch (error) {
      console.error('Error fetching riders:', error);
      return { '250': [], '450': [] };
    }
  }

  // Populate rider dropdowns
  async function populateRiders(selectElement) {
    const riders = await fetchRiders();
    
    // Create class groups
    const group250 = document.createElement('optgroup');
    group250.label = '250 Class';
    const group450 = document.createElement('optgroup');
    group450.label = '450 Class';

    // Add 250 class riders
    riders['250'].forEach(rider => {
      const option = document.createElement('option');
      option.value = rider.id;
      option.textContent = `#${rider.number} - ${rider.firstName} ${rider.lastName}`;
      option.setAttribute('data-profile-url', `/riders/250/${rider.firstName.toLowerCase()}-${rider.lastName.toLowerCase()}/`);
      group250.appendChild(option);
    });

    // Add 450 class riders
    riders['450'].forEach(rider => {
      const option = document.createElement('option');
      option.value = rider.id;
      option.textContent = `#${rider.number} - ${rider.firstName} ${rider.lastName}`;
      option.setAttribute('data-profile-url', `/riders/450/${rider.firstName.toLowerCase()}-${rider.lastName.toLowerCase()}/`);
      group450.appendChild(option);
    });

    // Add groups to select element
    selectElement.appendChild(group450);
    selectElement.appendChild(group250);

    // Add change handler for profile links
    selectElement.addEventListener('change', (e) => {
      const selectedOption = e.target.options[e.target.selectedIndex];
      const profileUrl = selectedOption.getAttribute('data-profile-url');
      const profileLink = selectElement.parentElement.querySelector('.rider-profile-link');
      
      if (profileLink) {
        profileLink.href = profileUrl;
      } else {
        const link = document.createElement('a');
        link.href = profileUrl;
        link.className = 'rider-profile-link text-primary hover:underline ml-2';
        link.textContent = 'View Profile';
        selectElement.parentElement.appendChild(link);
      }
    });
  }

  populateRiders(riderSelect);

  // Handle bet type changes
  betTypeSelect.addEventListener('change', function() {
    if (this.value === 'head_to_head') {
      headToHeadSection.style.display = 'block';
    } else {
      headToHeadSection.style.display = 'none';
    }
  });

  // Create searchable friend dropdown
  friendSelect.insertAdjacentHTML('beforebegin', `
    <div class="friend-search-container">
      <input type="text" id="friend-search" placeholder="Search friends..." class="friend-search-input">
      <div id="friend-search-results" class="friend-search-results"></div>
    </div>
  `);

  const friendSearch = document.getElementById('friend-search');
  const friendSearchResults = document.getElementById('friend-search-results');

  // Sample friends data - in real app, fetch from API
  const friends = [
    { id: 1, username: 'johndoe', firstName: 'John', lastName: 'Doe' },
    { id: 2, username: 'janedoe', firstName: 'Jane', lastName: 'Doe' },
    { id: 3, username: 'rider42', firstName: 'Mike', lastName: 'Johnson' },
    { id: 4, username: 'mxfan99', firstName: 'Sarah', lastName: 'Williams' },
    { id: 5, username: 'race_lover', firstName: 'Tom', lastName: 'Taylor' }
  ];

  let selectedFriend = null;

  friendSearch.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    friendSearchResults.innerHTML = '';

    if (searchTerm.length < 2) {
      friendSearchResults.style.display = 'none';
      return;
    }

    const matches = friends.filter(friend => 
      friend.username.toLowerCase().includes(searchTerm) ||
      friend.firstName.toLowerCase().includes(searchTerm) ||
      friend.lastName.toLowerCase().includes(searchTerm)
    );

    if (matches.length > 0) {
      matches.forEach(friend => {
        const div = document.createElement('div');
        div.className = 'friend-search-item';
        div.innerHTML = `
          <span class="friend-name">${friend.firstName} ${friend.lastName}</span>
          <span class="friend-username">@${friend.username}</span>
        `;
        div.addEventListener('click', () => {
          selectedFriend = friend;
          friendSearch.value = `${friend.firstName} ${friend.lastName}`;
          friendSearchResults.style.display = 'none';
          friendSelect.value = friend.id;
        });
        friendSearchResults.appendChild(div);
      });
      friendSearchResults.style.display = 'block';
    } else {
      friendSearchResults.innerHTML = '<div class="no-results">No friends found</div>';
      friendSearchResults.style.display = 'block';
    }
  });

  // Hide results when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.friend-search-container')) {
      friendSearchResults.style.display = 'none';
    }
  });

  // Form submission handling
  const betForm = document.getElementById('bet-form');
  betForm.addEventListener('submit', async function(e) { // Make the function async
    e.preventDefault();
    if (!selectedFriend) {
      alert('Please select a friend to challenge');
      return;
    }

    // Simulate form submission and bet placement (replace with actual API call)
    // Assuming the API returns bet data upon successful placement
    try {
      const response = await fetch('/api/place_bet', { // Replace with your actual API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ // Replace with your actual form data
          betType: betTypeSelect.value,
          riderId: riderSelect.value,
          friendId: selectedFriend.id
        })
      });

      if (response.ok) {
        const betData = await response.json();
        // Save bet to user's profile and bets page
        await fetch('/api/user/bets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            betId: betData.id,
            profile: true,
            history: true
          })
        });

        window.location.href = '/account/bets/';
      } else {
        console.error('Failed to place bet');
        alert('Failed to place bet. Please try again.');
      }
    } catch (error) {
      console.error('Error placing bet:', error);
      alert('An error occurred while placing the bet. Please try again.');
    }
  });
});

// Populate rider select lists
async function populateRiderList() {
  try {
    // Fetch both 250 and 450 class riders
    const [response250, response450] = await Promise.all([
      fetch('/api/riders/250'),
      fetch('/api/riders/450')
    ]);
    
    const riders250 = await response250.json();
    const riders450 = await response450.json();
    const allRiders = [...riders250, ...riders450];
    
    const riderSelects = document.querySelectorAll('.rider-select');

    riderSelects.forEach(select => {
      // Add class groupings
      const group250 = document.createElement('optgroup');
      group250.label = '250 Class';
      const group450 = document.createElement('optgroup');
      group450.label = '450 Class';

      // Sort riders by number within each class
      riders250.sort((a, b) => a.number - b.number).forEach(rider => {
        const option = document.createElement('option');
        option.value = rider.id;
        option.textContent = `#${rider.number} - ${rider.firstName} ${rider.lastName}`;
        option.setAttribute('data-profile-url', `/riders/250/${rider.firstName.toLowerCase()}-${rider.lastName.toLowerCase()}/`);
        group250.appendChild(option);
      });

      riders450.sort((a, b) => a.number - b.number).forEach(rider => {
        const option = document.createElement('option');
        option.value = rider.id;
        option.textContent = `#${rider.number} - ${rider.firstName} ${rider.lastName}`;
        option.setAttribute('data-profile-url', `/riders/450/${rider.firstName.toLowerCase()}-${rider.lastName.toLowerCase()}/`);
        group450.appendChild(option);
      });

      // Add change handler to enable profile links
      select.addEventListener('change', (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const profileUrl = selectedOption.getAttribute('data-profile-url');
        const profileLink = select.parentElement.querySelector('.rider-profile-link');
        
        if (profileLink) {
          profileLink.href = profileUrl;
        } else {
          const link = document.createElement('a');
          link.href = profileUrl;
          link.className = 'rider-profile-link text-primary hover:underline ml-2';
          link.textContent = 'View Profile';
          select.parentElement.appendChild(link);
        }
      });

      select.appendChild(group450);
      select.appendChild(group250);
    });
  } catch (error) {
    console.error('Error loading riders:', error);
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  populateRiderList();
});

// Filter results to prioritize saved friends
const sortedResults = results.sort((a, b) => 
  savedFriends.some(f => f.id === a.id) ? -1 : 1
);
updateSearchResults(sortedResults);