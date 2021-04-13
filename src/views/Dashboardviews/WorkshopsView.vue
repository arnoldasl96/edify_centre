<template>
  <div>
    <div class="title">
      <h1>All workshops</h1>
    </div>
    <!-- search bar -->
    <div class="filtration">
      <!-- <div class="left">
        <input type="text" v-model="search" @keyup="FilterItems">

      </div>
       -->
      <select
        v-model="category"
        class="workshop-category"
      >
        <option
          value=""
          selected
        >
          Select Category
        </option>
        <option value="Leadership">
          Leadership
        </option>
        <option value="Personal Skills">
          Personal Skills
        </option>
        <option value="Awareness">
          Awareness
        </option>
        <option value="Well-being">
          Well-being
        </option>
      </select>

      <input
        v-model="search"
        aria-label="Search"
        class="search-bar"
        type="text"
        placeholder="Search..."
        @keyup="FilterItems"
      >

      <router-link
        v-if="isAdmin"
        class="right btn btn-primary"
        tag="button"
        :to="{ name: 'AddWorkshop' }"
      >
        <i class="fas fa-plus" /> Workshop
      </router-link>
    </div>
    <!-- search bar -->
    <div class="list">
      <workshop
        v-for="item in filteredList"
        :key="item.key"
        :data="item"
      />
    </div>
  </div>
</template>

<script>
import workshop from '../../components/workshop.vue';
import UserService from '../../services/user.service';
import WorkshopServices from '../../services/workshop.service';

export default {
  name: 'WorkshopsView',
  components: {
    workshop,
  },
  data() {
    return {
      isAdmin: false,
      coursesList: [],
      search: '',
      category: '',
    };
  },
  computed: {
    filteredList() {
      if (this.category == null) {
        return this.coursesList.filter((course) => course.title.match(this.search));
      }
      if (this.category != null) {
        return this.coursesList.filter((course) => (
          course.title.match(this.search)
            && course.category.match(this.category)
        ));
      }
      return this.coursesList;
    },
  },
  mounted() {
    if (UserService.getRole() === 'admin') {
      this.isAdmin = true;
    }
    WorkshopServices.getAllWorkshops().then((response) => {
      this.coursesList = response.data;
    });
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
