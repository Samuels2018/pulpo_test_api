<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario de Creación de Token</title>
    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
  </head>
  <body class="bg-gray-100">
    
    
    <div class="container mx-auto px-4 sm:px-8">
      <?php include '../components/navbar/navbar.php'; ?>
      <h1 class="text-3xl font-bold mb-8">Crear Nuevo Token en Hedera</h1>

      <form id="token_form" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="nombre">
            Nombre del Token
          </label>
          <input 
            class="shadow appearance-none border rounded w-full 
            py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="token_nombre" 
            type="text" 
            placeholder="Ingrese el nombre del token"
          >
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="simbolo">
            Símbolo del Token
          </label>
          <input 
            class="shadow appearance-none border rounded w-full
            py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  
            id="token_simbolo" 
            type="text" 
            placeholder="Ingrese el símbolo del token (máx. 8 caracteres)"
          >
        </div>
        <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="suministro">
                Suministro Inicial
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 
              text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="token_suministro"
              type="number" 
              placeholder="Ingrese el suministro inicial"
            >
        </div>
        <div class="flex items-center justify-between">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">  
            Crear Token
          </button>
        </div>
      </form>
    </div>

    <script>
      const tokenForm = document.getElementById('token_form')
      
      tokenForm.addEventListener('submit', function (e) {
        e.preventDefault()
        tokenNombre = document.getElementById('token_nombre').value
        tokenSimbolo = document.getElementById('token_simbolo').value
        tokenNumber = document.getElementById('token_suministro').value
      
        console.log(tokenNombre, tokenSimbolo, tokenNumber)
      
        userId = 5
      
        data = {
          tokenNombre,
          tokenSimbolo,
          tokenNumber,
          userId
        }
      
        submitForm(data)
      })
      
      function submitForm(data) {
        let flag = false
      
        fetch('http://localhost:3000/user/create_token_hedera', {
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
        })
        .catch(error => {
          console.error('Error:',  error)
        })
      
        if (flag == true) {
          window.location.href = '../dashboard/form_dashboard.php'
          flag = false;
        }
      }

    </script>

  </body>
</html>