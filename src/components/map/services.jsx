
import { getData } from '../../services/api_helper';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { map_constants } from './constants';

 export const obtener_mesas  = createAsyncThunk(map_constants.API_URLS.OBTENER_MESAS, async (arg,thunkAPI) => {
   let response;
     try {
       response = await getData(map_constants.API_URLS.OBTENER_MESAS);
       if (response.status === 200) {
          return response.data;
        }
        return thunkAPI.rejectWithValue({ message: response.message + " " + response.config.url });
      
     } catch (error) {
       return thunkAPI.rejectWithValue({ message: error.message });
     }
   
    });