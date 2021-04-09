<template>
  <div class="login">
    <div class="message">
      <h1>logins:</h1>
      <h3>admin</h3>
      <span> email:admin@admin.com </span>
      <span> password:admin123 </span>
      <button
        @click.prevent="fillLoginForm('admin@admin.com', 'admin123')"
        class="submit"
      >
        fill admin
      </button>
      <h3>student</h3>
      <span> email:student@student.com </span>
      <span> password:student </span>
      <button
        @click.prevent="fillLoginForm('student@student.com', 'student')"
        class="submit"
      >
        fill student
      </button>
      <h3>teacher</h3>
      <span> email:teacher@teacher.com </span>
      <span> password:teacher </span>
      <button
        @click.prevent="fillLoginForm('teacher@teacher.com', 'teacher')"
        class="submit"
      >
        fill teacher
      </button>
    </div>
    do coming soon
    <!-- <div class="text">
  <h1>Edify Centre</h1>
  <p>combines innovation, experience, non-formal education, passion and hard work and create learning tools
     and methods to help the growth, development and well-being of each company or individual we provide training for.
     Throughout our trainings and workshops, we enhance  human interaction, with unique and flexible cooperation ways of 
     learning</p>
</div> -->

    <div class="login-side">
      <img :src="`${publicPath}Images/edifylogo.png`" alt="logo" />
      <form @submit.prevent="handleLogin" @keydown="clearErrors">
        <div class="form-control">
          <label for="Email">Email</label>
          <input
            type="email"
            v-model="loginData.email"
            name="email"
            id="email"
            required
          />
        </div>
        <div class="form-control">
          <label for="Password">Password</label>
          <input
            type="password"
            v-model="loginData.password"
            name="password"
            id="password"
            required
          />
        </div>

        <div class="form-control">
          <span v-show="error != ''" style="color: red">{{ error }}</span>
        </div>

        <button class="submit" type="submit">Login</button>

        <router-link class="new-account" to="/registration"
          >Don't have an account yet ? </router-link
        ><br />
        <router-link class="forgot-pass" to="/forgotPassword">
          Forgot a password ?</router-link
        >
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TokenService from "../services/Token.service";
import UserService from "../services/user.service";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      publicPath: process.env.BASE_URL,
      loginData: {
        email: "",
        password: "",
      },
      error: "",
    };
  },
  methods: {
    clearErrors() {
      this.error = "";
    },
    fillLoginForm(email, password) {
      this.loginData.email = email;
      this.loginData.password = password;
    },
    async handleLogin() {
      try {
        const Response = await axios.post("user/login", this.loginData);
        if (Response.data.message == "success") {
          TokenService.setAccessToken(Response.data.accessToken);
          TokenService.setRefreshToken(Response.data.refreshToken);
          UserService.getName();
          this.$router.push({ name: "WorkshopsList" });
        }
      } catch (error) {
        if (error.response) {
          this.error = error.response.data.message;
        } else if (error.request) {
          this.error = error.request;
        } else {
          this.error = "Error: " + error.message;
        }
      }
    },
  },
};
</script>
<style scoped src="../styles/login.css"></style>