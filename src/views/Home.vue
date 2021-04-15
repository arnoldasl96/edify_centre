<template>
  <div class="homepage">
    <workshopsettings />
  </div>
</template>

<script>
import Workshopsettings from '../components/workshopsettings.vue';

export default {
  name: 'Home',
  components: {
    Workshopsettings,

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
