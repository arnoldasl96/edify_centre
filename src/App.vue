<template>
  <div class="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
};
</script>
<style>
@import "./styles/variables.css";
@import "./styles/animations.css";
.page-title {
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
}
.custom-select {
  height: 40px;
  width: 100%;
  border-radius: 3px;
  float: left;
  border: none;
  background-color: #f2f2f2;
  box-shadow: var(--shadow);
  cursor: pointer;
}
.not-scroll{
  overflow:hidden;
}
.flex-row{
  display: flex;
  justify-content: space-between;
}
.input-primary {
  height: 40px;
   border: none;
  -webkit-appearance: none;
  -ms-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: #f2f2f2;
  padding: 12px;
  border-radius: 3px;
  width: 100%;
  outline: none;
  font-size: 14px;
}
.btn {
  box-shadow: var(--shadow);
  cursor: pointer;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  color: var(--light-color);
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: capitalize;
  font-size: 16px;
  margin: 8px;
  min-width: 100px;
}
.btn-primary {
  background-color: var(--primary-color);
  transition: ease 100ms;
}

.btn-add {
  background-color:  var(--secondary-color);
  transition: ease 100ms;
}
.btn-danger {
  background-color: var(--secondary-color-light);
  transition: ease 100ms;
}
.btn-green {
  background-color: var(--primary-color-2);
  transition: ease 100ms;
}
.btn-primary:hover,
.btn-add:hover,
.btn-danger:hover,
.btn-green:hover {
  transform: scale(1.1);
  transition: ease 100ms;
}
.btn-add:hover {
  background-color: var(--secondary-color-1);
  transition: ease 100ms;
}
.btn-danger:hover {
  background-color: rgba(221, 14, 14, 1);
  transition: ease 100ms;
}
input[type="file"] {
  opacity: 0;
}
.error {
  display: block;
  color: #ba3939;
  background: #ffe0e0;
  border: 1px solid #a33a3a;
}
html {
  background: url("./assets/bg-4.png") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100vh;
}
* {
  padding: 0;
  margin: 0;
  text-decoration: none;
  list-style: none;
  box-sizing: border-box;
}
*:focus,
*:hover {
  outline: none;
}

.user-image {
  border-radius: 50%;
  height: 50px;
  width: 50px;
}
.text-sm {
  font-size: small;
}
.bold {
  font-weight: bold;
}
.capitalize {
  text-transform: capitalize;
}
</style>
