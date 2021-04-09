<template>
  <div>
    <div class="title">
      <h1>My personal workshops</h1>
    </div>
    <!-- search bar -->
    <div class="filtration">
      <select class="workshop-category" v-model="category">
        <option value="" selected>Select Category</option>
        <option value="Leadership">Leadership</option>
        <option value="Personal Skills">Personal Skills</option>
        <option value="Awareness">Awareness</option>
        <option value="Well-being">Well-being</option>
      </select>

      <input
        aria-label="Search"
        class="search-bar"
        type="text"
        v-model="search"
        @keyup="FilterItems"
        placeholder="Search..."
      />
    </div>
    <!-- search bar -->
    <div class="list">
      <workshop
        v-for="item in filteredList"
        :key="item.key"
        :data="item"
      ></workshop>
    </div>
  </div>
</template>

<script>
import UserService from "../../services/user.service";
import workshop from "../../components/workshop";
export default {
  name: "myWorkshops",
  components: {
    workshop,
  },
  data() {
    return {
      coursesList: [],
      search: "",
      category: "",
    };
  },
  mounted: function () {
    UserService.getMyWorkshops().then((response) => {
      this.coursesList = response.data;
    });
  },
  computed: {
    filteredList: function () {
      if (this.category == null) {
        return this.coursesList.filter((course) => {
          return course.title.match(this.search);
        });
      }
      if (this.category != null) {
        return this.coursesList.filter((course) => {
          return (
            course.title.match(this.search) &&
            course.category.match(this.category)
          );
        });
      }
    },
  },
};
</script>


<style scoped>
h1 {
  text-align: center;
}
.list {
  margin-top: 20px;
  width: 100%;
  display: grid;
  justify-items: center;
}
.filtration {
  display: block;
  text-align: center;
}
.search-bar {
  height: 35px;
  font-size: 20px;
  width: 50%;
  border-radius: 20px;
  margin: 0px auto;
  text-align: left;
}
.search-bar:focus {
  outline: none;
}
.right {
  float: right;
  margin-right: 35px;
}
.workshop-category {
  margin-left: 15px;
  width: 15%;
  border-radius: 19px;
  float: left;
  cursor: pointer;
}
</style>