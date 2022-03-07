import axios from "axios";

export default {
  getCartByUserId(id) {
    return axios.get(`https://fakestoreapi.com/carts/${id}`);
  }
};
