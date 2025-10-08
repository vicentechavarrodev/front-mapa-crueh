import axios from 'axios';
import { api_config } from './api_config';


export const getData = async (endpoint) => {
  try {
    const response = await axios.get(`/${api_config.PREFIX}/${endpoint}`, 
      {auth: api_config.AUTH, 
       headers: api_config.HEADERS
      })
    .then(response => { return response; })
    .catch(error => { return error; }) ;
    return response;
  } catch (error) {
    console.log('Error al obtener datos:', error);
    return error; 
  }
};

export const postData = async (endpoint, data) => {
  try {
    const response = await axios.post(`${api_config.API_BASE_URL_DEV}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.log('Error al enviar datos:', error);
    throw error;
  }
};