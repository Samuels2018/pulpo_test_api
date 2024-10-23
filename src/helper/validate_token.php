<?php

function checkToken() {
  if (isset($_COOKIE['jwt'])) {
    $token = $_COOKIE['jwt'];
    return true;
  }
  return false;
}