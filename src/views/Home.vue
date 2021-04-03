<template>
  <div class="homepage">
    <session></session>
  </div>
</template>

<script>
import session from '../components/session.vue';
export default {
  name: "Home",
  components: {
    session
  }
};
</script>


<style scoped>
.homepage{
  height: 100vh;
  width: 100%;
  display: grid;
  align-content: center;
  justify-content: center;
}
</style>