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

  data = {
    registerEmail,
    registerUsername,
    registerName,
    registerPhone,
    registerPassword,
    confirmPassword
  }

  submitForm(data)
})

function submitForm() {
  fetch('https://localhost:3000/auth/register', {
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
    window.location.href = '../dashboard/form_dashboard.php';
  })
  .catch(error => {
    console.error('Error:',  error)
    document.getElementById('error-message').innerHTML = error.message;
  })
}