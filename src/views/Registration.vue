<template>
  <div class="registration">
    <div
      :style="{ backgroundImage: `url(${publicPath}Images/bg-4-white.jpg)` }"
      class="container"
    >
      <div class="registration-side">
        <div class="logo-reg">
          <img :src="`${publicPath}Images/edifylogo.png`" alt="logo" />
        </div>
        <form @submit.prevent="handleSubmit" @keydown="clearErrors">
          <div class="form-control">
            <label for="firstname">firstname</label>
            <input
              type="text"
              v-model="userData.firstname"
              name="firstname"
              id="firstname"
              required
            />
          </div>
          <div class="form-control">
            <label for="lastname">lastname</label>
            <input
              type="text"
              v-model="userData.lastname"
              name="lastname"
              id="lastname"
              required
            />
          </div>
          <div class="form-control">
            <label for="Email">Email</label>
            <input
              type="email"
              v-model="userData.email"
              name="email"
              id="email"
              required
            />
          </div>
          <div class="form-control">
            <label for="Password">Password</label>
            <input
              type="password"
              v-model="userData.password"
              name="password"
              id="password"
              required
              minlength="6"
            />
          </div>

          <div class="form-control">
            <label for="Re-password">confirm password</label>
            <input
              type="password"
              v-model="userData.confirm_password"
              name="Re-password"
              id="Re-password"
              required
              minlength="6"
            />
          </div>
          <div v-show="error != ''" class="form-control">
            <span style="color: red">{{ error }}</span>
          </div>
          <button class="submit" type="submit">Registration</button>
          <div class="form-control">
            <router-link class="back-to-login" to="/login"
              >have an account already? Login</router-link
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Registration",
  components: {},
  data() {
    return {
      publicPath: process.env.BASE_URL,
      userData: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirm_password: "",
      },
      error: "",
    };
  },
  methods: {
    clearErrors() {
      this.error = "";
    },
    async handleSubmit() {
      if (this.userData.password !== this.userData.confirm_password) {
        this.error = "passwords do not match !";
      }
      const Response = await axios.post("user/registration/", {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password,
        role: "student",
      });
      if (Response.data.message == "success") {
        this.$router.push("/login");
      }
    },
  },
};
</script>
<style scoped src="../styles/registration.css">
</style>