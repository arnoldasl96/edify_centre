<template>
  <div class="user-item">
    <img
      src="none"
      alt="none"
    >
    {{ data.firstname }}
    {{ data.lastname }}
    {{ data.role }}
    {{ data.email }}
    <button class="btn btn-primary">
      edit
    </button>
  </div>
</template>

<script>
export default {
  name: 'UserItem',
  // eslint-disable-next-line vue/require-prop-types
  props: ['data'],
};
</script>

<style>
</style>
