<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario de Registro</title>
    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
  </head>
  <body class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div 
      class="w-full max-w-md px-6 py-4 bg-white shadow-md overflow-hidden rounded-lg">
      <h2 class="text-center text-2xl font-bold mb-4">Crear Cuenta</h2>
      <form id="register_form_data" class="space-y-4"> 
        <div>
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Correo electrónico</label>
          <input 
            class="shadow appearance-none border rounded 
            w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="register_email" 
            type="email" 
            placeholder="Ingrese su correo electrónico"
          >
        </div>  

        <div>
          <label for="username" class="block text-gray-700 text-sm font-bold mb-2">Nombre de Usuario</label>
          <input 
            class="shadow appearance-none border rounded w-full py-2 px-3 
            text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="register_username" 
            type="text" 
            placeholder="Ingrese su nombre de usuario"
          >
        </div>  

        <div>
          <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
          <input 
            class="shadow appearance-none border rounded w-full py-2 px-3 
            text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="register_name" 
            type="text" 
            placeholder="Ingrese su nombre"
          >
        </div>  

        <div>
          <label for="phone" class="block text-gray-700 text-sm font-bold mb-2">Telefono</label>
          <input 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
            leading-tight focus:outline-none focus:shadow-outline" 
            id="register_phone" 
            type="tel"  
            placeholder="Ingrese su teléfono"
          >
        </div>
        <div>
          <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
          <input 
            class="shadow appearance-none border rounded w-full 
            py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="register_password" 
            type="password" 
            placeholder="******************"
          >
        </div>

        <div>
          <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Confimar Contraseña</label>
          <input 
            class="shadow appearance-none border rounded w-full 
            py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="confirm_password" 
            type="password" 
            placeholder="******************"
          >
        </div>

        <div class="flex items-center justify-between">
          <button 
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold 
            py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            type="submit"
          >  

            Crear Cuenta
          </button>  

          <a href="#" onclick="redirecLogin()" class="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800">
            ¿Ya posees una cuenta?
          </a>
        </div>
      </form>

      <div id="error-message">

      </div>

    </div>

    <script>
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
        fetch('http://localhost:3000/auth/register', {
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
