<!DOCTYPE html>
<html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Dashboard Responsivo</title>
      <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
    </head>
  <body class="bg-gray-100">
    <?php
      require('../helper/validate_token');

      if (!checkToken()) {
        header("Location: ../login/login_form.php");
        exit();
      }

    ?>

    <div class="container mx-auto px-4 sm:px-8">
 
      <?php include '../components/navbar/navbar.php'; ?>
      <h1 class="text-3xl font-bold mb-8">Mi Dashboard</h1>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div class="bg-white shadow-md rounded px-4 py-2">
            <p class="text-xl font-bold">Numero de tokens</p>
            <p class="text-gray-700">$10,000</p>
          </div>
        </div>

        <div class="mt-8">
          <h2 class="text-2xl font-bold mb-4">Descripcion de Tokens</h2>
          <div class="container mx-auto px-4 sm:px-8">

            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th 
                      class="px-6 py-3 bg-gray-50 text-left text-xs  
                      font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ID
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">  
                      Nombre
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">  
                      Email
                    </th>
                      <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">  
                        Fecha de Nacimiento
                      </th>
                  </tr>  
                </thead>
                <tbody id="token_data" class="bg-white divide-y divide-gray-200">
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <?php include '../components/footer/footer.php'; ?>
    <script src="./js/dashboard.js"></script>
  </body>
</html>