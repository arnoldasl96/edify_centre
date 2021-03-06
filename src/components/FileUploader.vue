<template>
  <div class="uploader">
    <div
      v-if="uploaded != true"
      class="file-uploader"
    >
      <div class="add-btn">
        <input
          :id="`fileUpload-${id}`"
          ref="uploader"
          type="file"
          name="`fileUpload-${id}`"
          @change="OnChange"
        >
        <button
          type="button"
          class="btn-upload"
          @click="$refs.uploader.click()"
        >
          <i class="fas fa-file-upload" />
        </button>
      </div>
      <div class="file-name">
        <span>{{ fileName }}</span>
      </div>
      <div class="note-group">
        <label
          id="note"
          class="note"
          :for="`${id}`"
        >Note</label>
        <input
          :id="`${id}`"
          v-model="note"
          class="file-note"
          type="text"
          :name="`file-note-${id}`"
        >
      </div>
      <div class="btns">
        <button
          class="btn btn-add"
          @click="AddFile"
        >
          Save File
        </button>
        <button
          class="btn btn-danger"
          @click="onDelete"
        >
          Delete
        </button>
      </div>
    </div>

    <div
      v-if="uploaded == true"
      class="file-uploader"
    >
      <div class="icon">
        <i class="fas fa-file-upload" />
      </div>
      <div class="name">
        {{ fileName }}
      </div>
      <div class="note">
        {{ note }}
      </div>
      <div class="btns">
        <i
          class="fas fa-trash-alt"
          @click="onDelete"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FileUploader',
  props: ['id', 'storedFile'],
  data() {
    return {
      uploadedFile: {
        url: null,
        type: null,
        note: '',
        name: null,
      },
      response: null,
      file: null,
      note: '',
      fileName: 'no file chosen',
      uploaded: false,
    };
  },
  created() {
    this.GetStoredFile();
  },
  methods: {
    GetStoredFile() {
      if (this.storedFile !== undefined) {
        if (this.storedFile.url !== '') {
          this.uploaded = true;
          this.uploadedFile.url = this.storedFile.url;
        }
        if (this.storedFile.type !== '') this.uploadedFile.type = this.storedFile.type;
        if (this.storedFile.name !== '') {
          this.uploadedFile.name = this.storedFile.name;
          this.fileName = this.storedFile.name;
        }
        if (this.storedFile.note !== '') {
          this.note = this.storedFile.note;
          this.uploadedFile.note = this.storedFile.note;
        }
      }
    },
    onDelete() {
      if (this.uploaded === false) {
        this.$emit('delete-file', this.id, this.uploaded, this.uploadedFile);
      } else {
        this.$emit('delete-file', this.id, this.uploaded, this.uploadedFile);
      }
    },
    OnChange(event) {
      if (event.target.files != null) {
        // eslint-disable-next-line prefer-destructuring
        this.file = event.target.files[0];
        this.fileName = this.file.name;
      }
    },
    AddFile() {
      if (this.uploaded === false) {
        if (this.file == null) {
          this.$refs.uploader.click();
        }
        if (this.file != null) {
          const fd = new FormData();
          fd.append('file', this.file, this.file.name);
          axios.post('files/', fd).then((res) => {
            this.response = res;
            const url = this.response.config.baseURL
            + this.response.data.destination.substring(2)
            + this.response.data.filename;
            this.uploadedFile.url = url;
            this.uploadedFile.note = this.note;
            this.uploadedFile.type = this.file.type;
            this.uploadedFile.name = this.file.name;
            this.uploadedFile.id = this.id;
            this.uploaded = true;
            this.$emit('add-file', this.uploadedFile);
          });
        }
      }
    },
  },
};
</script>

<style scoped>
.btns {
  display: block;
  width:98%;
  margin-left: 1em;
  justify-content: center;
  flex-direction: column;
}
.btns button {
  float: right;
  width: 50%;
}
.uploader {
  height: fit-content;
  width: 100%;
  display: flex;
  padding: 10px;
  justify-content: center;
  align-content: center;
}
.file-uploader {
  color: #000;
  margin: 10px 0px;
  padding: 1em;
  display: grid;
  grid-template-columns: 5% 20% 55% 20%;
  align-items: center;
  border-radius: 5px;
  width: 100%;
  background-color: var(--secondary-color-light);
}
.btn-upload {
  border: none;
  cursor: pointer;
  background-color: transparent;
  color: var(--light-color);
  font-size: 2em;
  transition: ease 200ms;
}
.btn-upload:hover {
  transform: scale(1.1);
  background-color: transparent;
  border: none;
  transition: ease 200ms;
}
.note {
  display: inline;
  font-weight: bold;
}
.file-note {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.file-name {
  height: 80%;
  display: flex;
  justify-content: left;
  align-items: inherit;
  margin-top: 15px;
  padding-left: 5px;
}
.fa-trash-alt {
  color: var(--danger);
}
.delete {
  color: var(--danger);
  text-align: center;
}
.remove {
  cursor: pointer;
  font-size: unset;
}
.remove:hover {
  font-size: 2em;
}
.name {
  overflow: hidden;
  margin: 0px 1em;
}
span {
  overflow: hidden;
}
</style>
