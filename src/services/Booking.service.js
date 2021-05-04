import axios from 'axios';
import UserService from './user.service';

const bookingLink = 'booking';

const BookingServices = {
  BookWorkshop(id) {
    const data = {
      workshop: id,
      user: UserService.getId(),
    };
    return axios.post(`${bookingLink}/request`, data);
  },
  getRequests() {
    return axios.get(`${bookingLink}/request`);
  },
  UpdateRequest(item) {
    return axios.patch(`${bookingLink}/request`, item);
  },
};

export default BookingServices;
