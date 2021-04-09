<template>
  <div class="wrapper">
    <div class="upper-container">
      <div class="profile-photo">
        <img :src="`${publicPath}Images/avatar.jpg`" alt="" />
      </div>
      <div class="profile-information">
        <form>
          <h1>Profile Information</h1>
          <div class="grid-container">
            <div class="form-control">
              <label for="FirstName"> First Name</label>
              <input
                type="text"
                name="FirstName"
                id="FirstName"
                placeholder="First Name"
              />
            </div>
            <div class="form-control">
              <label for="LastName"> Last Name</label>
              <input
                type="text"
                name="LastName"
                id="LastName"
                placeholder="Last Name"
              />
            </div>
            <div class="form-control">
              <label for="birthday">birthday</label>
              <input type="date" name="birthday" id="birthday" />
            </div>
            <div class="form-control">
              <label for="gender"> Gender</label>
              <select name="gender" id="gender">
                <option value="other">other</option>
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="lower-container"></div>
  </div>
</template>

<script>
export default {
  name: "profile",
  props: {},
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
};
</script>

<style scoped>
img {
  height: 300px;
  width: 300px;
}
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.upper-container {
  background-color: white;
  width: 100%;
  height: 45vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}
.lower-container {
  width: 100%;
  height: 45vh;
}
.profile-photo {
  margin: 15px;
  height: 100%;
  width: fit-content;
}
.profile-information {
  height: inherit;
  width: 100%;
  clear: both;
}
.form-control input,
.form-control label {
  display: block;
  font-size: 20px;
  width: 100%;
}
.form-control label {
  text-transform: uppercase;
}
.form-control {
  margin: 0.5em;
}
.grid-container {
  display: grid;
  grid-template: min-content/ auto auto;
}
</style>