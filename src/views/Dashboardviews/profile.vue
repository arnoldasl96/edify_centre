<template>
  <div class="wrapper">
    <div
      v-if="editmode"
      class="edit-mode-off"
    >
      <div class="grid-container">
        <div class="photo-container">
          <input
            id="photo"
            ref="photoUploader"
            type="file"
            name="photo"
            accept="image/*"
          >
          <img :src="`${userInfo.photo}`">
          <h1 class="role orange">
            { {{ userInfo.role }} }
          </h1>
          <button
            class="btn btn-green center"
            @click="$refs.photoUploader.click()"
          >
            change photo
          </button>
          <button
            class="btn btn-primary center"
            @click="showChangePassword = true"
          >
            change password
          </button>
          <button
            class="btn btn-add center"
            @click="UpdateUserInfo()"
          >
            save information
          </button>
        </div>
        <div class="name">
          <h1 class="orange title">
            First Name
          </h1>
          <input
            v-model="userInfo.firstname"
            class="input-primary"
            type="text"
            pattern="[A-Za-z]"
          >
        </div>
        <div class="surname">
          <h1 class="orange title">
            Surname
          </h1>
          <input
            v-model="userInfo.lastname"
            class="input-primary"
            type="text"
          >
        </div>
        <div class="date-of-birth">
          <h1 class="orange title">
            Date of Birth
          </h1>
          <input
            v-model="userInfo.birthday"
            class="input-primary"
            max="2005"
            type="date"
          >
        </div>
        <div class="sex">
          <h1 class="orange title">
            Sex
          </h1>
          <select
            v-model="userInfo.gender"
          >
            <option value="man">
              Man
            </option>
            <option value="Woman">
              Woman
            </option>
            <option value="Other">
              other
            </option>
          </select>
        </div>
        <div class="email">
          <h1 class="orange title">
            Email
          </h1>
          <span>{{ userInfo.email }}</span>
        </div>
        <div class="phone-number">
          <h1 class="orange title">
            Phone Number
          </h1>
          <input
            v-model="userInfo.phone"
            class="input-primary"
            type="tel"
          >
        </div>
        <div
          v-if="userInfo.role === 'trainer' || userInfo.role === 'admin'"
          class="biography"
        >
          <h1 class="orange title">
            Biography
          </h1>
          <div class="editor">
            <QuillEditor
              id="biography"
              ref="biography"
              scrolling-container="true"
              theme="snow"
              toolbar="minimal"
              @v-model:content="biography"
              @update:content="setBiography"
              @ready="setContent"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="!editmode"
      class="edit-mode-off"
    >
      <div class="grid-container">
        <div class="photo-container">
          <img :src="`${userInfo.photo}`">
          <h1 class="role orange">
            { {{ userInfo.role }} }
          </h1>
          <button
            class="btn btn-green center"
            @click="editmode = true"
          >
            edit information
          </button>
        </div>
        <div class="name">
          <h1 class="orange title">
            First Name
          </h1>
          <span>{{ userInfo.firstname }}</span>
        </div>
        <div class="surname">
          <h1 class="orange title">
            Surname
          </h1>
          <span>{{ userInfo.lastname }}</span>
        </div>
        <div class="date-of-birth">
          <h1 class="orange title">
            Date of Birth
          </h1>
          <span v-if="userInfo.birthday">{{ userInfo.birthday }}</span>
          <span v-if="!userInfo.birthday">unknown</span>
        </div>
        <div class="sex">
          <h1 class="orange title">
            Sex
          </h1>
          <span v-if="userInfo.gender">{{ userInfo.gender }}</span>
          <span v-if="!userInfo.gender">unknown</span>
        </div>
        <div class="email">
          <h1 class="orange title">
            Email
          </h1>
          <span>{{ userInfo.email }}</span>
        </div>
        <div class="phone-number">
          <h1 class="orange title">
            Phone Number
          </h1>
          <span v-if="userInfo.phone">{{ userInfo.phone }}</span>
          <span v-if="!userInfo.phone">unknown</span>
        </div>
        <div
          v-if="userInfo.role === 'trainer' || userInfo.role === 'admin'"
          class="biography"
        >
          <h1 class="orange title">
            Biography
          </h1>
          <div
            v-if="userInfo.biography"
            class="content-biography"
            v-html="userInfo.biography"
          />
          <div v-if="!userInfo.biography">
            biography coming soon
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill';
import UserService from '../../services/user.service';

