import db from './db.js';
import storageService from './storageService.js';

const baseUrl = 'http://localhost:3000/todos';

export default {
  query,
  remove,
  save,
};

function query() {
  return axios.get(baseUrl).then((res) => res.data);
}

function remove(id) {
  return axios.delete(`${baseUrl}/${id}`);
}

function save(todo) {
  var prm;
  if (todo._id) prm = axios.put(`${baseUrl}/${todo._id}`, todo);
  else prm = axios.post(baseUrl, todo);
  return prm.then((res) => res.data);
}
