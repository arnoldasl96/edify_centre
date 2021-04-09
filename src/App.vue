<template>
  <div class="app">
    <router-view />
  </div>
  <!-- teleport target -->
  <div id="modals"></div>
</template>
<script>
import * as VeeValidate from "vee-validate";
export default {
  name: "App",
  components: {
    VeeValidate,
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
};
</script>
<style>
.btn-margin-sm {
  margin: 5px;
}
.btn-margin-md {
  margin: 10px;
}
.btn-margin-lg {
  margin: 15px;
}
.btn-margin-xl {
  margin: 20px;
}
.btn {
  cursor: pointer;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  color: white;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 8px;
}
.btn-primary {
  background-color: var(--primary-color);
  transition: ease 100ms;
}

.btn-add {
  background-color: rgba(50, 117, 224, 0.863);
  transition: ease 100ms;
}
.btn-danger {
  background-color: rgba(221, 14, 14, 0.897);
  transition: ease 100ms;
}
.btn-green {
  background-color: rgba(108, 241, 55, 0.753);
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
  background-color: rgba(50, 117, 224, 1);
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
  widows: 50px;
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
