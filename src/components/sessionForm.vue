<template>
  <div class="session">
    <div
      v-show="added == false"
      class="inner-session"
    >
      <div
        v-show="id > 0"
        class="delete right"
      >
        <i
          class="fas fa-times remove"
          @click="onDelete(id)"
        />
      </div>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          id="title"
          v-model="session.title"
          type="text"
          name="title"
        >
        <div
          v-if="Validation.title"
          class="error"
        >
          <span>{{ Validation.title }}</span>
        </div>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <QuillEditor
          id="description"
          ref="description"
          class="description"
          theme="snow"
          scrolling-container="false"
          toolbar="full"
          :content="session_description"
          @update:content="OnChange"
        />
      </div>

      <div class="form-group flex-row">
        <div class="inner-group">
          <label
            class="coming-soon"
            for="soon"
          >coming soon</label>
          <input
            id="soon"
            v-model="session.attendance_date.ComingSoon"
            type="checkbox"
            name="soon"
          >
        </div>
        <div
          v-show="!session.attendance_date.ComingSoon"
          class="inner-group"
        >
          <label for="session-date-starts"> Session starts</label>
          <input
            id="session-date-starts"
            v-model="session.attendance_date.starts"
            type="datetime-local"
            name="session-date-starts"
          >
        </div>
        <div
          v-show="!session.attendance_date.ComingSoon"
          class="inner-group"
        >
          <label for="session-date-ends"> Session ends</label>
          <input
            id="session-date-ends"
            v-model="session.attendance_date.ends"
            type="datetime-local"
            name="session-date-ends"
          >
        </div>
      </div>
      <div
        v-if="Validation.dates"
        class="error"
      >
        <span>{{ Validation.dates }}</span>
      </div>
      <hr class="solid">
      <div class="files-group">
        <button
          type="button"
          class="btn btn-primary"
          @click="AddFile"
        >
          Add file
        </button>
        <div class="list-of-files">
          <file-uploader
            v-for="f in filesList"
            :id="f.id"
            :key="f.id"
            :ref="`file-uploader-${f.id}`"
            :data="f"
            @delete-file="DeleteFile"
            @add-file="SaveFile"
          />
        </div>
      </div>
      <hr class="solid">
      <button
        type="button"
        class="btn btn-primary"
        @click="AddSession"
      >
        Save
      </button>
    </div>
    <div
      v-if="added"
      class="added"
    >
      <div class="flex-row">
        <span class="session-title">{{ session.title }}</span>
        <div class="btns">
          <i
            class="fas fa-trash-alt"
            @click="onDelete(id)"
          />
          <i
            class="fas fa-pen"
            @click="EditSession(id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import axios from 'axios';
import FileUploader from './FileUploader.vue';
import WorkshopServices from '../services/workshop.service';
import { ValidateDates, ValidateTitle } from '../services/Validation';

export default {
  name: 'Session',
  components: {
    QuillEditor,
    FileUploader,
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['details', 'id'],
  data() {
    return {
      Validation: {
        title: null,
        dates: null,
      },
      filesList: [
        {
          id: 0,
          url: '',
          note: '',
        },
      ],
      session: {
        _id: '',
        title: '',
        description: '',
        files: [],
        status: 'published',
        attendance_date: {
          ComingSoon: false,
          starts: '',
          ends: '',
        },
      },
      added: false,
      session_description: '',
    };
  },
  methods: {
    EditSession() {
      this.added = false;
      this.$emit('edit-session', this.session._id);
    },
    AddSession() {
      if (!this.added) {
        const DateValidation = ValidateDates(
          this.session.attendance_date.starts,
          this.session.attendance_date.ends,
        );
        const ValidationTitle = ValidateTitle(this.session.title);
        this.Validation.dates = DateValidation.error;
        this.Validation.title = ValidationTitle.error;
        if (DateValidation.valid) {
          if (ValidationTitle.valid) {
            console.log(this.session.files);
            axios.post('/session/', this.session).then((res) => {
              this.session._id = res.data.SessionId;
              console.log(res.data.SessionId);
              this.$emit('save-session-id', res.data.SessionId);
              this.added = true;
            });
          }
        }
      }
    },
    OnChange() {
      this.session.description = this.$refs.description.getHTML();
    },

    onDelete(id) {
      this.$emit('delete-session', id);
    },
    /*= ===================================
      File-uploader methods
      ====================================
    */
    SaveFile(uploadedFile) {
      this.session.files.push(uploadedFile);
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
          return true;
        }
      }
      return false;
    },
    /*= ===================================
      File-uploader methods
      ====================================
    */
  },
};
</script>

<style scoped>
@import "../styles/variables.css";
.coming-soon {
  color: white;
  display: inline;
  font-weight: bold;
  margin: 5px;
}
#checkbox {
  font-size: 2em;
}

.btns {
  margin: 10px;
}
.btns > * {
  margin: 5px;
}
.added {
  width: 95%;
  background-color: var(--secondary-color-light);
  color: var(--light-color);
  box-shadow: var(--shadow);
  height: 75px;
}
.session {
  height: fit-content;
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
}
.inner-session {
  background-color: var(--secondary-color-light);
  width: 95%;
  height: fit-content;
  padding-bottom: 30px;
  margin: 25px;
  border-radius: 4px;
  color: white;
}
.flex-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.delete {
  color: var(--danger);
  text-align: center;
  margin: 5px;
}
.remove {
  position: inherit;
  cursor: pointer;
  font-size: unset;
  z-index: 132132;
}
.right {
  float: right;
  margin: 1em;
}
#title {
  font-size: 16px;
  height: 2em;
  width: 100%;
  display: block;
}
.session-title {
  font-size: 24px;
  margin-left: 20px;
  margin-top: 8px;
}
.btns {
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
}
.btns i {
  cursor: pointer;
  font-size: 30px;
  margin: 5px;
  transition: 150ms ease-out;
}
.btns i:hover {
  font-size: 35px;
  transition: 150ms ease-out;
}
.fa-pen {
  color: rgb(121, 218, 56);
}
.fa-trash-alt {
  color: red;
}
</style>
