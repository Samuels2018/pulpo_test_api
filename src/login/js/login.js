function redirectRegister () {
  window.location.href = 'src/register/register_form.php'
}

function updatePassword () {
  window.location.href = 'src/update_password/update_password_form.php'
}

const form_data = document.getElementById('login-form-data')
form_data.addEventListener('submit', function (e) {
  e.preventDefault()

  const email = document.getElementById('login_email').value
  const password = document.getElementById('login_password').value

  console.log(email, password)

  data = {
    email,
    password
  }

  formSubmit(data)
})

function formSubmit (data) {

  fetch('https://localhost:3000/auth/login', {
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
    }
  })
  .catch(error => {
    console.error('Error:',  error)
  })
}