import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_HOSTNAME,
  headers: {
    "Content-Type": "application/json"
  },

  // Needed for cookies required by server
  // for sticky logon sessions
  withCredentials: true,
	credentials: "same-origin"
});

export default api;