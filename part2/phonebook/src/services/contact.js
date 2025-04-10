import axios from 'axios';

const baseUrl = '/api/persons';

const returnedData = (contact) => contact.data;

const getAll = () => axios.get(baseUrl).then(returnedData);

const create = (contact) => axios.post(baseUrl, contact).then(returnedData);

const deleteContact = (id) => axios.delete(`${baseUrl}/${id}`).then(returnedData);

const update = (id, updatedContact) =>
  axios.put(`${baseUrl}/${id}`, updatedContact).then(returnedData);

export default {
  getAll,
  create,
  deleteContact,
  update,
};
