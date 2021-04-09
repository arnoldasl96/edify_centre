import axios from "axios";
const workshoplink = 'workshop/'
import UserService from "./user.service";

const WorkshopServices = {
    getAllWorkshops() {
        return axios.get(`${workshoplink}`)
    },
    CreateWorkshop(data) {
        return axios.post(`${workshoplink}`, data, {
            onUploadProgress: uploadEvent => {
                console.log('UploadProgress: ' + uploadEvent.total)
            }
        }).then((res) => {
            console.log(res)

        })
    },
    UpdateInformation(id) {
        return axios.patch(`${workshoplink}${id}`, data)
    },
    getWorkshopById(id) {
        return axios.get(`${workshoplink}${id}`)
    },
    getSessions(id) {
        return axios.get(`${workshoplink}${id}/sessions`)
    },
    getAuthor(id) {
        return axios.get(`${workshoplink}${id}/author`)
    },
    getStudents(id) {
        return axios.get(`${workshoplink}${id}/students`)
    },
    getWorkshopInfo(id) {
        return axios.get(`${workshoplink}${id}/info`)
    }
}

export default WorkshopServices;