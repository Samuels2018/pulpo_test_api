<?php
if(isset($_COOKIE['user_name'])) {
  $user_name = $_COOKIE['user_name'];
} else {
  $user_name = "No token found";
}

?>


<nav class="flex justify-between items-center px-4 py-2 bg-white shadow-md w-full">
  <a href="#" class="flex items-center">
    <img src="your-logo.svg" alt="Logo" class="w-8 h-8 mr-2">
  </a>
  <div user_info_name class="flex items-center">
    <span id="user_info_name" class="text-gray-700 mr-4"><?php echo htmlspecialchars($user_name);  ?></span>
    <button type="button" class="text-red-500 hover:text-red-700">Logout</button>
  </div>
</nav>