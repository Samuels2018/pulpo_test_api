const tokenForm = document.getElementById('token_form')

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

tokenForm.addEventListener('submit', function (e) {
  e.preventDefault()
  tokenNombre = document.getElementById('token_nombre').value
  tokenSimbolo = document.getElementById('token_simbolo').value
  tokenNumber = document.getElementById('token_suministro').value

  const userId = getCookie('user_id');
  const token = getCookie('jwt')

  console.log(tokenNombre, tokenSimbolo, tokenNumber)

  data = {
    tokenNombre,
    tokenSimbolo,
    tokenNumber,
    userId
  }

  submitForm(data)
})

function submitForm(data) {

  const isProduction = process.env.NODE_ENV === 'development';

  const baseUrl = isProduction ? `${process.env.CORS_ORIGIN}/user/create_token_hedera`: 'https://pulpo-test-api.onrender.com/user/create_token_hedera'

  fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    credentials: 'include',
    body: JSON.stringify(data)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  })
  .then(data => {
    console.log('Success:', data)
    window.location.href = '../dashboard/form_dashboard.php';
  })
  .catch(error => {
    console.error('Error:',  error)
    document.getElementById('error-message').innerHTML = error.message;
  })
}