const roleBasedAccessMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: No role assigned",
        });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: You don't have access to this resource",
        });
      }

      next();
    } catch (error) {
      console.error("Role Middleware Error:", error.message);
      return res.status(500).json({
        success: false,
        message: "Server Error: Role check failed",
      });
    }
  };
};

export default roleBasedAccessMiddleware;
