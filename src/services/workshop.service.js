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
  getWorkshopInfo(id) {
    return axios.get(`${workshoplink}${id}/info`);
  },
  DeleteFile(file) {
    return axios.put('files/', file);
  },
  AddSession(id, sessionId) {
    return axios.patch(`${workshoplink}${id}/sessions`, { sessionId });
  },
  UpdateSessionList(id, sessionId) {
    return axios.patch(`${workshoplink}/${id}/session/${sessionId}`);
  },
};

export default WorkshopServices;
