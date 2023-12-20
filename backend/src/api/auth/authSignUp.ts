import UserRepository from "../../database/Repositories/UserRepository";
import AuthService from "../../services/auth/authService";
import apiResponseHandler from "../apiResponseHandler";

export default async (req, res, next) => {
  try {
    const payload = await AuthService.Signup(
      req.body.email,
      req.body.password,
      req
    );

    apiResponseHandler.success(req, res, payload);
  } catch (error) {
    apiResponseHandler.error(req, res, error);
  }
};
