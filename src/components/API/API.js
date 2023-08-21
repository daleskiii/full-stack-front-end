import Axios from "./Axios";

async function getProducts() {
  try {
    let result = await Axios.get("/products");

    return result;
  } catch (e) {
    return e;
  }
}

async function getProductById(id) {
  try {
    let result = await Axios.get(`/products/${id}`);

    return result;
  } catch (e) {
    return e;
  }
}

async function login(data) {
  try {
    let result = await Axios.post("/user/login", data);

    return result;
  } catch (e) {
    return e;
  }
}

async function signUp(data) {
  try {
    let result = await Axios.post("/user", data);

    return result;
  } catch (e) {
    return e;
  }
}
async function getUser(id) {
  try {
    let result = await Axios.get(`/user/${id}`);

    return result;
  } catch (e) {
    return e;
  }
}

async function getOrderByUser(id) {
  try {
    let result = await Axios.get(`/user/orders/${id}`);

    return result;
  } catch (e) {
    return e;
  }
}
async function editUser(id, updatedUserData) {
  try {
    let result = await Axios.put(`/user/${id}`, updatedUserData);

    return result;
  } catch (e) {
    return e;
  }
}

async function deleteUser(id) {
  try {
    let result = await Axios.delete(`/user/${id}`);
    return result;
  } catch (e) {
    console.log(e);
  }
}
async function productView(id, product_id) {
  try {
    let result = await Axios.post(`/user/${id}/orders`, product_id);
    return result;
  } catch (e) {
    console.log(e);
  }
}
export {
  getProducts,
  login,
  signUp,
  getUser,
  getOrderByUser,
  editUser,
  deleteUser,
  productView,
  getProductById,
};
