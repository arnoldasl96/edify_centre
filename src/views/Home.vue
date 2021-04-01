<template>
  <div class="homepage">
  <Navbar/>
  <WorkshopForm/>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import WorkshopForm from '../components/WorkshopForm'
export default {
  name: "Home",
  components: {
    Navbar,
    WorkshopForm,
  }
};
</script>
