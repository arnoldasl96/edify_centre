<template>
  <div class="homepage" />
</template>

<script>

export default {
  name: 'Home',
  components: {
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

<style scoped src="../styles/form.css">
.homepage{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
}
</style>
