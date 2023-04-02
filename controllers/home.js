exports.homePage = function (req, res) {
  let error = req.cookies.error;
  res.clearCookie("error");
  res.render("home", {
    error: error,
  });
};
