import axios from 'axios';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all';
// const searchUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name';

const returnedData = (res) => res.data;

const getAll = () => axios.get(baseUrl).then(returnedData);

export default {
  getAll,
};
