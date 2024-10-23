function redirectRegister () {
  window.location.href = 'src/register/register_form.php'
}

function updatePassword () {
  window.location.href = 'src/update_password/update_password_form.php'
}

const form_data = document.getElementById('login-form-data')
form_data.addEventListener('submit', function (e) {
  e.preventDefault()

  const loginEmail = document.getElementById('login_email').value
  const loginPassword = document.getElementById('login_password').value

  console.log(loginEmail, loginPassword)

  data = {
    loginEmail,
    loginPassword
  }

  formSubmit(data)
})

function formSubmit (data) {

  const isProduction = process.env.NODE_ENV === 'development';

  const baseUrl = isProduction ? `${process.env.CORS_ORIGIN}/auth/login`: 'https://pulpo-test-api.onrender.com/auth/login'

  fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
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
    if (data.token) {
      document.cookie = `jwt=${data.token}; expires=${new Date(Date.now() + 3600000).toUTCString()}; path=/`;
      document.cookie = `user_name=${data.user_name}; expires=${new Date(Date.now() + 3600000).toUTCString()}; path=/`;
      document.cookie = `user_id=${data.id}; expires=${new Date(Date.now() + 3600000).toUTCString()}; path=/`;
    }
    window.location.href = '../dashboard/form_dashboard.php';
  })
  .catch(error => {
    console.error('Error:',  error)
    document.getElementById('error-message').innerHTML = error.message;
  })
}