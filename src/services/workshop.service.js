import axios from 'axios';

const workshoplink = 'workshop/';
const SessionsLink = 'session/';

const WorkshopServices = {
  getAllWorkshops() {
    return axios.get(`${workshoplink}`);
  },
  CreateWorkshop(data) {
    return axios.post(`${workshoplink}`, data, {
      onUploadProgress: (uploadEvent) => {
        console.log(`UploadProgress: ${uploadEvent.total}`);
      },
    });
  },
  UpdateInformation(id, data) {
    return axios.patch(`${workshoplink}${id}`, data);
  },
  getWorkshopById(id) {
    return axios.get(`${workshoplink}${id}`);
  },
  getSessions(id) {
    return axios.get(`${workshoplink}${id}/sessions`);
  },
  DeleteSession(id) {
    return axios.delete(`${SessionsLink}${id}/`);
  },
  EditSession(id, data) {
    return axios.patch(`${SessionsLink}${id}/`, data);
  },
  getAuthor(id) {
    return axios.get(`${workshoplink}${id}/author`);
  },
  getStudents(id) {
    return axios.get(`${workshoplink}${id}/students`);
  },
  getWorkshopInfo(id) {
    return axios.get(`${workshoplink}${id}/info`);
  },
  DeleteFile(file) {
    return axios.put('files/', file);
  },
};

export default WorkshopServices;
