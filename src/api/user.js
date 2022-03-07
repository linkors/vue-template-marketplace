import axios from "axios";

export default {
  login({ username, password }) {
    return axios.post(`https://fakestoreapi.com/auth/login`, {
      username,
      password
    });
  }
};
