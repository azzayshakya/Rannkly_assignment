import { body, validationResult } from "express-validator";

const validateRegistration = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Name must only contain letters and spaces"),

  body("email").isEmail().withMessage("Invalid email format"),

  body("number")
    .matches(/^[0-9]{10}$/)
    .withMessage("Phone number must be exactly 10 digits"),

  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters"),

  body("role")
    .optional()
    .isIn(["Admin", "Manager", "Employee"])
    .withMessage("Invalid role selected"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const firstError = errors.array()[0].msg;
      return res.status(400).json({ message: firstError });
    }

    next();
  },
];

export default validateRegistration;
