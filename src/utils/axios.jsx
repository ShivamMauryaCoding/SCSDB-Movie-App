import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NmVmZmQ1OTZlMGNlMzYzMjQ1NDE1OWIzYTI0ZTU2ZCIsIm5iZiI6MTc1NDA0MTY1NS42NjIwMDAyLCJzdWIiOiI2ODhjOGQzNzBkMDZkNmZjM2ExMWNkNzgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.P8cHkUOFwhYcwjNUUpNbLEPeWbrge3TPhL7XNt2MwX4",
  },
});

export default instance;
