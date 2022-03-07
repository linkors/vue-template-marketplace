import axios from "axios";

export default {
  getCategories() {
    return axios.get("https://fakestoreapi.com/products/categories");
  }
};
