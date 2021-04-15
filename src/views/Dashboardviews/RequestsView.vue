<template>
  <div class="users-view">
    <h1>Users booking requests</h1>
    <div class="center">
      <select
        id="status"
        v-model="status"
        name="status"
      >
        <option
          value=""
        >
          Show All
        </option>
        <option
          selected
          value="pending"
        >
          Pending
        </option>
        <option value="declined">
          Declined
        </option>
        <option value="accepted">
          Accepted
        </option>
      </select>
    </div>

    <div
      v-if="filteredList"
      class="list"
    >
      <table>
        <thead>
          <td>Student</td>
          <td>email</td>
          <td>workshop name</td>

          <td>request date</td>
          <td>request status</td>
          <td v-if="status != 'accepted'">
            action
          </td>
        </thead>
        <tbody>
          <tr
            v-for="item in filteredList"
            :key="item.key"
          >
            <td>{{ item.student.fullName }}</td>
            <td>{{ item.student.email }}</td>
            <td>{{ item.workshop.title }}</td>
            <td>{{ item.info.request_send }}</td>
            <td>{{ item.info.status }}</td>
            <td v-if="item.info.status != 'accepted'">
              <button
                class="btn btn-green"
                @click="update(item, 'accepted')"
              >
                <i class="fas fa-check" />
              </button>
              <button
                v-if="item.info.status != 'declined'"
                class="btn btn-danger"
                @click="update(item, 'declined')"
              >
                <i class="fas fa-trash-alt" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-if="!filteredList"
      class="list "
    >
      <div class="not-found">
        <span>no requests found with status '{{ status }}'</span>
      </div>
    </div>
  </div>
</template>

<script>
import BookingServices from '../../services/Booking.service';

export default {
  name: 'Requests',
  data() {
    return {
      status: '',
      requests: null,
      fetchedData: [],
    };
  },
  computed: {
    filteredList() {
      if (this.status === '') {
        return this.fetchedData;
      }
      const list = this.fetchedData.filter((el) => el.info.status.match(this.status));
      if (list.length === 0) {
        return null;
      }
      return list;
    },
  },
  created() {
    this.fetchRequests();
  },
  methods: {
    fetchRequests() {
      BookingServices.getRequests().then((res) => {
        this.fetchedData = res.data;
      });
    },
    update(item, action) {
      const update = {
        data: item,
        status: action,
      };
      const id = this.fetchedData.findIndex((el) => el === item);
      if (id !== -1) {
        this.fetchedData[id].info.status = action;
      }
      BookingServices.UpdateRequest(update);
    },
  },
};
</script>

<style scoped>
@import "../../styles/variables.css";
.not-found{
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: var(--shadow);
  font-weight: 600;
  text-align: center;
  font-size: 2rem;
  color: var(--primary-color);
  background-color: var(--secondary-color);
  height: 80px;
  width: 80%;

}
.center {
  display: flex;
  justify-content: center;
  height: 3rem;
}
.users-view > h1 {
  text-align: center;
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
.list{
      width: 100%;
    display: grid;
    justify-items: center;
}
</style>
