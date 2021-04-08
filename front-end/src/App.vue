<template>
<div id="app">
  <div class="logo">
    <img src="/logo/index.png">
  </div>
  <router-view />
  <footer>
      <p>Author: Alex Zapalac</p>
      <p><a href="https://github.com/alexzapalac/Creative-Project-04.git">Github Repository</a></p>
  </footer>
</div>
</template>

<style>
body {
  font-family: 'Arvo';
  font-size: 16px;
  padding: 20px 100px 0px 100px;
  background: #f3f3f3;
}


.logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
</style>
