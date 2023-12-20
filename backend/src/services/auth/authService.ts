import UserRepository from "../../database/Repositories/UserRepository";
import bcrypt from "bcrypt";
import { error, log } from "console";
import jwt from "jsonwebtoken";
import Error400 from "../../errors/Error400";
class AuthService {
  static async Signup(email, password, options) {
    try {
      email = email.toLowerCase();
      password = await bcrypt.hash(password, 12);
      const existingUser = await UserRepository.findByEmail(email);
      if (existingUser) {
        const existingPassword = UserRepository.findByPassword(existingUser);
        if (existingPassword) {
          throw new Error();
        }
      }
      const newUser = await UserRepository.Signup(email, password, options);
      const token = jwt.sign(
        { id: newUser._id },
        "GENERATE_SOME_RANDOM_UUID_HERE",
        { expiresIn: 360 }
      );

      return token;
    } catch (error) {
      console.log(error);
    }
  }
  static async Signin(email, password, options) {
   
    try {
      email = email.toLowerCase();
      const user = await UserRepository.findByEmail(email);
      if (!user) {
        throw new Error400("User Not Found");
      }

      
        const currentPassword = await UserRepository.findByPassword(user);
        if (!currentPassword) {
          throw new Error400("Passowrd Wrong");

        }

        const passwordsMatch = await bcrypt.compare(
          password,
          currentPassword?.password
        );
        if (!passwordsMatch) {
          throw new Error400("Passowrd Wrong");
        }

        const token = jwt.sign(
          { id: user?._id },
          "GENERATE_SOME_RANDOM_UUID_HERE",
          {
            expiresIn: 360,
          }
        );
        return token;
    
    } catch (error) {

      throw error;
    }
  }
  static ForgetPassword() {}
  static ResetPassword() {}
}

export default AuthService;
