<template>
  <div class="list">
    <workshop
      v-for="item in filteredList"
      :key="item._id"
      :workshop="item"
    />
  </div>
</template>

<script>
import workshop from '@/components/workshop.vue';

export default {
  name: 'WorkshopList',
  components: {
    workshop,
  },
  props: [
    'filteredList',
  ],
};
</script>

<style>

</style>
