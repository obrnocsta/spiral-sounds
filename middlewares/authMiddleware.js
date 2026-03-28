export const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    console.log("Access to protected route blocked");
    res.status(401).json({ success: false, error: "Unauthorized" });
    return;
  }
  next();
};
