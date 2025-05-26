import Joi from "joi";

export const UserRegisterSchema = Joi.object({
  name: Joi.string().trim().min(3).max(20).required(),
  email: Joi.string().email().trim().min(3).max(30).required(),
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"))
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
    }),
});
