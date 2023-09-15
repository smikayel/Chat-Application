import axios from "axios";

export const API_URL = process.env.REACT_APP_API_URL;

class AuthService {
  login(username: string, password: string) {
    return axios
      .post(API_URL + "auth/login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username: string, password: string) {
    return axios.post(API_URL + "auth/sign-up", {
      username,
      password,
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    try {
      if (userStr) return JSON.parse(userStr);
    } catch (err) {
      return null;
    }

    return null;
  }
}

export default new AuthService();
