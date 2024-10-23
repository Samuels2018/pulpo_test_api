<?php
require 'vendor/autoload.php';

require('./src/helper/validate_token.php');


header("Access-Control-Allow-Origin: *"); // Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Cabeceras permitidas

// Verificar si el token es válido
if (checkToken()) {
  header("Location: src/dashboard/form_dashboard.php");
  exit();
} else {
  // Si el token no es válido, redirigir a la página de login
  header("Location: src/login/login_form.php");
  exit();
}
