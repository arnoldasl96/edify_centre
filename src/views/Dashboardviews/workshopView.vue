<template>
  <div class="workshop-page">
    <div
      v-if="showAll"
      class="workshop-view"
    >
      <button
        v-if="isAdmin"
        class="btn btn-green floting"
        @click="showSettingsModal"
      >
        change settings
      </button>
      <h1 id="title">
        {{ workshopdata.title }}
      </h1>
      <div class="general-information">
        <h1>General information</h1>
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
      <div class="addSession">
        <button
          v-if="isAdmin"
          class="btn btn-green left"
          @click="showSessionModal"
        >
          <i class="fas fa-plus" /> Session
        </button>
      </div>

      <div class="sessions-list">
        <div
          v-for="i in sessions"
          :key="i"
          class="general-information"
        >
          <h1>{{ i.title }}</h1>

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
    </div>
    <div
      v-if="!showAll"
      class="workshop-view"
    >
      <h1 id="title">
        {{ workshopdata.title }}
      </h1>
      <div class="general-information">
        <h1>{{ workshopdata.title }}</h1>
        <div class="main-info">
          <div
            class="description"
            v-html="workshopdata.short_description"
          />
          <span>Price: {{ workshopdata.Price }}</span><br>
          <span>time period: {{ Dates.from + " " + Dates.to }}</span>
        </div>
        <div class="buttons">
          <button
            class="btn btn-primary"
            @click="Booking"
          >
            Register to workshop
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
        <session-form @save-session-id="AddSession" />
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
</template>

<script>
import WorkshopServices from '../../services/workshop.service';
import file_icon_validator from '../../services/file-icon-validator';
import UserService from '../../services/user.service';
import Modal from '../../components/EditModal.vue';
import BookingServices from '../../services/Booking.service';
import SessionForm from '../../components/sessionForm.vue';
import BodyModal from '../../components/BodyModal.vue';
import Workshopsettings from '../../components/workshopsettings.vue';

export default {
  name: 'WorkshopView',
  components: {
    Modal,
    SessionForm,
    BodyModal,
    Workshopsettings,
  },
  props: ['id'],
  data() {
    return {
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
      responsible_person: [],
      Dates: {
        from: '',
        to: '',
      },
      students_list: [],
    };
  },
  created() {
    this.getworkshop();
  },
  methods: {
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
    getIconCode(code) {
      return file_icon_validator.getIconCode(code);
    },
    getworkshop() {
      WorkshopServices.getWorkshopInfo(this.$route.params.id).then((res) => {
        this.workshopdata = res.data.workshop;
        this.students_list = res.data.students_list;
        this.responsible_person = res.data.responsible_person;
        this.sessions = res.data.sessions;
        this.loading = false;
        this.AuthUser();
      });
    },
    showSessionModal() {
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
@import "../../styles/variables.css";
.buttons {
  display: flex;
  justify-content: center;
}
.main-info {
  color: white;
}
#title {
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
  width: 95%;
  border-radius: 15px;
}
.general-information > h1 {
  color: var(--primary-color);
}
.workshop-view {
  display: grid;
  justify-items: center;
}
.description {
  color: white;
  background-color: transparent;
  margin-top: 3em;
  margin-left: 1em;
  margin-bottom: 1.5em;
}
.file-item {
  color: white;
  margin: 1em;
}
.file-link {
  color: white;
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
  position: absolute;
  top: 100px;
  right: 100px;
}
</style>
