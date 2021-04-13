<template>
  <div
    class="side-bar"
    :class="[sticky ? [collapse ? 'small' : 'large'] : '']"
  >
    <div
      class="container"
      :class="[sticky ? 'sticky' : '']"
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
      sticky: false,
      collapse: true,
    };
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
      if (window.scrollY < 100) {
        this.sticky = false;
      }
      if (window.scrollY > 100) {
        this.sticky = true;
        this.collapse = true;
      }
    },
  },
};
</script>

<style scoped src="../styles/sidebar.css">
</style>>
