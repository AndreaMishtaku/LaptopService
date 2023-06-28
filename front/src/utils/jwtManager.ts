import LocalStorageManager from "./localStorageManager";

class JwtManager {
  private static access_token = "access_token";

  public static getAccessToken(): string {
    const token = LocalStorageManager.getItem(this.access_token);
    return token;
  }

  public static setAccessToken(token: string | null): void {
    if (token) {
      LocalStorageManager.setItem(this.access_token, token);
    } else {
      LocalStorageManager.removeItem(this.access_token);
    }
  }

  public static clearToken() {
    LocalStorageManager.removeItem(this.access_token);
  }

  public static parse(token: string) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }
}

export default JwtManager;
