import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const returnedData = (contact) => contact.data;

const getAll = () => axios.get(baseUrl).then(returnedData);

const create = (contact) => axios.post(baseUrl, contact).then(returnedData);

export default {
  getAll,
  create,
};
