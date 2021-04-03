<template>
  <div class="workshop-form">
    <form
      class="form-main"
      enctype="multipart/form-data"
      @submit.prevent="handle"
    >
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
            class="description"
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
        <hr class="solid" />
        <div class="files-group">
          <button class="btn btn-primary" @click="AddFile">Add file</button>
          <div
            v-for="(f, k) in WorkshopData.files"
            :key="k"
            class="list-of-files"
          >
            <file-uploader
              @delete-file="DeleteFile"
              :data="f"
              :id="k"
            ></file-uploader>
          </div>
        </div>
        <hr class="solid" />
        <div class="form-group-lg">
          <button @click="AddSession" class="btn btn-primary">
            Add Session
          </button>
          <div
            class="list-of-files"
            v-for="(s, k) in WorkshopData.sessions"
            :key="k"
          >
            <session
              @delete-session="DeleteSession"
              :data="s"
              :id="k"
            ></session>
          </div>
        </div>
        <div class="add-workshop">
          <button class="btn btn-primary" @click="onsubmit">
            Save Workshop
          </button>
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
          <h1>Status</h1>
          <div class="form-group">
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
          <h1>Category</h1>
          <div class="form-group">
            <select
              class="full-size"
              name="category"
              id="category"
              v-model="WorkshopData.category"
            >
              <option value="Leadership" selected>Leadership</option>
              <option value="Personal Skills">Personal Skills</option>
              <option value="Awareness">Awareness</option>
              <option value="Well-being">Well-being</option>
            </select>
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
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import File_Uploader from "./File_Uploader";
import Session from "./session.vue";
import WorkshopServices from "../services/workshop.service";
export default {
  name: "Workshop form",
  emits: ["delete-session", "delete-file"],
  components: {
    QuillEditor,
    "file-uploader": File_Uploader,
    Session,
  },
  data() {
    return {
      short_description: {},
      content: {},
      WorkshopData: {
        sessions: [
          {
            id: "",
          },
        ],
        files: [
          {
            url: "",
            note: "",
          },
        ],
        title: [],
        short_description: [],
        description: [],
        responsible_person: [],
        date: {
          from: [],
          to: [],
        },
        category: "",
        hours: [],
        price: [],
        status: "Published",
      },
    };
  },
  methods: {
    onsubmit() {
      WorkshopServices.CreateWorkshop(this.WorkshopData);
    },
    setNewVal() {
      this.WorkshopData.description = this.$refs.description.getHTML();
      this.WorkshopData.short_description = this.$refs.short_description.getHTML();
    },
    AddFile() {
      this.WorkshopData.files.push({
        url: "",
        note: "",
      });
    },
    DeleteFile(id) {
      if (id == 0) {
        this.WorkshopData.files = [];
      }
      if (id != 0) {
        this.WorkshopData.files.splice(id, 1);
      }
    },
    AddSession() {
      this.WorkshopData.sessions.push({
        id: "",
      });
    },
    DeleteSession(id) {
      this.WorkshopData.sessions.splice(id, 1);
    },
  },
};
</script>
<style src="../styles/form.css">
</style>


