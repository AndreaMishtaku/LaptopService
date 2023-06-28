import initStore from "../redux";
import { IUserState } from "../assets/interfaces";
import axiosInit from "./axios";
import JwtManager from "../utils/jwtManager";
import AuthManager from "../utils/authManager";

const initApp = async () => {
  await axiosInit();
  let currentUser: IUserState = null as unknown as IUserState;
  const token = JwtManager.getAccessToken();

  try {
    if (token) {
      if (AuthManager.validateToken(token)) {
        currentUser = AuthManager.getUserFromToken(token);
      } else {
        JwtManager.clearToken();
      }
    }
  } catch (e) {
    console.log("Error in starting application", e);
  }
  const appStore = initStore(currentUser);

  return appStore;
};
export default initApp;