export default {
  name: 'Profile',
  components: {
    QuillEditor,
  },
  data() {
    return {
      biography: '',
      userInfo: {
        birthday: '',
        phone: '',
        photo: '',
        firstname: '',
        lastname: '',
        email: '',
        role: '',
        biography: '',
      },
      editmode: false,
      showChangePassword: false,
    };
  },
  created() {
    this.getUserInformation();
  },
  methods: {
    getUserInformation() {
      const id = UserService.getId();
      UserService.getUserbyId(id).then((res) => {
        this.userInfo = res.data;
        this.biography = this.userInfo.biography;
        this.userInfo.birthday = this.FormatDate(res.data.birthday);
      });
    },
    setBiography() {
      this.userInfo.biography = this.$refs.biography.getHTML();
    },
    setContent() {
      this.$refs.biography.setHTML(this.biography);
    },
    FormatDate(varDate) {
      const date_ob = new Date(varDate);
      // adjust 0 before single digit date
      const date = (`0${date_ob.getDate()}`).slice(-2);
      // current month
      const month = (`0${date_ob.getMonth() + 1}`).slice(-2);

      // current year
      const year = date_ob.getFullYear();
      return `${year}-${month}-${date}`;
    },

    UpdateUserInfo() {
      const id = UserService.getId();
      this.userInfo.birthday = this.FormatDate(this.userInfo.birthday);
      UserService.updateUser(id, this.userInfo).then((res) => {
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
img {
  height: 300px;
  width: 300px;
}
.edit-button {
  margin: 15%;
  float: right;
  position: relative;
  z-index: 2;
}
.editor {
 margin-top:15px;
 width: 95%;
 height: 70%;
}
.orange {
  color: var(--primary-color)
}

.grid-container {
  margin: 2%;
  display: grid;
  height: 94%;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 0.8fr 0.9fr 0.8fr 2.3fr;
  gap: 15px;
  grid-template-areas:
    "photo-container name name surname surname"
    "photo-container date-of-birth date-of-birth sex sex"
    "photo-container email email phone-number phone-number"
    "photo-container biography biography biography biography";
}
.photo-container {
  grid-area: photo-container;
}
.photo-container >img{
  display: block;
  margin: 15px auto;
}
.role{
  display: block;
  text-align: center;
}
.name {
  grid-area: name;
}
.surname {
  grid-area: surname;
}
.date-of-birth {
  grid-area: date-of-birth;
}
.sex {
  grid-area: sex;
}
.email {
  grid-area: email;
}
.phone-number {
  grid-area: phone-number;
}
.biography {
  grid-area: biography;
}
.edit-mode-off {
  box-shadow: var(--shadow);
  background-color: var(--secondary-color);
  height: 100%;
  width: 95%;
  border-radius: 35px;
}
.content-biography,
.edit-mode-off > div >div >span{
  color: white;
  font-size: 22px;
}
.wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.upper-container {
  background-color: white;
  width: 100%;
  height: 45vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}
.lower-container {
  width: 100%;
  height: 45vh;
}
.profile-photo {
  margin: 15px;
  height: 100%;
  width: fit-content;
}
.profile-information {
  height: inherit;
  width: 100%;
  clear: both;
}
.form-control input,
.form-control label {
  display: block;
  font-size: 20px;
  width: 100%;
}
.form-control label {
  text-transform: uppercase;
}
.form-control {
  margin: 0.5em;
}
.grid-container-1 {
  display: grid;
  grid-template: min-content/ auto auto;
}
.center{

  display: block;
  width: 50%;
  margin: 15px auto;
}
</style>
