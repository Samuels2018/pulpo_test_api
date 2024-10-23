<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario  de Login</title>
    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
  </head>
  <body class="bg-gray-100 flex items-center justify-center min-h-screen">
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

              <a onclick="redirectRegister()" class="text-blue-500">
                Regístrate
              </a>
            </p>
        </div>

        <?php  include '../components/error/error_message.php'; ?>
    </div>
    <script src="./js/login.js">
      
    </script>
  </body>

</html>