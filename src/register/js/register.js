function redirecLogin() {
  window.location.href = 'src/login/login_form.php'
}

const register_form_data = document.getElementById('register_form_data')

register_form_data.addEventListener('submit', function (e) {
  e.preventDefault()

  const registerEmail = document.getElementById('register_email').value
  const registerUsername = document.getElementById('register_username').value
  const registerName = document.getElementById('register_name').value
  const registerPhone = document.getElementById('register_phone').value
  const registerPassword = document.getElementById('register_password').value
  const confirmPassword = document.getElementById('confirm_password').value

  console.log(registerEmail,registerUsername,registerName,registerPhone,registerPassword,confirmPassword)
  userStatus = 1

  data = {
    registerEmail,
    registerUsername,
    registerName,
    registerPhone,
    registerPassword,
    confirmPassword,
    userStatus
  }

  submitForm(data)
})

function submitForm() {
  const isProduction = process.env.NODE_ENV === 'development';

  const baseUrl = isProduction ? `${process.env.CORS_ORIGIN}/auth/register`: 'https://pulpo-test-api.onrender.com/auth/register'



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