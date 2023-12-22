import { log } from "console";
import phoneModel from "../models/Phone";
import userModel from "../models/user";
import fs from "fs";
import multer, { Multer } from "multer";
import { promisify } from "util";
import { IRepositoryOptions } from "./IRepositoryOptions";
import MongooseRepository from "./MongooseRepository";
import Error400 from "../../errors/Error400";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const readFileAsync = promisify(fs.readFile);

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

  static async updatePassword(id, password) {
    const currentUser = await userModel.updateOne(
      { _id: id },
      { password: password }
    );
    return currentUser;
  }

  static findUser(id) {
    if (!id) return;
    const currentUser = userModel.findOne({ _id: id }, { password: 1, _id: 0 });
    return currentUser;
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

  static findPassword(id, password) {
    if (id && password) {
      const payload = userModel.findOne(
        {
          _id: id,
          password: password,
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

  static async checkDuplicate(data) {
    let duplicateNumber = 0;
    let newNumber = 0;
    let arrayDuplicateNumber: number[] = [];

    if (!data) return;

    for (let index = 0; index < data?.data?.length; index++) {
      const number = Number(data?.data[index]);

      // Check if the value is a number and not an empty string
      if (!isNaN(number) && data.data[index].trim() !== "") {
        const isExist = await this.Finduplicate(number);

        if (isExist) {
          duplicateNumber += 1;
          arrayDuplicateNumber.push(Number(data?.data[index]));
        }

        if (!isExist) {
          await this.saveNumber(number);
          newNumber += 1;
        }
      } else {
        throw new Error400("File should be content Number");
      }
    }

    return { duplicateNumber, newNumber, arrayDuplicateNumber };
  }

  static async uploadFile(req) {
    let data: string[] = [];
    return new Promise((resolve, reject) => {
      // Check if 'file' is the correct field name in your form
      upload.single("file")(req, null, async (err) => {
        if (err) {
          console.error("Error uploading file:", err);
          reject(err);
        } else {
          if (req.file) {
            const fileBuffer = req.file.buffer;

            const csvData = fileBuffer.toString("utf-8");
            const phoneNumbers: string[] = csvData
              .split("\n")
              .slice(1)
              .map((line: string) => line.trim());
            for (const iterator of phoneNumbers) {
              if (iterator.trim() !== "") {
                data.push(iterator);
              }
            }
            resolve({ success: true, data });
          } else {
            // Handle the case when 'req.file' is not defined
            return reject(new Error("No file Uploaded"));
          }
        }
      });
    });
  }
}
export default UserRepository;
