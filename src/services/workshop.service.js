import axios from "axios";
const workshoplink = 'workshop/'
import jwt_decode from 'jwt-decode'
import TokenService from "./Token.service";

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
    getWorkshopByIdid(id) {
        return axios.get(`${workshoplink}${id}`)
    },
}

export default WorkshopServices;