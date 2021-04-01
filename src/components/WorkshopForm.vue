<template>
  <div class="workshop-form">
    <form @submit.prevent="handle">
      <div class="main">
        <div class="centered">
          <h1>Create a Workshop</h1>
        </div>
        <div class="form-group">
          <label for="Title">Title</label>
          <input
            type="text"
            name="Title"
            id="Title"
            placeholder="workshop title"
            v-model="WorkshopData.title"
          />
        </div>
        <div class="form-group">
          <label for="short-description">Short Description</label>

          <QuillEditor
            @update:content="setNewVal"
            theme="snow"
            toolbar="minimal"
            id="short-description"
            ref="short_description"
            :content="short_description"
          />
        </div>
        <div class="form-group">
          <label for="description">Description</label>

          <QuillEditor
            @update:content="setNewVal"
            ref="description"
            theme="snow"
            scrollingContainer="true"
            toolbar="full"
            id="description"
            :content="content"
            scrola
          />
        </div>
        <div class="add-lesson">
          <button @click="onsubmit">onsubmit</button>
        </div>
      </div>
      <div class="secondary">
        <div class="card">
          <h1>Contribution</h1>
          <div class="form-group">
            <label for="resp-person">Responsible person</label>
            <select
            multiple
              class="full-size"
              name="resp-person"
              id="resp-person"
              v-model="WorkshopData.responsible_person"
            >
              <option value="obj">obje</option>
              <option value="obj1">obje1</option>
            </select>
          </div>
        </div>
        <div class="card">
          <h1>Publish</h1>
          <div class="form-group">
            <label for="status">Status</label>
            <select
              class="full-size"
              
              name="status"
              id="status"
              v-model="WorkshopData.status"
            >
              <option value="Published" selected>Published</option>
              <option value="Draft">Draft</option>
              <option value="Deleted">Deleted</option>
              <option value="Unlisted">Unlisted</option>
               <option value="Completed">Completed</option>
            </select>
          </div>

          <div class="form-group">
            <label for="access">Access</label>
            <select
              class="full-size"
              name="access"
              id="access"
              v-model="WorkshopData.access"
            >
            
              <option value="Private" selected>Private</option>
              <option value="Published">Public</option>
            </select>
          </div>
        </div>
        <div class="card">
          <h1>Pricing</h1>
          <div class="form-group">
            <label for="price">price</label>
            <input
              min="0"
              type="number"
              name="price"
              id="price"
              placeholder="59.99€"
              v-model="WorkshopData.price"
            />
          </div>
        </div>

        <div class="card">
          <h1>Duration</h1>
          <div class="form-group">
            <label for="Workshop-dates"> Workshop Date</label>
            <div class="inner" id="Workshop-dates">
              <label for="from">from</label>
              <input
                type="date"
                name="from"
                id="from"
                v-model="WorkshopData.date.from"
              />
              <label for="to">to</label>
              <input
                type="date"
                name="to"
                id="to"
                v-model="WorkshopData.date.to"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="Workshop-hours">workshop hours</label>
            <input
              type="number"
              name="Workshop-hours"
              id="Workshop-hours"
              v-model="WorkshopData.hours"
            />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { QuillEditor, } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
export default {
  name: "Workshop form",
  components: {
    QuillEditor,
  },
  data() {
    return {
      short_description:{},
      content:{},
      WorkshopData: {
        title: [],
        short_description: [],
        description: [],
        responsible_person: [],
        date: {
          from: [],
          to: [],
        },
        hours: [],
        price: [],
        status: "Published",
        access: "Private",
      },
    };
  },
  methods: {
    onsubmit(){
      console.log(this.WorkshopData);
    },
    setNewVal() {
     this.WorkshopData.description = this.$refs.description.getHTML()
     this.WorkshopData.short_description = this.$refs.short_description.getHTML()
    }
  },
};
</script>
<style scoped src="../styles/form.css">
</style>


