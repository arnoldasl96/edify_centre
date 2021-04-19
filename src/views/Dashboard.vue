<template>
  <div>
    <Navbar />
    <div
      id="dashboard"
      class="dashboard"
      @scroll="handleScroll"
    >
      <Sidebar />
      <div class="main-container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';
import Navbar from '../components/Navbar.vue';

export default {
  name: 'Dashboard',
  components: {
    Sidebar,
    Navbar,
  },
  data() {
    return {
      scrollPosition: Number,
    };
  },
  methods: {},
};
</script>

<style scoped src="../styles/dashboard.css"></style>
