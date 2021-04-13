<template>
  <div class="users-view">
    <h1>System user's List</h1>
    <div class="list">
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
              <button class="btn btn-primary">
                edit
              </button>
              <button class="btn btn-primary">
                delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import UserService from '../../services/user.service';

export default {
  name: 'UsersView',
  components: {
  },
  data() {
    return {
      usersList: [],
    };
  },
  mounted() {
    const id = UserService.getId();

    UserService.getUsers().then((res) => {
      this.usersList = res.data.filter((user) => user._id !== id);
    });
  },
  methods: {},
};
</script>

<style scoped>
@import "../../styles/variables.css";
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
}
table {
  color: white;
  background-color: var(--secondary-color);
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 95%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
</style>
