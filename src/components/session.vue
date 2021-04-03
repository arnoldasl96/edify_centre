<template>
  <div class="session">
   <div class="added" v-if="added==false">
      <div v-show="id > 0" class="delete right">
      <i @click="onDelete(id)" class="fas fa-times remove"></i>
    </div>
    <div class="form-group">
      <label for="title">Title</label>
      <input type="text" name="title" id="title" v-model="session.title"/>
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
        <label for="session-date-starts"> Session starts</label>
        <input
        v-model="session.attendance_date.starts"
          type="datetime-local"
          name="session-date-starts"
          id="session-date-starts"
        />
      </div>
      <div class="inner-group">
        <label for="session-date-ends"> Session ends</label>
        <input
        v-model="session.attendance_date.ends"
          type="datetime-local"
          name="session-date-ends"
          id="session-date-ends"
        />
      </div>
    </div>
    <div class="form-group">
      <label for="session-trainer"> Session trainer</label>
      <select name="session-trainer" id="session-trainer" v-model="session.teachers">
        <option selected value="trainer1">tainer1</option>
        <option selected value="trainer2">tainer1</option>
        <option selected value="trainer3">tainer1</option>
        <option selected value="trainer4">tainer1</option>
      </select>
    </div>
    <hr class="solid" />
    <div class="files-group">
      <button class="btn btn-primary" @click="AddFile">Add file</button>
      <div v-for="(f, k) in session.files" :key="id+'/'+k" class="list-of-files">
        <file-uploader
          @delete-file="DeleteFile"
          :data="f"
          :id="k"
        ></file-uploader>
      </div>
    </div>
     <hr class="solid" />
     <button class="btn btn-primary" @click="AddSession">Save</button>
   </div>
   <div class="added" v-if="added">
     <div class="flex-row">
      {{title}}
      <i @click="onDelete(id)" class="fas fa-times remove"></i>
     </div>
   </div>
  </div>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import File_Uploader from "./File_Uploader";
import axios from 'axios';
export default {
  name: "session",
  components: {
    QuillEditor,
    "file-uploader": File_Uploader,
  },
  data() {
    return {
      session:{
        title:'',
        description:'',
        teacher:'',
        files:[{
          url:null,
          note:'',
        }],
        status:'published',
        attendance_date:{
          starts:'',
          ends:'',
        }
      },
      added:false,
      session_description: "",
    };
  },
  methods: {
    AddSession(){
      if(this.session.title!=''){
        this.title=this.session.title;
      }
      axios.post('/session/',this.session)
      .then((res)=>{
          this.data.id = res.data.SessionId
          console.log( this.data )
      })
    },
    OnChange() {
      this.session.description = this.$refs.description.getHTML();
    },

    onDelete(id) {
      this.$emit("delete-session", id);
    },
    AddFile() {
      this.session.files.push({
        url:"",
        note: "",
      });
    },
    DeleteFile(id) {
       if(id==0){
         this.session.files = [];
      }
      if(id!=0){
      this.session.files.splice(id, 1);
      }
     
    },
  },
  props: ["data", "id"],
};
</script>

<style scoped>
@import "../styles/variables.css";
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