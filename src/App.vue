<template>
<div class="app" >
  <router-view/>
</div>
  
</template>
<script>
export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
}
</script>
<style>
html { 
  background: url('./assets/bg-4.png') no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
#app 
{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100vh;
}
*{
    padding:0;
    margin:0;
    text-decoration: none;
    list-style: none;
    box-sizing: border-box;
}
</style>
