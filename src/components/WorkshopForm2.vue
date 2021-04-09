<template>
  <div class="workshop-form">
    <form @submit.prevent="onsubmit" class="form-main">
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
          <!-- <ErrorMessage name="Title" class="error" /> -->
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
            :content="description"
            scrola
          />
        </div>
        <hr class="solid" />
        <div class="files-group">
          <button type="button" class="btn btn-primary" @click="AddFile">
            <i class="fas fa-plus"></i> file
          </button>
          <div class="list-of-files">
            <file-uploader
              v-for="f in filesList"
              :key="f._id"
              :ref="`file-uploader-${f._id}`"
              @delete-file="DeleteFile"
              :data="f"
              :id="f._id"
            />
          </div>
        </div>
        <hr class="solid" />
        <div class="form-group-lg">
          <button type="button" @click="AddSession" class="btn btn-primary">
            <i class="fas fa-plus"></i>session
          </button>
          <div class="list-of-files">
            <session
              v-for="s in SessionsList"
              :key="s.Arrayid"
              :ref="`Session-${s.Arrayid}`"
              @delete-session="RemoveSession"
              :details="s"
              :id="s.Arrayid"
            />
          </div>
        </div>
        <div class="add-workshop">
          <button class="btn btn-primary" type="submit">Save Workshop</button>
        </div>
      </div>

      <div class="secondary">
        <div class="card">
          <h1>Contribution</h1>
          <div class="form-group">
            <label for="resp-person">Main trainer</label>
            <select
              class="full-size"
              name="resp-person"
              id="resp-person"
              v-model="this.WorkshopData.responsible_person"
              v-for="i in this.responsible_person"
              :key="i._id"
            >
              <option :value="`${i._id}`">
                {{ i.firstname + " " + i.lastname }}
              </option>
            </select>
            <!-- <ErrorMessage class="error" name="resp-person" /> -->
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
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
              <option value="Deleted">Deleted</option>
              <option value="Unlisted">Unlisted</option>
              <option value="Completed">Completed</option>
            </select>
            <!-- <ErrorMessage class="error" name="status" /> -->
          </div>
        </div>
        <div class="card">
          <label for="price"><h1>Pricing</h1></label>
          <div class="form-group">
            <input
              step="0.01"
              type="number"
              name="price"
              id="price"
              placeholder="59.99€"
              v-model="WorkshopData.price"
            />
            <!-- <ErrorMessage class="error" name="price" /> -->
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
              <option value="" selected>Select Category</option>
              <option value="Leadership">Leadership</option>
              <option value="Personal Skills">Personal Skills</option>
              <option value="Awareness">Awareness</option>
              <option value="Well-being">Well-being</option>
            </select>
            <!-- <ErrorMessage class="error" name="category"></ErrorMessage> -->
          </div>
        </div>
        <div class="card">
          <h1>Duration</h1>
          <div class="form-group">
            <label for="Workshop-dates"> Workshop Date</label>
            <div class="inner" id="Workshop-dates">
              <label for="Datefrom">from</label>
              <input
                type="date"
                name="Datefrom"
                id="Datefrom"
                v-model="WorkshopData.date.from"
              />

              <label for="Dateto">to</label>
              <input
                type="date"
                name="Dateto"
                id="Dateto"
                :disabled="WorkshopData.date.from == null"
                v-model="WorkshopData.date.to"
              />
            </div>
            <!-- <ErrorMessage class="error" name="Datefrom"></ErrorMessage> -->
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
import Session from "./sessionForm.vue";
import WorkshopServices from "../services/workshop.service";
import UserService from "../services/user.service";
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
      filesList: [
        {
          _id: 0,
          url: "",
          note: "",
        },
      ],
      SessionsList: [
        {
          Arrayid: 0,
          id:"",
        },
      ],
      short_description: {},
      description: {},
      responsible_person: "",

      WorkshopData: {
        sessions: [],
        files: null,

        title: "",
        short_description: [],
        description: [],
        responsible_person: "",
        date: {
          from: null,
          to: null,
        },
        category: "",
        hours: null,
        price: null,
        status: "Published",
      },
    };
  },
  mounted: function () {
    UserService.getUsersWithRole("trainer").then((response) => {
      this.responsible_person = response.data;
    });
  },
  methods: {
    onsubmit() {
      this.CallFileUploaders();
      this.CallSessionForms();
      this.WorkshopData.files = this.filesList;

      this.SessionsList.forEach(element => {
        console.log(element)
       // this.WorkshopData.sessions.push(element.id)
      });
     // WorkshopServices.CreateWorkshop(this.WorkshopData);

    },
    setNewVal() {
      this.WorkshopData.description = this.$refs.description.getHTML();
      this.WorkshopData.short_description = this.$refs.short_description.getHTML();
    },

    /*====================================
      File-uploader methods
      ====================================
    */
    AddFile() {
      this.filesList.push({
        _id: this.filesList.length,
        url: "",
        note: "",
      });
    },
    DeleteFile(item) {
      this.filesList = this.filesList.filter((file) => {
        return file._id != item._id;
      });
    },

    CallFileUploaders() {
      let file_uploader_list = [];
      for (let [file_uploader, value] of Object.entries(this.$refs)) {
        if (/^file-uploader/.test(file_uploader)) {
          if(value !=null)
            file_uploader_list.push({ file_uploader: value });
        }
      }
      if (file_uploader_list != []) {
        if (file_uploader_list.length > 1) {
          file_uploader_list.forEach((el) => {
            el.file_uploader.AddFile();
          });
        }
        if (
          file_uploader_list.length == 1 &&
          file_uploader_list[0].file_uploader.file != null
        ) {
          file_uploader_list[0].file_uploader.AddFile();
        }
      }
    },
    /*====================================
      File-uploader methods
      ====================================
    */
    /*====================================
      Session add,remove,upload methods
      ====================================
    */
    AddSession() {
      this.SessionsList.push({
        Arrayid: this.SessionsList.length,
      });
    },
    RemoveSession(id) {
      this.SessionsList = this.SessionsList.filter((session) => {
        return session.Arrayid != id;
      });
    },

    CallSessionForms() {
      let session_form_list = [];
      for (let [session, value] of Object.entries(this.$refs)) {
        if (/^Session/.test(session)) {
          session_form_list.push({ session: value });
        }
      }
      console.log(session_form_list)
      if (session_form_list.length != []) {
        session_form_list.forEach((i) => {
          if (
            i.session.title != "" ||
            i.session.description != "" ||
            i.session.filesList != []
          ) {
            i.session.AddSession();
          }
        });
      }
    },
  } /* methods */,
};
</script>
<style src="../styles/form.css">
</style>


