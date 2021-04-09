<template>
  <div class="homepage">
    <!-- <modal v-show="showModal" @close="CloseModal">
      <template v-slot:header>
        <h1>Register new user</h1>
      </template>
      <template v-slot:body>
        <Form @submit.prevent="Register">
          <div class="form-control">
            <label for="firstname">firstname</label>
            <Field
              type="text"
              v-model="userData.firstname"
              name="firstname"
              id="firstname"
              required
            />
          </div>
          <div class="form-control">
            <label for="lastname">lastname</label>
            <Field
              type="text"
              v-model="userData.lastname"
              name="lastname"
              id="lastname"
              required
            />
          </div>
          <div class="form-control">
            <label for="Email">Email</label>
            <Field
              type="email"
              v-model="userData.email"
              name="email"
              id="email"
              required
            />
          </div>
          <div class="form-control">
            <label for="Password">Password</label>
            <Field
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
            <Field
              type="password"
              v-model="userData.confirm_password"
              name="Re-password"
              id="Re-password"
              required
              minlength="6"
            />
          </div>
        </Form>
      </template>
    </modal>
    <button @click="openModal">open modal</button> -->
    <WorkshopForm2/>
  </div>
</template>

<script>
import WorkshopForm2 from "../components/WorkshopForm2";
export default {
  name: "Home",
  components: {
    WorkshopForm2
  },
  data() {
    return {
      userData: {
        firstname: null,
        lastname: null,
        role: null,
        email: null,
        password: null,
        confirm_password: null,
      },
      showModal: false,
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    CloseModal() {
      this.showModal = false;
    },
  },
};
</script>


<style scoped>
</style>