import { Response } from "express";
import { ValidationError } from "sequelize";
import { CustomValidationError } from "../services/customErrors.service";

export default function (error: any, res:Response) {
  if (error instanceof ValidationError) {
    res.status(400).json({
      errors: error.errors.map((err) => ({
        message: err.message,
        path: err.path,
        value: err.value,
      })),
    });
    return;
  }

  if (error instanceof CustomValidationError) {
    res.status(400).json({ errors: error.errors });
    return;
  }

  res.status(500).json({ error: error.message });
  return;
}