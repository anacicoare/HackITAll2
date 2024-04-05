import axios from "axios";
import { nprogress } from "@mantine/nprogress";
import Cookies from 'js-cookie';
import jwtDecode from "jwt-decode";

//Main axiosInstance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 300000//Set timeout to 5 minutes
});

export default axiosInstance;