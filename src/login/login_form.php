<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario  de Login</title>
    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
  </head>
  <body class="bg-gray-100 flex items-center justify-center min-h-screen">
    <?php
      header("Access-Control-Allow-Origin: *");

      // Permitir métodos HTTP específicos
      header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
      
      // Permitir encabezados específicos
      header("Access-Control-Allow-Headers: Content-Type, Authorization");
    ?>
    <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
      <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
        <h2 class="text-center text-2xl font-bold mb-4">Iniciar Sesión</h2>
            <form id="login-form-data">
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                  Correo electrónico
                </label>
                <input 
                  class="shadow appearance-none border rounded w-full py-2 
                    px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  
                    id="login_email" 
                    type="email" 
                    placeholder="Ingrese su correo electrónico"
                  >
              </div>  

              <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                  Contraseña
                </label>
                <input 
                  class="shadow appearance-none border border-red-500 
                    rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight  
                    focus:outline-none focus:shadow-outline" 
                    id="login_password" 
                    type="password" 
                    placeholder="******************"
                  >
              </div>
              <div class="flex items-center justify-between">
                <button 
                  class="bg-blue-500 hover:bg-blue-700 text-white 
                  font-bold  py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                  type="submit"
                >
                Iniciar Sesión
                </button>  

                <a href="#" class="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800">
                  ¿Olvidaste tu contraseña?
                  <a href="#" onclick="redirigir()">Redireccionar</a>
                </a>
              </div>
            </form>
            <p class="text-center mt-4">
              ¿No tienes una cuenta?

              <a href="#" onclick="redirectRegister()" class="text-blue-500">
                Regístrate
              </a>
            </p>
        </div>
    </div>
    <script>
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

  fetch('http://localhost:3000/auth/login', {
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
    window.location.href = '../dashboard/form_dashboard.php';
  })
  .catch(error => {
    console.error('Error:',  error)
    document.getElementById('error-message').innerHTML = error.message;
  })
}
    </script>
  </body>

</html>