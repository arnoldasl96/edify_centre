<template>
  <div>
    <div class="add-workshop">
      <router-link
        v-if="isAdmin"
        class="right btn btn-primary"
        tag="button"
        :to="{ name: 'AddWorkshop' }"
      >
        <i class="fas fa-plus" /> Workshop
      </router-link>
    </div>
    <div class="page-title">
      <h1>All workshops</h1>
    </div>
    <!-- search bar -->
    <div class="list">
      <div class="filtration">
        <div class="select-category">
          <select
            id="custom-select"
            v-model="category"
            class="custom-select"
          >
            <option
              value=""
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
        </div>
        <div class="search">
          <input
            v-model="search"
            aria-label="Search"
            class="input-primary"
            type="text"
            placeholder="Search..."
            @keyup="FilterItems"
          >
        </div>
      </div>
    </div>
    <!-- search bar -->
    <div
      v-if="!loading"
      class="list"
    >
      <workshops-list
        :filtered-list="filteredList"
      />
    </div>
    <div
      v-else
      class="list-loading"
    >
      <workshop-loading />
      <workshop-loading />
      <workshop-loading />
    </div>
  </div>
</template>

<script>
import workshopLoading from '@/components/LoadingSkelets/workshopLoading.vue';
import UserService from '../../services/user.service';
import WorkshopServices from '../../services/workshop.service';
import WorkshopList from './workshopsList.vue';

export default {
  name: 'WorkshopsView',
  components: {
    'workshops-list': WorkshopList,
    workshopLoading,
  },
  data() {
    return {
      isAdmin: false,
      coursesList: [],
      search: '',
      category: '',
      loading: true,
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
      this.loading = false;
    });
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
.search {
  width: 34%;
}
.search input {
  box-shadow: var(--shadow);
}
.select-category {
  width: 30%;
}
.list {
  margin-top: 20px;
  width: 100%;
  display: grid;
  justify-items: center;
  opacity: 1;
  animation: fadein 500ms linear forwards;
}
.list-loading {
  margin-top: 20px;
  width: 100%;
  display: grid;
  justify-items: center;
  opacity: 1;
}
.filtration {
  display: flex;
  width: 80%;
  align-items: center;
  justify-content: space-between;
}
.right {
  float: right;
  margin-right: 35px;
}
.add-workshop {
  position: fixed;
  right: 5px;
  bottom:50px;
  z-index: 2;
}
.add-workshop a {
  margin: 0;
}
</style>
