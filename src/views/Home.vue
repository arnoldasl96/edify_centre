<template>
  <div class="homepage">
    <spinner />
  </div>
</template>

<script>
import spinner from '../components/LoadingSkelets/spinner.vue';

export default {
  name: 'Home',
  components: {
    spinner,

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
.homepage{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
}
</style>
