<template>
  <div class="session">
    <div class="added" v-if="added == false">
      <div v-show="id > 0" class="delete right">
        <i @click="onDelete(id)" class="fas fa-times remove"></i>
      </div>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" name="title" id="title" v-model="session.title" />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <QuillEditor
          class="description"
          @update:content="OnChange"
          ref="description"
          theme="snow"
          scrollingContainer="false"
          toolbar="full"
          id="description"
          :content="session_description"
        />
      </div>

      <div class="form-group flex-row">
        <div class="inner-group">
          <label class="coming-soon" for="soon">coming soon</label>
          <input
            v-model="session.attendance_date.ComingSoon"
            type="checkbox"
            name="soon"
            id="soon"
          />
        </div>
        <div class="inner-group" v-show="!session.attendance_date.ComingSoon">
          <label for="session-date-starts"> Session starts</label>
          <input
            v-model="session.attendance_date.starts"
            type="datetime-local"
            name="session-date-starts"
            id="session-date-starts"
          />
        </div>
        <div class="inner-group" v-show="!session.attendance_date.ComingSoon">
          <label for="session-date-ends"> Session ends</label>
          <input
            v-model="session.attendance_date.ends"
            type="datetime-local"
            name="session-date-ends"
            id="session-date-ends"
          />
        </div>
      </div>
      <hr class="solid" />
      <div class="files-group">
        <button type="button" class="btn btn-primary" @click="AddFile">Add file</button>
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
      <button type="button" class="btn btn-primary" @click="AddSession">Save</button>
    </div>
    <div class="added" v-if="added">
      <div class="flex-row">
        <span class="session-title">{{ title }}</span>
        <div class="btns">
          <i @click="onDelete(id)" class="fas fa-times btn-danger"></i>
          <i @click="onDelete(id)" class="fas fa-pen"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import File_Uploader from "./File_Uploader";
import axios from "axios";
export default {
  name: "session",
  components: {
    QuillEditor,
    "file-uploader": File_Uploader,
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
      title:'not specified',
      session: {
        
        title: "",
        description: "",
        files: [],
        status: "published",
        attendance_date: {
          ComingSoon: false,
          starts: "",
          ends: "",
        },
      },
      added: false,
      session_description: "",
    };
  },
  methods: {
    AddSession() {
      this.CallFileUploaders();
      this.session.files = this.filesList;
      if (this.session.title != "") {
        this.title = this.session.title;
      }
      axios.post("/session/", this.session).then((res) => {
        this.details.id = res.data.SessionId;
        this.added = true;
      });
    },
    OnChange() {
      this.session.description = this.$refs.description.getHTML();
    },

    onDelete(id) {
      this.$emit("delete-session", id);
    },
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
    }
  },
  props: ["details", "id"],
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
.session {
  background-color: var(--secondary-color-light);
  width: 80%;
  height: fit-content;
  padding-bottom: 30px;
  margin: 25px;
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
</style>