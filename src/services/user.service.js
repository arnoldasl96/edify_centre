import axios from "axios";
const userLink = 'user/'
import jwt_decode from 'jwt-decode'
import TokenService from "./Token.service";
const UserService = {

    getUsers() {
        return axios.get(`${userLink}`)
    },
    getUsersWithRole(role) {
        return axios.get(`${userLink}`, { params: { role: role } })
    },
    getRole() {
        const data = jwt_decode(TokenService.getToken())
        return data.user.role;
    },

    getImage() {
        const data = jwt_decode(TokenService.getToken())
        return data.user.photo;
    },
    getName() {
        const data = jwt_decode(TokenService.getToken())
        const user = data.user;
        return user.firstname + ' ' + user.lastname;
    },
    getId() {
        const data = jwt_decode(TokenService.getToken())

        return data.user._id;
    },
    async getUserbyId(id) {
        return axios.get(`${userLink}${id}`)
    },
    SetUserInformation(user) {
        localStorage.setItem("user", user);
    },
    deleteUser(id) {
        return axios.delete(`${userLink}${id}`)
    },
    updateUser(id) {
        return axios.patch(`${userLink}${id}`);
    },
    Register(userdata) {
        return axios.post("user/registration/", userdata);
    },
    getMyWorkshops() {
        const myId = jwt_decode(TokenService.getToken()).user._id
        return axios.get(`${userLink}${myId}/workshops`)
    },

}
export default UserService;