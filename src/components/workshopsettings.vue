<template>
  <div class="settings">
    <div class="form-group capitalize">
      <h1>workshop settings</h1>
    </div>
    <div class="form-group">
      <label for="main-trainer">Main Trainer</label>
      <select
        v-for="i in responsible_person"
        id="main-trainer"
        :key="i._id"
        v-model="workshop.responsible_person[0]"
        class="select-primary"
        name="main-trainer"
      >
        <option :value="`${i._id}`">
          {{ i.firstname + " " + i.lastname }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="status">Status</label>
      <select
        id="status"
        v-model="workshop.status"
        class="select-primary"
        name="status"
      >
        <option value="Published">
          Published
        </option>
        <option value="Draft">
          Draft
        </option>
        <option value="Deleted">
          Deleted
        </option>
        <option value="Unlisted">
          Unlisted
        </option>
        <option value="Completed">
          Completed
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="category">Category</label>
      <select
        id="category"
        v-model="workshop.category"
        class="select-primary"
        name="category"
      >
        <option
          value=""
        >
          Select Category
        </option>
        <option value="Leadership">
          Leadership
        </option>
        <option value="Personal Skills">
          Personal Skills
        </option>
        <option value="Awareness">
          Awareness
        </option>
        <option value="Well-being">
          Well-being
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="price">Price</label>
      <input
        v-model="workshop.price"
        type="number"
        class="input-primary"
        step="0.01"
        placeholder="59.99€"
      >
    </div>
    <div class="form-group">
      <h2>Dates</h2>
      <div class="form-group">
        <label for="from">From</label>
        <input
          id="from"
          v-model="workshop.date.from"
          name="from"
          type="date"
          class="input-primary"
        >
      </div>
      <div class="form-group">
        <label for="to">To</label>
        <input
          id="to"
          v-model="workshop.date.to"
          name="to"
          type="date"
          class="input-primary"
        >
      </div>

      <div class="form-group">
        <input
          id="ComingSoon"
          v-model="workshop.date.ComingSoon"
          type="checkbox"
          name="ComingSoon"
        > <label
          class="inline"
          for="ComingSoon"
        >Coming Soon</label>
      </div>
      <div class="form-group">
        <label for="hours">Hours</label>
        <input
          id="hours"
          v-model="workshop.hours"
          type="number"
          name="hours"
          class="input-primary"
        >
      </div>
    </div>
    <div class="form-group">
      <div class=" flex-row">
        <button
          class="btn btn-danger"
          @click="$emit('close')"
        >
          Close
        </button>
        <button
          class="btn btn-green"
          @click="SaveSettings"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '../services/user.service';
import WorkshopServices from '../services/workshop.service';
import Validation from '../services/Validation';

export default {
  name: 'WorkshopSettings',
  props: ['info'],
  data() {
    return {
      responsible_person: [],
      workshop: {},
    };
  },
  created() {
    this.getTrainers();
    this.workshop = this.info;
    this.workshop.date.from = Validation.FormatDate(this.workshop.date.from);
    this.workshop.date.to = Validation.FormatDate(this.workshop.date.to);
  },
  methods: {
    getTrainers() {
      UserService.getUsersWithRole('trainer').then((res) => {
        this.responsible_person = res.data;
      });
    },
    SaveSettings() {
      WorkshopServices.UpdateInformation(this.workshop._id, this.workshop);
    },
  },
};
</script>

<style scoped>
@import "../styles/variables.css";
.settings {
  margin-top: 30px;
  margin-bottom: 30px;
  min-width: 450px;
  padding: 1px;
  background-color: var(--secondary-color);
  color: white;
}
.select-primary {
    width: 100%;
}
.inline{
    display: inline;
}
</style>
