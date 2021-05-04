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
      <div class="sidebar-hanburger">
        <i
          class="fas fa-bars"
          @click="showSideBar"
        />
      </div>
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
        tag="div"
      >
        login <i class="fas fa-sign-in-alt" />
      </router-link>
      <router-link
        v-if="Loggedin"
        class="nav-link"
        to="/login"
        @click.prevent="logout()"
      >
        <span>  logout<i class="fas fa-sign-in-alt" /></span>
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
    showSideBar() {
      const check = document.getElementById('collapse-sidebar');
      check.checked = !check.checked;
      if (check.checked === true) {
        document.getElementById('side-bar').style.marginLeft = '-120px';
        document.getElementById('side-bar').style.width = '120px';
      } else {
        document.getElementById('side-bar').style.marginLeft = '0px';
        document.getElementById('side-bar').style.width = '330px';
      }
    },
  },
};
</script>

<style scoped src="../styles/navbar.css"></style>
