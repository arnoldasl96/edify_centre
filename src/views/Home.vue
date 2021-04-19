<template>
  <div class="homepage">
    <register-user />
  </div>
</template>

<script>
import RegisterUser from '../components/RegisterUser.vue';

export default {
  name: 'Home',
  components: {
    RegisterUser,

  },
  data() {
    return {
      userData: {
        firstname: null,
        lastname: null,
        role: null,
        email: null,
        password: null,
        confirm_password: null,
      },
      showModal: false,
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    CloseModal() {
      this.showModal = false;
    },
  },
};
</script>

<style scoped>
@import "../styles/variables.css";
.homepage{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
}
</style>
