exports.get404 = (req, res, next) => {
  res.status(404).render("404", { docTitle: "Page Not Found" });
};

exports.getError = (req, res, next) => {
  res.status(500).render("error", { docTitle: "Error" });
};
