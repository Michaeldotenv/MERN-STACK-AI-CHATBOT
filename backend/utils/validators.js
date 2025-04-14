import { body, validationResult } from "express-validator";

// Reusable validation middleware
const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        return res.status(422).json({ errors: errors.array() });
    };
};

// Validators
const loginValidator = [
    body("email")
        .trim()
        .isEmail()
        .withMessage("Email is required"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password should contain at least 6 characters"),
];

const signUpValidator = [
    body("name")
        .notEmpty()
        .withMessage("Name is required"),
    ...loginValidator,
];

export {
    validate,
    loginValidator,
    signUpValidator
};