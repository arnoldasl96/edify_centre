<template>
  <div class="side-bar" :class="[sticky ? [collapse ? 'small' : 'large'] : '']">
    <div class="container" :class="[sticky ? 'sticky' : '']">
      <input
        type="checkbox"
        name="collapse"
        id="collapse-sidebar"
        v-model="collapse"
      />
      <label for="collapse-sidebar">
        <i class="fas fa-angle-double-right arrow"></i
      ></label>
      <ul>
        <li v-for="item in el" :key="item.id">
          <router-link class="sidebar-link" :to="`${item.link}`">
            <i :class="`${item.icon}`"></i>
            <span>{{ item.name }}</span>
          </router-link>
        </li>
        <li class="logout">
          <router-link
            @click.prevent="logout()"
            class="sidebar-link"
            to="/login"
          >
            <i class="fas fa-sign-in-alt"></i>
            <span>logout</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { withDirectives } from "vue";
import TokenService from "../services/Token.service";
import UserService from "../services/user.service";
import elements from "../settings/links.json";

export default {
  name: "Sidebar",
  data() {
    return {
      el: [],
      role: "",
      sticky: false,
      collapse: true,
    };
  },
  methods: {
    async logout() {
      TokenService.removeAccessToken();
      TokenService.removeRefreshToken();
      this.$router.push("/login");
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
  created: function () {
    const sidebarElements = elements;
    this.role = UserService.getRole();

    sidebarElements.sidebar.forEach((item) => {
      item.role.forEach((element) => {
        if (element == "any") {
          this.el.push(item);
        } else if (element == this.role) {
          this.el.push(item);
        }
      });
    });
  },
  mounted() {
    window.addEventListener("scroll", this.updatePos);
  },
};
</script>

<style scoped src="../styles/sidebar.css">
</style>>
