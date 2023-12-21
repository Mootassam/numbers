import AuthService from "../../services/auth/authService";
import apiResponseHandler from "../apiResponseHandler";

export default async (req, res, next) => {
  try {
    const payload =  await AuthService.uploadNumber(req);
    await apiResponseHandler.success(req, res, payload);
  } catch (error) {
    await apiResponseHandler.error(req, res, error);
  }
};
