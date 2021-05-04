<template>
  <div class="users-view">
    <div class="add-new-user">
      <button
        class="btn btn-green"
        @click="newUserModal=true"
      >
        <i class="fas fa-plus" /> User
      </button>
    </div>
    <div class="page-title">
      <h1>System user's List</h1>
    </div>
    <div
      v-if="!loading"
      class="list"
    >
      <table>
        <thead>
          <td>Photo</td>
          <td>first name</td>
          <td>Last name</td>
          <td>role</td>
          <td>email</td>
          <td>action</td>
        </thead>
        <tbody>
          <tr
            v-for="item in usersList"
            :key="item.key"
          >
            <td>
              <img
                :src="`${item.photo}`"
                alt=""
                class="user-image"
              >
            </td>
            <td>{{ item.firstname }}</td>
            <td>{{ item.lastname }}</td>
            <td>{{ item.role }}</td>
            <td>{{ item.email }}</td>
            <td>
              <button class="btn btn-green">
                edit
              </button>
              <button class="btn btn-danger">
                delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="list">
      <square-loader
        :loading="loading"
        :color="spinnerColor"
        :width="width"
        :height="height"
      />
    </div>
    <body-modal
      v-if="newUserModal"
      @close="newUserModal=false"
    >
      <template #body>
        <register-user />
      </template>
    </body-modal>
  </div>
</template>

<script>
import SquareLoader from 'vue-spinner/src/SquareLoader.vue';
import BodyModal from '../../components/BodyModal.vue';
import RegisterUser from '../../components/RegisterUser.vue';
import UserService from '../../services/user.service';

export default {
  name: 'UsersView',
  components: {
    RegisterUser,
    BodyModal,
    SquareLoader,
  },
  data() {
    return {
      height: '100px',
      width: '100px',
      spinnerColor: '#464D5F',
      usersList: [],
      newUserModal: false,
      loading: true,
    };
  },
  mounted() {
    const id = UserService.getId();

    UserService.getUsers().then((res) => {
      this.usersList = res.data.filter((user) => user._id !== id);
      this.loading = false;
    });
  },
  methods: {},
};
</script>

<style scoped>

.users-view > h1 {
  text-align: center;
}
.list {
  width: 100%;
  display: grid;
  justify-items: center;
}
thead {
  font-weight: bold;
  text-transform: capitalize;
  background-color: var(--primary-color-2);
  color: var(--dark-color);
  font-size: large;
}
table {
  color: var(--light-color);
  background-color: var(--secondary-color);
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 80%;
  opacity: 1;
  animation: fadein 500ms linear forwards;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
.add-new-user {
  position: fixed;
  right: 5px;
  bottom: 50px;
  z-index: 2;
}
</style>
