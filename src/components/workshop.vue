<template>
  <div class="workshop">
    <div class="title">
      <h1>{{ data.title }}</h1>
      <h3>{{ data.code }}</h3>
    </div>
    <div class="short-description">
      <p>{{ data.description }}</p>
    </div>
    <div class="more">
      <button class="btn-more" href="/workshop/:id">see more</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "workshop",
  props: {
    data: Object,
  },
};
</script>

<style scoped>
@import "../styles/variables.css";

.workshop {
  background-color: var(--secondary-color);
  height: fit-content;
  margin: 20px;
  border-radius: 15px;
  border-color: var(--secondary-color-light);
  border: 2px;
  padding: 10px;
}
.title h1,
.title h3 {
  display: inline;
  color: var(--primary-color);
}
.btn-more {
  color: var(--light-color);
  background-color: var(--primary-color);
  float: right;
  font-size: 1.5em;
  padding-inline: 1.5em;
  border-radius: 9px;
}
.more {
  margin-top: 1em;
  height: 2em;
  color: transparent;
}

.short-description {
  color: var(--light-color);
  height: 2em;
  overflow: hidden;
}
h1 {
  margin-right: 2em;
}
</style>