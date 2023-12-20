import AuthService from "../../services/auth/authService";
import apiResponseHandler from "../apiResponseHandler";

export default async (req, res, next) => {
  try {
    const payload = await AuthService.Signin(
      req.body.email,
      req.body.password,
      req
    );
    await apiResponseHandler.success(req, res, payload);
  } catch (error) {
    console.log(error);
    await apiResponseHandler.error(req, res, error);
  }
};
