import axios from './customize-axios';

const fetchAlUser = (page) => {
    return axios.get(`/api/users?page=${page}`);
}

const postGreatUse = (name, job) => {
    return axios.post("/api/users", {name, job})
}

const putGreatUse = (name, job) => {
    return axios.put("/api/users/2", {name, job})
}

const deleteUser = (id) => {
    return axios.delete(`/api/users/${id}`)
}

const loginApi = (email, password) => {
    return axios.post("/api/login", {email, password})
}

export {fetchAlUser, postGreatUse, putGreatUse, deleteUser, loginApi};
// export duoi dang Object thi bao nhieu bien cung dc