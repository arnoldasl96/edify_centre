<template>
  <div
    id="side-bar"
    class="side-bar"
  >
    <div
      class="container"
    >
      <input
        id="collapse-sidebar"
        v-model="collapse"
        type="checkbox"
        name="collapse"
      >
      <label for="collapse-sidebar">
        <i class="fas fa-angle-double-right arrow" /></label>
      <ul>
        <li
          v-for="item in el"
          :key="item.id"
        >
          <router-link
            class="sidebar-link"
            :to="`${item.link}`"
          >
            <i :class="`${item.icon}`" />
            <span>{{ item.name }}</span>
          </router-link>
        </li>
        <li class="logout">
          <router-link
            class="sidebar-link"
            to="/login"
            @click.prevent="logout()"
          >
            <i class="fas fa-sign-in-alt" />
            <span>logout</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import TokenService from '../services/Token.service';
import UserService from '../services/user.service';
import elements from '../settings/links.json';

export default {
  name: 'Sidebar',
  data() {
    return {
      el: [],
      role: '',
      collapse: true,
    };
  },
  watch: {
    collapse() {
      if (this.collapse === true) {
        document.getElementById('side-bar').style.width = '120px';
      } else {
        document.getElementById('side-bar').style.width = '330px';
      }
    },
  },
  created() {
    const sidebarElements = elements;
    this.role = UserService.getRole();

    sidebarElements.sidebar.forEach((item) => {
      item.role.forEach((element) => {
        if (element === 'any') {
          this.el.push(item);
        } else if (element === this.role) {
          this.el.push(item);
        }
      });
    });
  },
  mounted() {
    window.addEventListener('scroll', this.updatePos);
  },
  methods: {
    async logout() {
      TokenService.removeAccessToken();
      TokenService.removeRefreshToken();
      this.$router.push('/login');
    },
    updatePos() {
      this.collapse = true;
    },
  },
};
</script>

<style scoped src="../styles/sidebar.css">
</style>>
