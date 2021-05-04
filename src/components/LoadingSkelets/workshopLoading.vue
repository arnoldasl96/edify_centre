<template>
  <div class="workshop">
    <div class="starting-loading" />
    <div class="title-loading" />
    <div class="description-loading" />
    <transition
      v-if="loading"
      name="see-more-loading"
      tag="div"
    >
      <div class="see-more-loading" />
    </transition>
  </div>
</template>
<script>
export default {
  name: 'WorkshopLoading',
  data() {
    return {
      loading: true,
    };
  },
};
</script>

<style scoped src='../../styles/workshopview.css'>

</style>
