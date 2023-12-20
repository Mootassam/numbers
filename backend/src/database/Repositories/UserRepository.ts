import phoneModel from "../models/Phone";
import userModel from "../models/user";

class UserRepository {
  static async Signup(email, password, options) {
    const data = {
      username: email.split("@")[0],
      email,
      password,
    };
    const payload = userModel.create(data);

    return payload;
  }

  static async findByEmail(email) {
    const payload = userModel.findOne({ email: email });
    return payload;
  }

  static findByPassword(userExsting) {
    if (userExsting) {
      const payload = userModel.findOne(
        {
          password: userExsting.password,
        },
        { password: 1, _id: 0 }
      );
      return payload;
    }
  }

  static saveNumber(number) {
    const data = {
      number: number,
    };
    const payload = phoneModel.create(data);
    return payload;
  }

  static Finduplicate(number) {
    if (!number) return;

    const data = phoneModel.findOne({ number: number });

    return data;
  }
}
export default UserRepository;
