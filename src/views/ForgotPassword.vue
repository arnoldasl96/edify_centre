<template>
  <div class="ForgotPassword">
    <div
      :style="{ backgroundImage: `url(${publicPath}Images/bg-4-white.jpg)` }"
      class="container"
    >
     <div  class="form-wrapper">
 
 
         <div class="logo-reg">
          <img :src="`${publicPath}Images/edifylogo.png`" alt="logo" />
        </div>
      <h1>Reset your password</h1>
      <div v-if="sent==false" class="reset">
        <span>
        Enter your user account's verified email address and we will send you a password reset link.
      </span>
      <form @submit.prevent="SendEmail">
         <div class="form-control">
            <label for="Email">Email</label>
            <input
              type="email"
              v-model="email"
              name="email"
              id="email"
              placeholder="type you email here"
              required
            />
          </div>
           <button class="submit" type="submit">send link</button>
      </form>
      </div>
         <div v-if="sent" class="message">
        Check your email inbox link should be there.
    </div>
    </div>


    </div>
  </div>
</template>

<script>
export default {
  name: "ForgotPassword",
  components: {},
  data() {
    return {
      publicPath: process.env.BASE_URL,
      email: "",
      sent:false,
    };
  },
  methods:{
    SendEmail(){
        console.log(this.email);
        this.sent= true;
    },
  }
};
</script>

<style scoped src="../styles/passwordReset.css">
</style>