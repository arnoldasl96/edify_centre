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
        <button class="btn-upload" @click="$refs.uploader.click()">
          <i class="fas fa-file-upload"></i>
        </button>
      </div>
      <div class="file-name">
        <span>{{ fileName }}</span>
      </div>
      <div class="note-group">
        <label id="note" class="note" :for="`file-note-${id}`">Note</label>
        <input
        class="file-note"
          type="text"
          :name="`file-note-${id}`"
          :id="`file-note-${id}`"
          v-model="note"
          @change="OnChange"
        />
      </div>
      <div class="btns">

        <button class="btn btn-add" @click="AddFile">Save</button>
        <button v-if="id>0" class="btn btn-danger" @click="onDelete(id)">Delete</button>
      </div>
    </div>

    <div class="file-uploader" :class="[uploaded ? 'small': 'large']" v-if="uploaded == true">
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
        <i @click="onDelete(id)" class="fas fa-times remove"></i>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { resolveDirective } from "vue";
export default {
  props: ["data", "id"],
  name: "file-uploader",
  data() {
    return {
      response: null,
      file: null,
      note: "",
      fileName: "no file selected",
      uploaded: false,
    };
  },
  methods: {
    onDelete(id) {
      this.$emit("delete-file", id);
    },
    OnChange(event) {
      this.file = event.target.files[0];
      this.fileName = this.file.name;
    },
    AddFile() {
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
        this.uploaded = true;
      });
    },
  },
};
</script>

<style scoped>
@import "../styles/variables.css";
.btns{
  display: flex;
  flex-direction: column;
  
}
.small {
  height: 50px;
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
span {
  overflow: hidden;
}
</style>