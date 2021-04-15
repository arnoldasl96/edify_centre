<template>
  <transition name="modal-fade">
    <div class="main-modal">
      <div
        class="modal-backdrop"
        @click="close"
      />

      <div
        :class="`${type}`"
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          id="modalTitle"
          class="modal-header"
        >
          <slot name="header" />
        </header>

        <section
          id="modalDescription"
          class="modal-body"
        >
          <slot name="body" />
        </section>

        <footer class="modal-footer">
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  // eslint-disable-next-line vue/require-prop-types
  props: ['type'],
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
