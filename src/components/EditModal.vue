<template>
  <transition name="modal-fade">
    <div class="main-modal">
      <div
        class="modal-backdrop"
        @click="close"
      />

      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          id="modalTitle"
          class="modal-header white"
        >
          <slot name="header" />
        </header>

        <section
          id="modalDescription"
          class="modal-body white"
        >
          <slot name="body" />
        </section>

        <footer class="modal-footer white">
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  mounted() {},
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped src="../styles/modal.css">

</style>
