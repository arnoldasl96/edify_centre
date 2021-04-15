<template>
  <div class="workshop-form">
    <form
      class="form-main"
      @submit.prevent="onsubmit"
    >
      <div class="main">
        <div class="centered">
          <h1>Create a Workshop</h1>
        </div>
        <div class="form-group">
          <label for="Title">Title</label>
          <input
            id="Title"
            v-model="WorkshopData.title"
            type="text"
            name="Title"
            placeholder="workshop title"
          >
          <div
            v-if="Validation.title"
            class="error"
          >
            <span>{{ Validation.title }}</span>
          </div>
        </div>
        <div class="form-group">
          <label for="short-description">Short Description</label>

          <QuillEditor
            id="short-description"
            ref="short_description"
            theme="snow"
            toolbar="minimal"
            :content="short_description"
            @update:content="setNewVal"
          />
        </div>
        <div class="form-group">
          <label for="description">Description</label>

          <QuillEditor
            id="description"
            ref="description"
            class="description"
            theme="snow"
            scrolling-container="true"
            toolbar="full"
            :content="description"
            @update:content="setNewVal"
          />
        </div>
        <hr class="solid">
        <div class="files-group">
          <button
            type="button"
            class="btn btn-primary"
            @click="AddFile"
          >
            <i class="fas fa-plus" /> file
          </button>
          <div class="list-of-files">
            <file-uploader
              v-for="f in filesList"
              :id="f._id"
              :key="f._id"
              :ref="`file-uploader-${f._id}`"
              :data="f"
              @delete-file="DeleteFile"
              @add-file="SaveFile"
            />
          </div>
        </div>
        <hr class="solid">
        <div class="form-group-lg">
          <button
            type="button"
            class="btn btn-primary"
            @click="AddSession"
          >
            <i class="fas fa-plus" />session
          </button>
          <div class="list-of-files">
            <session
              v-for="s in SessionsList"
              :id="s.Arrayid"
              :key="s.Arrayid"
              :ref="`Session-${s.Arrayid}`"
              :details="s"
              @delete-session="RemoveSession"
              @save-session-id="SaveSession"
              @edit-session="EditSession"
            />
          </div>
        </div>
        <div class="add-workshop">
          <button
            class="btn btn-primary"
            type="submit"
          >
            Save Workshop
          </button>
        </div>
      </div>

      <div class="secondary">
        <div class="card">
          <h1>Contribution</h1>
          <div class="form-group">
            <label for="resp-person">Main trainer</label>
            <select
              v-for="i in responsible_person"
              id="resp-person"
              :key="i._id"
              v-model="WorkshopData.responsible_person"
              class="full-size"
              name="resp-person"
            >
              <option :value="`${i._id}`">
                {{ i.firstname + " " + i.lastname }}
              </option>
            </select>
            <div
              v-if="Validation.main_trainer"
              class="error"
            >
              <span>{{ Validation.main_trainer }}</span>
            </div>
          </div>
        </div>
        <div class="card">
          <h1>Status</h1>
          <div class="form-group">
            <select
              id="status"
              v-model="WorkshopData.status"
              class="full-size"
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
        </div>
        <div class="card">
          <label for="price"><h1>Pricing</h1></label>
          <div class="form-group">
            <input
              id="price"
              v-model="WorkshopData.price"
              step="0.01"
              type="number"
              name="price"
              placeholder="59.99€"
            >
            <div
              v-if="Validation.price"
              class="error"
            >
              <span>{{ Validation.price }}</span>
            </div>
          </div>
        </div>
        <div class="card">
          <h1>Category</h1>
          <div class="form-group">
            <select
              id="category"
              v-model="WorkshopData.category"
              class="full-size"
              name="category"
            >
              <option
                value=""
                selected
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
            <div
              v-if="Validation.category"
              class="error"
            >
              <span>{{ Validation.category }}</span>
            </div>
          </div>
        </div>
        <div class="card">
          <h1>Duration</h1>
          <div class="form-group">
            <label for="Workshop-dates"> Workshop Date</label>
            <div
              id="Workshop-dates"
              class="inner"
            >
              <label for="Datefrom">from</label>
              <input
                id="Datefrom"
                v-model="WorkshopData.date.from"
                type="date"
                name="Datefrom"
              >

              <label for="Dateto">to</label>
              <input
                id="Dateto"
                v-model="WorkshopData.date.to"
                type="date"
                name="Dateto"
                :disabled="WorkshopData.date.from == null"
              >
            </div>
            <div
              v-if="Validation.dates"
              class="error"
            >
              <span>{{ Validation.dates }}</span>
            </div>
          </div>
          <div class="form-group">
            <label for="Workshop-hours">workshop hours</label>
            <input
              id="Workshop-hours"
              v-model="WorkshopData.hours"
              type="number"
              name="Workshop-hours"
            >
          </div>
          <div
            v-if="Validation.hours"
            class="error"
          >
            <span>{{ Validation.hours }}</span>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import Session from './sessionForm.vue';
