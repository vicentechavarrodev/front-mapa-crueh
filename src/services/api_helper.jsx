import axios from "axios";
import { api_config } from "./api_config";

axios.defaults.withCredentials = true;

export const get_data = async (url_base, service_prefix, endpoint) => {
  try {
    const response = await axios
      .get(`${url_base}/${service_prefix}/${endpoint}`, {
        headers: api_config.HEADERS,
        auth: api_config.AUTH,
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
    return response;
  } catch (error) {
    console.log("Error al obtener datos:", error);
    return error;
  }
};

export const post_data = async (
  url_base,
  service_prefix,
  endpoint,
  data,
  auth,
  headers,
  params
) => {
  try {
    const response = await axios.post(
      `${url_base}/${service_prefix}/${endpoint}`,
      data,
      {
        headers,
        auth: auth ? auth : {},
        params: params ? params : {},
      }
    );
    return response;
  } catch (error) {
    console.log("Error al enviar datos:", error);
    throw error;
  }
};
