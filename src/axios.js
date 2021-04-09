import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:4000/'
axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem['accessToken'];