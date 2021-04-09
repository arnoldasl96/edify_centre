<template>
  <transition name="modal-fade">
    <div class="main-modal">
      <div @click="close" class="modal-backdrop"></div>

      <div
        :class="`${type}`"
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <slot name="header"></slot>
        </header>

        <section class="modal-body" id="modalDescription">
          <slot name="body"></slot>
        </section>

        <footer class="modal-footer"><slot name="footer"> </slot></footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["type"],
  name: "modal",
  methods: {
    close() {
      this.$emit("close");
    },
  },
  mounted: function () {},
};
</script>

<style>
@import "../styles/variables.css";
.main-modal {
  position: fixed;
  z-index: 99;
  width: 100%;
  min-height: 100vh;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 100;
}
.white {
  background: #fff;
}
.success {
  background-color: #7de98fd2;
}
.danger {
  background-color: #e97d7dd2;
}

.modal {
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  z-index: 101;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: var(--secondary-color);
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: var(--secondary-color);
  background: transparent;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>