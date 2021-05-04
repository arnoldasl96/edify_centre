<template>
  <div class="users-view">
    <div class="page-title">
      <h1>Users booking requests</h1>
    </div>
    <div class="center">
      <div class="select">
        <select
          id="status"
          v-model="status"
          name="status"
          class="custom-select"
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
    </div>

    <div
      v-if="filteredList && !loading"
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
            <td>{{ item.user.firstname }} {{ item.user.lastname }} </td>
            <td>{{ item.user.email }}</td>
            <td>{{ item.workshop.title }}</td>
            <td>{{ momentFormatter(item.request_send).format('MMMM Do YYYY, HH:MM') }}</td>
            <td>{{ item.status }}</td>
            <td v-if="item.status != 'accepted'">
              <button
                class="btn btn-green"
                @click="update(item, 'accepted')"
              >
                <i class="fas fa-check" />
              </button>
              <button
                v-if="item.status != 'declined'"
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
      v-if="!filteredList && !loading"
      class="list "
    >
      <div class="not-found">
        <span>no requests found with status '{{ status }}'</span>
      </div>
    </div>
    <square-loader
      :loading="loading"
      :color="spinnerColor"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script>
import moment from 'moment';
import SquareLoader from 'vue-spinner/src/SquareLoader.vue';
import BookingServices from '../../services/Booking.service';

export default {

  name: 'Requests',
  components: {
    SquareLoader,
  },
  data() {
    return {
      spinnerColor: '#EC7404',
      status: 'pending',
      requests: null,
      fetchedData: [],
      momentFormatter: moment,
      loading: true,
      height: '100px',
      width: '100px',
    };
  },
  computed: {
    filteredList() {
      if (this.status === '') {
        return this.fetchedData;
      }
      const list = this.fetchedData.filter((el) => el.status.match(this.status));
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
        this.fetchedData = res.data.booking;
        this.loading = false;
      });
    },
    update(item, action) {
      const update = {
        data: item,
        status: action,
      };
      const id = this.fetchedData.findIndex((el) => el === item);
      if (id !== -1) {
        this.fetchedData[id].status = action;
      }
      BookingServices.UpdateRequest(update);
    },
  },
};
</script>

<style scoped>
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
  height: 4rem;
}
.users-view > h1 {
  text-align: center;
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
  width: 90%;
  opacity: 1;
  animation: fadein 500ms linear forwards;
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
.select {
  width: 50%;
}
</style>
