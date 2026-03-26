module.exports = (req, res, next) => {
  if (!req.user) return res.status(401).json("Access Denied");
  if (req.user.role !== "admin") return res.status(403).json("Admin access required");
  next();
};