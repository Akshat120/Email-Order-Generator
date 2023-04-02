var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../api/db/user");
exports.dashboard = function (req, res) {
  res.clearCookie("error");
  let user = req.cookies.user;
  res.render("dashboard", {
    user: user,
  });
};

exports.logout = function (req, res) {
  res.clearCookie("user");
  res.clearCookie("token");
  res.clearCookie("error");
  res.redirect("/");
};

exports.login = async function (req, res) {
  User.get(req.body.email, "email")
    .then((data) => {
      if (data) {
        bcrypt.compare(
          req.body.password,
          data.password,
          function (err, isValid) {
            if (isValid) {
              let user = { id: data._id, email: data.email };
              res.cookie("user", user, { expiresIn: "1d", httpOnly: true });
              if (!data.code) {
                var token = jwt.sign(user, process.env.PRIVATEKEY, {
                  expiresIn: "1d",
                });
                res.cookie("token", token, { expiresIn: "1d", httpOnly: true });
                res.redirect("/dashboard");
              } else {
                res.cookie("error", ["otp is not confirmed"], {
                  expiresIn: "1s",
                  httpOnly: true,
                });
                res.render("otp");
              }
            } else {
              res.cookie("error", ["Invalid Password"], {
                expiresIn: "1s",
                httpOnly: true,
              });

              res.redirect("/");
            }
          }
        );
      } else {
        res.cookie("error", ["Email not registered"], {
          expiresIn: "1s",
          httpOnly: true,
        });
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });
};

exports.register = async function (req, res) {
  let user = new User(req.body);
  await user
    .create(req.body)
    .then((data) => {
      res.cookie(
        "user",
        { id: data._id, email: data.email },
        { expiresIn: "1d", httpOnly: true }
      );
      res.render("otp");
    })
    .catch((err) => {
      res.cookie("error", err, { expiresIn: "1s", httpOnly: true });
      res.redirect("/");
    });
};

exports.otp = function (req, res) {
  res.render("otp");
};

exports.cnfotp = function (req, res) {
  let user = req.cookies.user;
  User.get(user.id, "mongodb")
    .then(async (data) => {
      let code = req.body.otp;
      code = code[0] + code[1] + code[2] + code[3];
      if (data.code == code) {
        let token = jwt.sign(user, process.env.PRIVATEKEY, { expiresIn: "1d" });

        // remove-code from document which is in mongodb
        data.code = undefined;
        await data
          .save()
          .then(() => {
            res.cookie("token", token, { expiresIn: "1d", httpOnly: true });
            res.redirect("/dashboard");
          })
          .catch((err) => {
            res.status(500).json({
              msg: "unable to remove code from document",
            });
          });
      } else {
        res.cookie("error", ["Invalid otp!", "login to enter correct otp"], {
          expiresIn: "1s",
          httpOnly: true,
        });
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.status(500).json({
        msg: err,
      });
    });
};

exports.verifyToken = function (req, res, next) {
  let token = req.cookies.token;

  jwt.verify(token, process.env.PRIVATEKEY, function (err, decoded) {
    if (err) {
      res.cookie("error", ["Token is invalid"], {
        expiresIn: "1s",
        httpOnly: true,
      });
      res.redirect("/");
    } else {
      next();
    }
  });
};

exports.checkUser = function (req, res, next) {
  let token = req.cookies.token;
  let user = req.cookies.user;

  jwt.verify(token, process.env.PRIVATEKEY, function (err, decoded) {
    if (err) {
      next();
    } else {
      if (user.email == decoded.email && user.id == decoded.id) {
        res.redirect("/dashboard");
      } else next();
    }
  });
};
