import axios from "axios";

export default {
  getProducts() {
    return axios.get("https://fakestoreapi.com/products");
  },
  getProduct(id) {
    return axios.get("https://fakestoreapi.com/products/" + id);
  }
};
