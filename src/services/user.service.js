import axios from "axios";
const userLink = 'user/'
import jwt_decode from 'jwt-decode'
import TokenService from "./Token.service";
const UserService = {
    getUsers() {
        return axios.get(`${userLink}`)
    },
    getUsersWithRole(role) {
        return axios.get(`${userLink}role="${role}"`)
    },
    getRole() {
        const data = jwt_decode(TokenService.getToken())
        return data.user.role;
    },
    getName() {
        const data = jwt_decode(TokenService.getToken())
        const user = data.user;
        return user.firstname + ' ' + user.lastname;
    },
    getUserbyId(id) {
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
    }
}
export default UserService;