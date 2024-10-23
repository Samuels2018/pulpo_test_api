const navbarUserInfo = document.getElementById('user_info_name')

async function fetchData() {
  try {
    const response = await fetch('https://your-api-endpoint'); // Replace with your API endpoint
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    const data = await response.json();
    populateTable(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// user_info_name
function populateTable(data) {
  navbarUserInfo.innerHTML = `<span id="user_info_name" class="text-gray-700 mr-4">${data.userName || 'Usuario'}</span>`
}