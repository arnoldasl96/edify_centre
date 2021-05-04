<template>
  <div
    v-if="!loading"
    class="workshop-page"
  >
    <div
      v-if="isAdmin"
      class="toggle-register"
    >
      <div class="form-group">
        <label
          class="switch"
          for="toggle"
        >
          <input
            id="toggle"
            v-model="toggle"
            type="checkbox"
            name="toggle"
            @change="showAll = !showAll"
          >
          <span class="slider" />
        </label>
        Toggle Registration Page
      </div>

      <button
        v-if="isAdmin"
        class="btn btn-green floting"
        @click="showSettingsModal"
      >
        change settings
      </button>
    </div>
    <div
      v-if="showAll"
      class="workshop-view"
    >
      <h1 id="title">
        {{ workshopdata.title }}
      </h1>
      <div
        v-if="!EnableEdit"
        class="general-information"
      >
        <i
          v-if="canEdit"
          class="fas fa-pen edit"
          @click="EnableEdit=true"
        />
        <h1>General information</h1>
        <div class="time-stamp">
          <div class="coming-soon">
            <h2 v-if="workshopdata.date.ComingSoon">
              Coming soon
            </h2>
            <div
              v-if="workshopdata.date.ComingSoon === false"
              class="starts"
            >
              <h2>
                {{ momentParser(workshopdata.date.from).format("MMM Do YY") }} -
                {{ momentParser(workshopdata.date.to).format("MMM Do YY") }}
              </h2>
            </div>
          </div>
        </div>
        <div
          class="description"
          v-html="workshopdata.description"
        />
        <div
          v-for="file in workshopdata.files"
          :key="file.id"
          class="files"
        >
          <div class="file-item">
            <span
              class="fiv-viv fiv-size-md"
              :class="getIconCode(file.type)"
            />
            <a
              class="file-link"
              :href="`${file.url}`"
            >
              <span v-if="file.note == ''">{{ file.url }}</span>
              <span v-if="file.note != ''">{{ file.note }}</span>
            </a>
          </div>
        </div>
      </div>
      <div
        v-if="EnableEdit"
        class="general-information"
      >
        <h1>Edit Enabled</h1>
        <div class="form-group">
          <label for="title1">Title</label>
          <input
            id="title1"
            v-model="workshopdata.title"
            type="text"
            name="title"
            class="input-primary"
          >
        </div>
        <div class="form-group">
          <label for="short_description">short description</label>
          <QuillEditor
            id="short_description"
            ref="short_description"
            class="short_description"
            theme="snow"
            scrolling-container="false"
            toolbar="full"
            @v-model:content="workshopdata.short_description"
            @update:content="OnChange('short_description')"
            @ready="setContent('short_description')"
          />
        </div>
        <div class="form-group">
          <label for="description">description</label>
          <QuillEditor
            id="description"
            ref="description"
            theme="snow"
            scrolling-container="false"
            toolbar="full"
            @v-model:content="workshopdata.description"
            @update:content="OnChange('description')"
            @ready="setContent('description')"
          />
        </div>
        <div class="form-group">
          <button
            class="btn btn-add"
            @click="AddFile"
          >
            Add File
          </button>
          <div
            v-if="workshopdata.files.length!==0"
            class="files-list"
          >
            <div
              v-for="f in workshopdata.files"
              :key="f.id"
              class="file-item"
            >
              <file-uploader
                :id="f.id"
                :key="f.id"
                :ref="`file-uploader-${f.id}`"
                :stored-file="f"
                :data="f"
                @delete-file="DeleteFile"
                @add-file="SaveFile"
              />
            </div>
          </div>
          <div
            v-if="workshopdata.files.length ===0"
            class="files-list"
          >
            <div class="form-group">
              <label for="files"> no files uploaded yet click "add file" to add new file</label>
            </div>
          </div>
        </div>
        <div class="form-group">
          <button
            class="btn-primary btn"
            @click="SaveSettings"
          >
            save
          </button>
        </div>
      </div>
      <div class="addSession">
        <button
          v-if="canEdit"
          class="btn btn-green left"
          @click="showSessionModal"
        >
          <i class="fas fa-plus" /> Session
        </button>
      </div>
      <!-- sessions -->
      <div class="sessions-list">
        <div
          v-for="i in sessions"
          :key="i"
          class="general-information"
        >
          <i
            v-if="canEdit"
            class="fas fa-pen edit"
            @click="showSessionModal(i._id)"
          />
          <i
            v-if="canEdit"
            class="fas fa-trash-alt delete"
            @click="RemoveSession(i._id)"
          />

          <h1>{{ i.title }}</h1>
          <div class="time-stamp">
            <div class="coming-soon">
              <h2 v-if="i.attendance_date.ComingSoon">
                Coming soon
              </h2>
              <div
                v-if="i.attendance_date.ComingSoon === false"
                class="starts"
              >
                <h2>
                  {{ momentParser(i.attendance_date.starts).format("MMM Do YY, HH:MM") }} -
                  {{ momentParser(i.attendance_date.ends).format("HH:MM") }}
                </h2>
              </div>
            </div>
          </div>
          <div
            class="description"
            v-html="i.description"
          />
          <div
            v-for="file in i.files"
            :key="file.id"
            class="files"
          >
            <div class="file-item">
              <span
                class="fiv-viv fiv-size-md"
                :class="getIconCode(file.type)"
              />
              <a
                class="file-link"
                :href="`${file.url}`"
              >
                <span v-if="file.note == ''">{{ file.name }}</span>
                <span v-if="file.note != ''">{{ file.note }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- sessions -->
    </div>
    <div
      v-if="!showAll"
      class="workshop-view"
    >
      <h1 id="title">
        {{ workshopdata.title }}
      </h1>
      <div class="general-information">
        <h1>By: {{ responsible_person[0].firstname }} {{ responsible_person[0].lastname }}</h1>
        <div class="main-info">
          <div
            class="description"
            v-html="workshopdata.short_description"
          />
          <div class="price">
            <span>{{ workshopdata.price }} €</span>
          </div>
          <table class="dates">
            <tr>
              <td>From</td>
              <td> {{ Dates.from }}</td>
            </tr>
            <tr>
              <td>Till</td>
              <td> {{ Dates.to }}</td>
            </tr>
          </table>
        </div>
        <div class="buttons">
          <button
            class="btn btn-primary btn-custom"
            @click="Booking"
          >
            Register
          </button>
        </div>
      </div>
      <modal
        v-show="showBooking"
        :type="`white`"
        @close="showBooking = false"
      >
        <template #header>
          <h1>Booking to {{ workshopdata.title }} workshop</h1>
        </template>
        <template #body>
          <span> Are you sure you want to book this workshop?</span>
        </template>
        <template #footer>
          <div class="buttons">
            <button
              class="btn btn-add"
              @click="BookWorkshop"
            >
              Yes!
            </button>
            <button
              class="btn btn-danger"
              @click="showBooking = false"
            >
              No ,cancel the booking!
            </button>
          </div>
        </template>
      </modal>
      <modal
        v-show="successMessage"
        :type="type"
        @close="successMessage = false"
      >
        <template #body>
          <span>{{ message }}</span>
        </template>
      </modal>
    </div>
    <body-modal
      v-if="canEdit && sessionModal"
      @close="hideSessionModal"
    >
      <template #body>
        <session-form
          :info="sessioninformation"
          @save-session-id="AddSession"
        />
      </template>
    </body-modal>
    <body-modal
      v-if="isAdmin && settingsModal"
      @close="hideSettingsModal"
    >
      <template #body>
        <workshopsettings
          :info="workshopdata"
          @close="hideSettingsModal"
        />
      </template>
    </body-modal>
  </div>
  <div
    v-if="loading"
    class="loader"
  >
    <ring-loader
      :loading="loading"
      :color="color"
      :size="size"
    />
  </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill';
import RingLoader from 'vue-spinner/src/RingLoader.vue';
import moment from 'moment';
import WorkshopServices from '../../services/workshop.service';
import file_icon_validator from '../../services/file-icon-validator';
import UserService from '../../services/user.service';
import Modal from '../../components/EditModal.vue';
import BookingServices from '../../services/Booking.service';
import SessionForm from '../../components/sessionForm.vue';
import BodyModal from '../../components/BodyModal.vue';
import Workshopsettings from '../../components/workshopsettings.vue';
import { FormatDate } from '../../services/Validation';
import fileUploader from '../../components/FileUploader.vue';

export default {
  name: 'WorkshopView',
  components: {
    QuillEditor,
    Modal,
    SessionForm,
    BodyModal,
    Workshopsettings,
    fileUploader,
    RingLoader,
  },
  props: ['id'],
  data() {
    return {
      color: '#EC7404',
      size: '100px',
      EnableEdit: false,
      momentParser: moment,
      sessioninformation: null,
      type: '',
      message: '',
      settingsModal: false,
      sessionModal: false,
      successMessage: false,
      showBooking: false,
      canEdit: false,
      isAdmin: false,
      showAll: false,
      loading: true,
      workshopdata: {},
      sessions: {},
      responsible_person: [
        {
          firstname: '',
          lastname: '',
        },
      ],
      Dates: {
        from: '',
        to: '',
      },
      students_list: [],
    };
  },
  computed: {
    toggle() {
      return !this.showAll;
    },
  },
  created() {
    this.getworkshop();
  },
  methods: {
    SaveFile(uploadedFile) {
      this.workshopdata.files[uploadedFile.id] = uploadedFile;
    },
    AddFile() {
      this.workshopdata.files.push({
        id: this.workshopdata.files.length,
        url: '',
        note: '',
      });
    },
    DeleteFile(id, wasUploaded, uploadedFile) {
      if (wasUploaded) {
        WorkshopServices.DeleteFile(uploadedFile);
      }
      this.workshopdata.files = this.workshopdata.files.filter((file) => file.id !== id);
    },
    setContent(id) {
      if (id === 'short_description') {
        this.$refs.short_description.setHTML(this.workshopdata.short_description);
      }
      if (id === 'description') {
        this.$refs.description.setHTML(this.workshopdata.description);
      }
    },
    OnChange(id) {
      if (id === 'short_description') {
        this.workshopdata.short_description = this.$refs.short_description.getHTML();
      }
      if (id === 'description') {
        this.workshopdata.description = this.$refs.description.getHTML();
      }
    },
    BookWorkshop() {
      BookingServices.BookWorkshop(this.workshopdata._id).then((res) => {
        if (res.data.message === 'succesfully booked!') {
          this.type = 'success';
        } else {
          this.type = 'danger';
        }
        this.message = res.data.message;
        this.showBooking = false;
        this.successMessage = true;
        setTimeout(() => this.$router.push({ name: 'WorkshopsList' }), 1500);
      });
    },
    Booking() {
      this.showBooking = true;
    },
    AuthUser() {
      if (UserService.getRole() === 'admin') {
        this.showAll = true;
        this.canEdit = true;
        this.isAdmin = true;
      }
      if (UserService.getRole() === 'trainer') {
        this.workshopdata.responsible_person.forEach((element) => {
          if (element === UserService.getId()) {
            this.showAll = true;
            this.canEdit = true;
          }
        });
      }
      if (UserService.getRole() === 'student') {
        if (this.workshopdata.students_list.length !== 0) {
          this.workshopdata.students_list.forEach((element) => {
            if (element === UserService.getId()) {
              this.showAll = true;
            }
          });
        }
      }
    },
    SaveSettings() {
      WorkshopServices.UpdateInformation(this.workshopdata._id, this.workshopdata).then((res) => {
        if (res.status === 204 || res.status === 200) {
          this.$router.go(this.$router.currentRoute);
        }
      });
    },
    RemoveSession(id) {
      this.workshopdata.sessions = this.workshopdata.sessions
        .filter((session) => session !== id);
      this.sessions = this.sessions
        .filter((session) => session._id !== id);
      WorkshopServices.UpdateSessionList(this.workshopdata._id, id);
    },
    getIconCode(code) {
      return file_icon_validator.getIconCode(code);
    },
    getworkshop() {
      WorkshopServices.getWorkshopInfo(this.$route.params.id).then((res) => {
        this.workshopdata = res.data.workshop;
        this.Dates.from = FormatDate(this.workshopdata.date.from);
        this.Dates.to = FormatDate(this.workshopdata.date.to);
        this.students_list = res.data.workshop.students_list;
        this.responsible_person = res.data.workshop.responsible_person;
        this.sessions = res.data.workshop.sessions;
        this.loading = false;
        this.AuthUser();
      });
    },
    showSessionModal(id) {
      if (id !== null) {
        const item = this.sessions.filter((i) => i._id === id);
        // eslint-disable-next-line prefer-destructuring
        this.sessioninformation = item[0];
      }
      this.sessionModal = true;
      document.getElementById('app').classList.add('not-scroll');
    },
    hideSessionModal() {
      this.sessionModal = false;
      document.getElementById('app').classList.remove('not-scroll');
    },
    showSettingsModal() {
      this.settingsModal = true;
      document.getElementById('app').classList.add('not-scroll');
    },
    hideSettingsModal() {
      this.settingsModal = false;
      document.getElementById('app').classList.remove('not-scroll');
    },
    AddSession(id) {
      WorkshopServices.AddSession(this.workshopdata._id, id).then((res) => {
        if (res.status === 204 || res.status === 200) {
          this.$router.go(this.$router.currentRoute);
        }
      });
    },
  },
};
</script>

<style scoped>

.price {
  font-size: 3rem;
  float: right;
  font-weight: bold;
}
.edit {
    cursor: pointer;
    color: var( --secondary-color-light);
    float: right;
    font-size: 20px;
    margin: 5px;
}
.delete {
    cursor: pointer;
    color: var(--primary-color-1);
    float: right;
    font-size: 20px;
    margin: 5px;
}
.buttons {
  width: 100%;
  display: flex;
  justify-content: center;
}
.main-info {
  color: var(--light-color);
}
.loader {
  width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    display: flex;
}
#title {
  font-weight: bold;
  font-size: 3rem;
  font-family: "Open Sans";
  color: var(--primary-color);
  text-align: center;
  text-transform: uppercase;
}
.addSession {
  width: 100%;
  text-align: left;
  margin-left: 5%;
}
.general-information {
  margin: 2em;
  padding: 1.5em;
  background-color: var(--secondary-color);
  box-shadow: var(--shadow-1);
  border-radius: 15px;
  width: 95%;
}
.general-information > h1 {
  color: var(--primary-color);
}
.workshop-view {
  display: grid;
  justify-items: center;
}
.description {
  color: var(--light-color);
  background-color: transparent;
  margin-top: 3em;
  margin-left: 1em;
  margin-bottom: 1.5em;
}
#description>.ql-editor {
    height: 300px;
}
.file-item {
  color: var(--light-color);
  margin: 1em;
}
.file-link {
  color: var(--light-color);
  text-decoration: none;
}
.file-link:hover {
  text-decoration: unset;
  color: grey;
}
.sessions-list {
  width: 100%;
}
.floting {
  float: right;
}
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--secondary-color);
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: var(--light-color);
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: var(--primary-color);
}

input:focus + .slider {
  box-shadow: var(--shadow);
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
.date {
  font-weight: bold;
}
.btn-custom {
  font-weight: bold;
  font-size: 2rem;
}
.time-stamp {
  color:white;
}
.toggle-register {
  position:relative;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}
.form-group label {
  color:white;
  font-weight: bold;
  text-transform: capitalize;
}
</style>
