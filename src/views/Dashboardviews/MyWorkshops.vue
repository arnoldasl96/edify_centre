<template>
  <div>
    <div class="title">
      <h1>My personal workshops</h1>
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
      class="list"
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
import WorkshopList from './workshopsList.vue';

export default {
  name: 'MyWorkshops',
  components: {
    'workshops-list': WorkshopList,
    workshopLoading,
  },
  data() {
    return {
      loading: true,
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
    UserService.getMyWorkshops().then((response) => {
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
.list {
  margin-top: 20px;
  width: 100%;
  display: grid;
  justify-items: center;
  opacity: 1;
  animation: fadein 500ms linear forwards;
}
.filtration {
  display: flex;
  width: 80%;
  align-items: center;
  justify-content: space-between;
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
</style>
