<template>
  <div class="users-view">
    <h1>Users booking requests</h1>
    <select
      id="status"
      v-model="status"
      name="status"
    >
      <option
        selected
        value=""
      >
        Show All
      </option>
      <option value="pending">
        Pending
      </option>
      <option value="declined">
        Declined
      </option>
      <option value="accepted">
        Accepted
      </option>
    </select>
    <div class="list">
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
      if (list === null) {
        return 'nothing found';
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
