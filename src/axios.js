import axios from 'axios';
import TokenService from './services/Token.service';

axios.defaults.baseURL = 'http://localhost:4000/api';
const accessToken = TokenService.getToken();
axios.defaults.headers.common.authorization = `Bearer ${accessToken}`;
