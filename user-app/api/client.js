import { create } from "apisauce";

const local = "http://192.168.8.150:3000";
const myphone = "http://192.168.43.22:3001";
const staging = "http://157.230.111.222:3001";
const kiks = "http://192.168.248.22:3000";

const apiClient = create({
  baseURL: staging,
});

export default apiClient;
