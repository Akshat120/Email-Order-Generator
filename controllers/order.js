const email = require("../api/email/user");
exports.sendOrder = async function (req, res) {
  if (typeof req.body.pid == "string") {
    req.body.pid = [req.body.pid];
    req.body.ppp = [req.body.ppp];
    req.body.qty = [req.body.qty];
  }
  usrName = req.cookies.user.email.split("@")[0];
  email.sendReceipt(req.body, usrName);
  res.redirect("/dashboard");
};
