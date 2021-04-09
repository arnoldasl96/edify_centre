<template>
  <div class="user-item">
    <img src="none" alt="none" />
    {{ this.data.firstname }}
    {{ data.lastname }}
    {{ data.role }}
    {{ data.email }}
    <button class="btn btn-primary">edit</button>
  </div>
</template>

<script>
export default {
  name: "user-item",
  props: ["data"],
};
</script>

<style>
</style>