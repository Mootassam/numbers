import AuthService from "../../services/auth/authService";
import ApiResponseHandler from "../apiResponseHandler";

export default async (req, res, next) => {
  try {
    const payload = await AuthService.ChangePassword(
      req.body.oldPassword,
      req.body.newpassword,
      req.body.token
    );
    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
