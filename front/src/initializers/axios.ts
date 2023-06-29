import axios, { AxiosRequestConfig } from "axios";
import eNotificationType from "../assets/enums/eNotificationType";
import eHttpResponse from "../assets/enums/eHttpResponse";
import toast from "react-hot-toast";
import LocalStorageManager from "../utils/localStorageManager";

interface IAxiosRequestConfigRetry extends AxiosRequestConfig {
  _noAuth: boolean;
}

const handleResponseMessage = (
  message: string,
  notificationType: eNotificationType
) => {
  switch (notificationType) {
    case eNotificationType.SUCCESS:
      toast.success(message, { duration: 3000 });
      break;
    case eNotificationType.ERROR:
      toast.error(message, { duration: 3000 });
      break;
    default:
      Error("handleResponseMessage: Notification Type not handled");
  }
};
const clearSession = () => {
  localStorage.removeItem("access_token");
  window.location.href = "/";
};
const axiosInit = async () => {
  axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}`;
  axios.interceptors.request.use((request) => {
    const jwt = LocalStorageManager.getItem("access_token");

    if (jwt) {
      request.headers["Authorization"] = `Bearer ${jwt}`;
    }
    return request;
  });

  axios.interceptors.response.use(null, async (error) => {
    const originalRequest: IAxiosRequestConfigRetry = error.config;
    if (originalRequest._noAuth) {
      throw error.response;
    }
    if (
      error.response &&
      error.response.status === eHttpResponse.Unauthorized
    ) {
      clearSession();
    }

    if (error.response) {
      if (error.response.data?.message) {
        handleResponseMessage(
          error.response.data?.message,
          eNotificationType.ERROR
        );
      }
      if (error.response.status === eHttpResponse.NotFound) {
        Error("axiosInit: action not found");
      }
    }
  });
};

export default axiosInit;
