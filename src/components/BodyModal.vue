<template>
  <transition name="modal-fade">
    <div class="main-modal ">
      <div class="modal-backdrop">
        <div
          class="modal white"
          role="dialog"
        >
          <div class="modal-body ">
            <div class="close">
              <i
                class="fas fa-times pointer"
                @click="close"
              />
            </div>
            <slot name="body" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'BodyModal',
  props: ['info'],
  data() {
    return {
      workshopData: {},
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style src="../styles/modal.css">

</style>
