<template>
  <div class="nav-container" id="nav">
    <div class="nav-logo">
      <img :src="`${publicPath}Images/edifylogo.png`" alt="logo" />
    </div>

    <div class="nav-list">
      <!-- <router-link class="nav-link" to="/help">Help</router-link>
      <router-link class="nav-link" to="/questions">FAQ </router-link> -->
      <router-link
        class="nav-link wider"
        to="/dashboard/profile"
        v-if="Loggedin"
      >
        <img :src="`${image}`" class="user-image" />
        <div class="user-info">
          <span class="bold capitalize text-sm">{{ Username }}</span>
        </div>
      </router-link>
      <router-link class="nav-link" to="/login" v-if="!Loggedin">
        login <i class="fas fa-sign-in-alt"></i
      ></router-link>
      <router-link
        class="nav-link"
        to="/login"
        v-if="Loggedin"
        @click.prevent="logout()"
      >
        logout <i class="fas fa-sign-in-alt"></i
      ></router-link>
    </div>
  </div>
</template>

<script>
import TokenService from "../services/Token.service";
import UserService from "../services/user.service";
export default {
  name: "Navbar",
  components: {},
  data() {
    return {
      publicPath: process.env.BASE_URL,
      Loggedin: TokenService.getToken(),
      Username: "",
      image: "",
      role: "",
    };
  },
  methods: {
    async logout() {
      TokenService.removeAccessToken();
      TokenService.removeRefreshToken();
      this.$router.push("/login");
    },
  },
  created: function () {
    if (this.Loggedin) {
      this.Username = UserService.getName();
      this.role = UserService.getRole();
      this.image = UserService.getImage();
    }
  },
};
</script>

<style scoped src="../styles/navbar.css"></style>
