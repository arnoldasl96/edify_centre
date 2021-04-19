<template>
  <div
    id="nav"
    class="nav-container"
  >
    <div class="nav-logo">
      <img
        :src="`${publicPath}Images/edifylogo.png`"
        alt="logo"
      >
    </div>

    <div class="nav-list">
      <router-link
        v-if="Loggedin"
        class="nav-link wider"
        :to="`/profile`"
      >
        <img
          :src="`${image}`"
          class="user-image"
        >
        <div class="user-info">
          <span class="bold capitalize text-sm">{{ Username }}</span>
        </div>
      </router-link>
      <router-link
        v-if="!Loggedin"
        class="nav-link"
        to="/login"
      >
        login <i class="fas fa-sign-in-alt" />
      </router-link>
      <router-link
        v-if="Loggedin"
        class="nav-link"
        to="/login"
        @click.prevent="logout()"
      >
        logout <i class="fas fa-sign-in-alt" />
      </router-link>
    </div>
  </div>
</template>

<script>
import TokenService from '../services/Token.service';
import UserService from '../services/user.service';

export default {
  name: 'Navbar',
  components: {},
  data() {
    return {
      publicPath: process.env.BASE_URL,
      Loggedin: TokenService.getToken(),
      Username: '',
      image: '',
      role: '',
    };
  },
  created() {
    if (this.Loggedin) {
      this.Username = UserService.getName();
      this.role = UserService.getRole();
      this.image = UserService.getImage();
    }
  },
  methods: {
    async logout() {
      TokenService.removeAccessToken();
      TokenService.removeRefreshToken();
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped src="../styles/navbar.css"></style>
