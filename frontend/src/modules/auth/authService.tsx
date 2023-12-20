import authAxios from "../shared/axios/authAxios";

export default class AuthService {
  static async signinWithEmailAndPassword(email, password) {
    try {
      const response = await authAxios.post("/auth/signin", {
        email,
        password,
      });

      return response.data;
    } catch (error) {}
  }
  static async signupWithEmailAndPassword(email, password) {
    try {
      const response = await authAxios.post("/auth/signup", {
        email,
        password,
      });
      return response.data;
    } catch (error) {}
  }
}