import UserService from '../services/user.service';
import FileUploader from './FileUploader.vue';
import WorkshopServices from '../services/workshop.service';
import {
  ValidateCategory, ValidateDates, ValidatePrice, ValidateTitle,
  ValidateTrainer, ValidateHours,
} from '../services/Validation';

export default {
  name: 'Workshopform',
  components: {
    QuillEditor,
    Session,
    FileUploader,
  },
  emits: ['delete-session', 'delete-file'],
  data() {
    return {
      Validation: {
        title: null,
        main_trainer: null,
        price: null,
        category: null,
        dates: null,
        hours: null,
      },
      filesList: [
        {
          _id: 0,
          url: '',
          note: '',
        },
      ],
      SessionsList: [
        {
          Arrayid: 0,
          id: '',
        },
      ],
      short_description: {},
      description: {},
      responsible_person: '',

      WorkshopData: {
        sessions: [],
        files: [],
        title: '',
        short_description: '',
        description: '',
        responsible_person: '',
        date: {
          from: null,
          to: null,
        },
        category: '',
        hours: null,
        price: null,
        status: 'Published',
      },
    };
  },
  mounted() {
    UserService.getUsersWithRole('trainer').then((response) => {
      this.responsible_person = response.data;
    });
  },
  methods: {
    onsubmit() {
      this.CallFileUploaders();
      this.CallSessionForms();
      this.Validation.title = ValidateTitle(this.WorkshopData.title).error;
      this.Validation.main_trainer = ValidateTrainer(this.WorkshopData.responsible_person).error;
      this.Validation.dates = ValidateDates(this.WorkshopData.date.from,
        this.WorkshopData.date.to).error;
      this.Validation.category = ValidateCategory(this.WorkshopData.category).error;
      this.Validation.price = ValidatePrice(this.WorkshopData.price).error;
      this.Validation.hours = ValidateHours(this.WorkshopData.hours).error;

      if (this.Validation.title === null
        || this.Validation.dates === null
        || this.Validation.category === null
        || this.Validation.price === null
        || this.Validation.hours === null
        || this.Validation.main_trainer === null) {
        WorkshopServices.CreateWorkshop(this.WorkshopData).then((res) => {
          if (res.data.WorkshopId !== null) {
            this.$router.push({ name: 'WorkshopsList' });
          }
        });
      }
    },
    setNewVal() {
      this.WorkshopData.description = this.$refs.description.getHTML();
      this.WorkshopData.short_description = this.$refs.short_description.getHTML();
    },

    /*= ===================================
      File-uploader methods
      ====================================
    */
    SaveFile(uploadedFile) {
      this.WorkshopData.files.push(uploadedFile);
    },
    AddFile() {
      this.filesList.push({
        id: this.filesList.length,
        url: '',
        note: '',
      });
    },
    DeleteFile(id, wasUploaded, uploadedFile) {
      if (wasUploaded) {
        WorkshopServices.DeleteFile(uploadedFile);
        this.filesList = this.filesList.filter((file) => file.id !== id);
        this.WorkshopData.files = this.WorkshopData.files.filter((file) => file !== uploadedFile);
      }
      this.filesList = this.filesList.filter((file) => file.id !== id);
    },

    CallFileUploaders() {
      const fileUploaderList = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const [fileUploader, value] of Object.entries(this.$refs)) {
        if (/^file-uploader/.test(fileUploader)) {
          if (value != null) {
            fileUploaderList.push({ fileUploader: value });
          }
        }
      }
      if (fileUploaderList !== []) {
        if (fileUploaderList.length > 1) {
          fileUploaderList.forEach((el) => {
            el.fileUploader.AddFile();
          });
        }
        if (fileUploaderList.length === 1 && fileUploaderList[0].fileUploader.file !== null) {
          fileUploaderList[0].fileUploader.AddFile();
        }
      }
    },
    /*= ===================================
      File-uploader methods
      ====================================
    */
    /*= ===================================
      Session add,remove,upload methods
      ====================================
    */
    EditSession(SessionId) {
      this.WorkshopData.sessions = this.WorkshopData.sessions.filter((id) => id !== SessionId);
      WorkshopServices.DeleteSession(SessionId);
    },
    SaveSession(id) {
      this.WorkshopData.sessions.push(id);
    },
    AddSession() {
      this.SessionsList.push({
        Arrayid: this.SessionsList.length,
      });
    },
    RemoveSession(id) {
      this.SessionsList = this.SessionsList.filter((session) => session.Arrayid !== id);
    },

    CallSessionForms() {
      const SessionRefsList = [];

      // eslint-disable-next-line no-restricted-syntax
      for (const [session, value] of Object.entries(this.$refs)) {
        if (/^Session/.test(session)) {
          SessionRefsList.push({ session: value });
        }
      }
      if (SessionRefsList.length !== []) {
        SessionRefsList.forEach((i) => {
          if (i.session.session.title !== '') {
            i.session.AddSession();
          }
        });
      }
    },
  }, /* methods */
};
</script>
<style src="../styles/form.css"></style>
