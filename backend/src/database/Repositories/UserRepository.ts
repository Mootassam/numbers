import { log } from "console";
import phoneModel from "../models/Phone";
import userModel from "../models/user";
import fs from "fs";
import multer, { Multer } from "multer";
import { promisify } from "util";
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

  static async checkDuplicate(data) {
    let duplicateNumber: number = 0;
    let newNumber: number = 0;
    if (!data) return;
    for (let index = 0; index < data?.data?.length; index++) {
      let number = Number(data?.data[index]);
      const isExist = await this.Finduplicate(number);
      if (isExist) {
        duplicateNumber += 1;
      }
      if (!isExist) {
        await this.saveNumber(number);
        newNumber += 1;
      }
    }

    return { duplicateNumber, newNumber };
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
