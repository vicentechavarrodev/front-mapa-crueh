import { post_data } from "../../services/api_helper";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { socket_constants } from "./constants";
import { api_config } from "../../services/api_config";

export { obtener_session };

const obtener_session = createAsyncThunk(
  socket_constants.API_URLS.OBTENER_SESSIONS_TRACCAR,
  async (arg, thunkAPI) => {
    let response;

    const fechaExpiracion = new Date();
    fechaExpiracion.setFullYear(fechaExpiracion.getFullYear() + 1);

    const bodyFormData = new URLSearchParams();
    bodyFormData.append("expiration", fechaExpiracion.toISOString());

    try {
      response = await post_data(
        "",
        import.meta.env.VITE_PREFIX_BASE_URL,
        socket_constants.API_URLS.OBTENER_SESSIONS_TRACCAR,
        bodyFormData,
        api_config.AUTH_TRACCAR,
        api_config.HEADERS_TRACCAR
      );
      if (response.status === 200) {
        return response.data;
      }
      return thunkAPI.rejectWithValue({
        message: response.message + " " + response.config.url,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
