<template>
  <div class="uploader">
    <div class="file-uploader" v-if="uploaded != true">
      <div class="add-btn">
        <input
          ref="uploader"
          type="file"
          @change="OnChange"
          name="`fileUpload-${id}`"
          :id="`fileUpload-${id}`"
        />
        <button
          type="button"
          class="btn-upload"
          @click="$refs.uploader.click()"
        >
          <i class="fas fa-file-upload"></i>
        </button>
      </div>
      <div class="file-name">
        <span>{{ fileName }}</span>
      </div>
      <div class="note-group">
        <label id="note" class="note" :for="`${id}`">Note</label>
        <input
          class="file-note"
          type="text"
          :name="`file-note-${id}`"
          :id="`${id}`"
          v-model="note"
        />
      </div>
      <div class="btns">
        <i @click="AddFile" class="fas fa-save"></i>
        <i @click="onDelete(data)" class="fas fa-trash-alt"></i>
      </div>
    </div>

    <div
      class="file-uploader"
      :class="[uploaded ? 'small' : 'large']"
      v-if="uploaded == true"
    >
      <div class="icon">
        <i class="fas fa-file-upload"></i>
      </div>
      <div class="name">
        {{ fileName }}
      </div>
      <div class="note">
        {{ note }}
      </div>
      <div class="btn">
        <i @click="onDelete(data)" class="fas fa-times remove"></i>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["data", "id"],
  name: "file-uploader",
  data() {
    return {
      response: null,
      file: null,
      note: "",
      fileName: "no file chosen",
      uploaded: false,
    };
  },
  methods: {
    onDelete(data) {
      this.$emit("delete-file", data);
    },
    OnChange(event) {
      if (event.target.files != null) {
        this.file = event.target.files[0];
         this.fileName = this.file.name;
      }
    },
    AddFile() {
      if (this.file == null) {
        this.$refs.uploader.click();
      }

      if (this.file != null) {
        const fd = new FormData();
        fd.append("file", this.file, this.file.name);
        axios.post("files/", fd).then((res) => {
          this.response = res;
          const url =
            this.response.config.baseURL +
            this.response.data.destination.substring(2) +
            this.response.data.filename;
          this.data.url = url;
          this.data.note = this.note;
          this.data.type = this.file.type;
          this.data.name = this.file.name;
          this.uploaded = true;
        });
      }
    },
  },
};
</script>

<style scoped>
@import "../styles/variables.css";
.error {
  display: block;
  color: blue;
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
.fa-save {
  color: blue;
}
.fa-trash-alt {
  color: red;
}
.small {
  height: 3em;
}
.large {
  height: 100px;
}
.uploader {
  height: fit-content;
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
}
.file-uploader {
  color: #000;
  margin: 10px 0px;
  padding: 1em;
  display: grid;
  grid-template-columns: 5% 30% 45% 20%;
  align-items: center;
  border-radius: 5px;
  width: 95%;
  background-color: var(--secondary-color-light);
}
.btn-upload {
  border: none;
  cursor: pointer;
  background-color: transparent;
  color: white;
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