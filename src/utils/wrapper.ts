import axios from "axios";
import { AxiosRequestConfig } from "axios";

const checkResponse = (response: any) => response.data;
const catchError = (error: any) => error;

export const wrapper = ({ method, url, data, headers }: AxiosRequestConfig) =>
  axios
    .request({ method, url, data, headers })
    .then(checkResponse)
    .catch(catchError);
