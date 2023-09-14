export const validate = (schema) => [
  (req, res, next) => {
    const validation = schema.validate(req.body, { abortEarly: false });

    if (validation.error) {
      return res.status(400).json({
        success: false,
        message: validation.error.details.map((x) => x.message),
      });
    }
    return next();
  },
];
