<template>
  <div class="wrapper">
    <div class="title">
      <h1>All workshops</h1>
    </div>
    <div class="filtration">
      <div class="left">
        <router-link :to="{ name: 'AddWorkshop' }">Add Workshop </router-link>
      </div>
    </div>

    <div class="list">
      <div class="list-item" v-for="item in coursesList" :key="item.key">
        <workshop :data="item"></workshop>
      </div>
    </div>
  </div>
</template>

<script>
import workshop from "../../components/workshop";
import WorkshopServices from "../../services/workshop.service";
export default {
  name: "WorkshopsView",
  components: {
    workshop,
  },
  data() {
    return {
      coursesList: [],
    };
  },
  mounted: function () {
    WorkshopServices.getAllWorkshops().then((response) => {
      this.coursesList = response.data;
    });
    console.log(this.coursesList);
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.left {
  float: left;
}
</style>