require("dotenv").config();
const mongoose = require("mongoose");
const UserCollection = require("../../models/user.js");
const email = require("../email/user");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");

const validRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

module.exports = class User {
  constructor(data) {
    this.data = data;
    this.errors = [];
    this.code = otpGenerator.generate(4);
  }
  cleanUp() {
    if (typeof this.data.email != "string") this.data.email = "";
    if (typeof this.data.password != "string") this.data.password = "";

    this.data = {
      _id: new mongoose.Types.ObjectId(),
      email: this.data.email,
      password: this.data.password,
      code: this.code,
    };
  }

  validate() {
    if (!this.data.email.match(validRegex)) {
      this.errors.push("Email is invalid!");
    }
    if (this.data.password.length <= 3 || this.data.password.length > 20) {
      this.errors.push("Password length should be in [4,20] !");
    }
  }

  async create() {
    return new Promise(async (resolve, reject) => {
      if (this.data.password != this.data.repassword) {
        this.errors.push("password don't match!");
      }
      this.cleanUp();
      this.validate();

      if (this.errors.length == 0) {
        await UserCollection.findOne({ email: this.data.email })
          .then(async (found) => {
            if (found) {
              reject(["User Already Exists"]);
            } else {
              bcrypt.hash(this.data.password, 10, async (err, hash) => {
                email.send(this.data.email, this.data.code);
                this.data.password = hash;

                await UserCollection.create(this.data)
                  .then((data) => {
                    resolve(data);
                  })
                  .catch((err) => {
                    resolve({
                      err: err,
                    });
                  });
              });
            }
          })
          .catch((err) => {
            reject({
              err: err,
            });
          });
      } else {
        reject(this.errors);
      }
    });
  }

  static async get(id, type) {
    return new Promise(async (resolve, reject) => {
      if (type == "mongodb") {
        await UserCollection.findOne({ _id: id })
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(data);
          });
      } else {
        await UserCollection.findOne({ email: id })
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(data);
          });
      }
    });
  }
};
