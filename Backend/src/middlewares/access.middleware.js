const access = (roleArr) => {
  return (req, res, next) => {
    if (roleArr.includes(req.user.role)) {
      return next();
    }
    res
      .status(403)
      .json({ message: "❌ Forbidden: You don’t have permission" });
  };
};

module.exports = access;
