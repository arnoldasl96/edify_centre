<template>
  <div class="workshop">
    <div class="title">
      <div
        v-if="!comingSoon"
        class="workshop-date"
      >
        <span
          v-if="started"
          class="started"
        >Started: {{ startingDate }}</span>
        <span
          v-else
          class="started"
        >Starts: {{ startingDate }}</span>
      </div>
      <div
        v-else
        class="workshop-date"
      >
        <span>Starting date will be shown soon</span>
      </div>
      <h1>{{ workshop.title }}</h1>
      <h3>{{ workshop.code }}</h3>
    </div>
    <div class="short-description">
      <div v-html="workshop.short_description" />
    </div>
    <div class="more">
      <router-link
        class="btn-more"
        :to="{ name: 'workshopView', params: { id: workshop._id } }"
        exact
        tag="button"
      >
        see more
      </router-link>
    </div>
  </div>
</template>
<script>
import moment from 'moment';

export default {
  name: 'Workshop',
  props: {
    workshop: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      startingDate: null,
      comingSoon: false,
      started: false,
    };
  },
  mounted() {
    if (this.workshop.date.ComingSoon === false) {
      this.comingSoon = false;
      const years = new Date(this.workshop.date.from).getFullYear();
      const months = new Date(this.workshop.date.from).getMonth();
      const days = new Date(this.workshop.date.from).getDate();
      this.startingDate = moment([years, months, days]).fromNow();
      if (this.startingDate.includes('ago')) {
        this.started = true;
      }
      if (this.startingDate.includes('Invalid')) {
        this.ComingSoon = true;
      }
    } else {
      this.comingSoon = true;
    }
  },
};
</script>

<style scoped src='../styles/workshopview.css'>
</style>
