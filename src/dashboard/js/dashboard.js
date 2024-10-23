const tableBody = document.getElementById('token_data');

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

async function fetchData() {

  const token = getCookie('jwt');

  console.log(token)

  const isProduction = process.env.NODE_ENV === 'development';

  const baseUrl = isProduction ? `${process.env.CORS_ORIGIN}/user/users_tokens`: 'https://pulpo-test-api.onrender.com/user/users_tokens'


  try {
    const response = await fetch(baseUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    const data = await response.json();
    populateTable(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function populateTable(data) {
  tableBody.innerHTML = ''; 
  data.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap">${item.id}</td>
      <td class="px-6 py-4 whitespace-nowrap">${item.token}</td>
    `;
    tableBody.appendChild(row);
  });
}
