<template>
  <Navbar />
  <div class="dashboard"  @scroll="handleScroll">
    <Sidebar />
    <div class="main-container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
export default {
  name: "Dashboard",
  components: {
    Sidebar,
    Navbar,
  },
  data(){
    return{
      scrollPosition:Number
    }
  },
  methods:{
  }
};
</script>

<style scoped src="../styles/dashboard.css"></style>