import axios from "axios";

axios.defaults.baseURL = 'http://34.238.53.95:5000/';
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default axios;
