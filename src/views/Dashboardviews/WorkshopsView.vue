<template>
  <div class="wrapper">
    <div class="title"><h1>All workshops</h1> <div class="left"> <router-link :to="{name: 'AddWorkshop'}">Add Workshop </router-link></div></div>

    <div class="list">
      <div class="list-item" v-for="item in coursesList" :key="item.key">
        <workshop :data="item"></workshop>
      </div>
    </div>
  </div>
</template>

<script>
import workshop from "../../components/workshop";
import coursesList from "../../settings/course.json";
export default {
  name: "WorkshopsView",
  components: {
    workshop,
  },
  data() {
    return {
      coursesList,
    };
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>