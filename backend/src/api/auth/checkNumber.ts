import { log } from "console";
import AuthService from "../../services/auth/authService";
import apiResponseHandler from "../apiResponseHandler";

export default async (req, res, next) => {
  try {
 
    const payload = await AuthService.saveNumber(req.body.number, req);
    await apiResponseHandler.success(req, res, payload);
  } catch (error) {
    console.log(error);
    await apiResponseHandler.error(req, res, error);
  }
};
