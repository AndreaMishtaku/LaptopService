import axios from "axios";
import JwtManager from "./jwtManager";
import { IUserState } from "../assets/interfaces";

class AuthManager {
  public static async logIn(email: string, password: string) {
    const response = await axios.post("/auth/login", { email, password });
    if (response.data.access_token) {
      JwtManager.setAccessToken(response.data.access_token);
    }

    const parsed = JwtManager.parse(response.data.access_token);

    return {
      id: parsed.id,
      firstName: parsed.first_name,
      lastName: parsed.last_name,
      email: parsed.email,
      role: parsed.role,
    };
  }

  public static logOut() {
    JwtManager.clearToken();
  }

  public static validateToken(token: string): Boolean {
    const parsedToken = JwtManager.parse(token);

    const expiration = new Date(parsedToken.exp * 1000);

    if (expiration > new Date()) {
      return true;
    } else {
      return false;
    }
  }

  public static getUserFromToken(token: string): IUserState {
    if (token) {
      const parsed: any = JwtManager.parse(token);
      return {
        id: parsed.id,
        firstName: parsed.first_name,
        lastName: parsed.last_name,
        email: parsed.email,
        role: parsed.role,
      };
    } else {
      return null as unknown as IUserState;
    }
  }
}

export default AuthManager;
