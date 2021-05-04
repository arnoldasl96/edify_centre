<template>
  <div class="register-user">
    <h1 class="header-modal">
      Register a new user
    </h1>
    <div class="form">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="userData.email"
          class="input-primary"
          type="email"
          name="email"
        >
      </div>
      <div class="form-group">
        <label for="firstname">Firstname</label>
        <input

          id="firstname"
          v-model="userData.firstname"
          class="input-primary"
          type="text"
          name="firstname"
        >
      </div>

      <div class="form-group">
        <label for="lastname">Lastname</label>
        <input
          id="lastname"
          v-model="userData.lastname"
          class="input-primary"
          type="text"
          name="lastname"
        >
      </div>

      <div class="form-group">
        <label>Role</label>
        <div class="flex-row">
          <div class="inner-form">
            <input
              id="r1"
              type="radio"
              name="radio"
              value="admin"
            >
            <label for="r1">admin</label>
          </div>
          <div class="inner-form">
            <input
              id="r2"
              type="radio"
              name="radio"
              value="student"
              checked
            >
            <label for="r2">student</label>
          </div>
          <div class="inner-form">
            <input
              id="r3"
              type="radio"
              name="radio"
              value="trainer"
            >
            <label for="r3">trainer</label>
          </div>
        </div>
      </div>
      <div class="flex-row">
        <button
          class="btn btn-danger"
          type="reset"
        >
          Cancel
        </button>
        <button
          class="btn btn-green"
          type="submit"
        >
          Register
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterUser',
  components: {

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

};
</script>

<style>
.homepage{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
}

.register-user{
  background-color: var(--secondary-color);
  color: var(--light-color);
  min-width: 300px;
  height: 500px;
  border-radius: 5px;
}
.register-user > div > div> label {
  text-align: center;
}
.inner-form {
  display: flex;
  justify-content: center;
  align-items: center;
}
input[type=radio] {
  margin: 5px;
}
.header-modal {
  margin: 40px 20px;
}
</style>
