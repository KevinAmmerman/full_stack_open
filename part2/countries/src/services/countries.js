import axios from 'axios';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all';

const returnedData = (res) => res.data;

const getAll = () => axios.get(baseUrl).then(returnedData);

export default {
  getAll,
};
