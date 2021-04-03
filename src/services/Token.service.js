import axios from "axios";

const AccessToken = 'access_token'
const RefreshToken = 'refresh_token'

/* 
TokenService provides functions for getting saving and removing access and refresh tokens
*/

const TokenService = {
    getToken() {
        return localStorage.getItem(AccessToken);
    },
    setAccessToken(token) {
        localStorage.setItem(AccessToken, token);
    },
    removeAccessToken() {
        localStorage.removeItem(AccessToken);
    },
    getRefreshToken() {
        return localStorage.getItem(RefreshToken);
    },
    setRefreshToken(token) {
        localStorage.setItem(RefreshToken, token);
    },
    removeRefreshToken() {
        localStorage.removeItem(RefreshToken);
    },
}
export default TokenService;