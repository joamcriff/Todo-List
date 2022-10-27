import axios from "axios";

axios.interceptors.request.use(function (request) {
    // Do something before request is sent
    if(localStorage.getItem("token")) {
        request.headers.authorization = "Bearer " + localStorage.getItem("token");
    }
    return request;
  })

export default function callAPI(endpoint, method = "GET", body) {
    return axios({
        url: `https://www.task-manager.api.mvn-training.com/${endpoint}`,
        method: method,
        data: body
    })
} 
