import { body, validationResult } from "express-validator";

const validateLogin = [
  body("email").isEmail().withMessage("Invalid Email Format"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0].msg,
      });
    }
    next();
  },
];

export default validateLogin;
