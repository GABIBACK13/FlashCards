import { Response } from "express";
import { ValidationError } from "sequelize";
import { CustomValidationError } from "../services/customErrors.service";

export default function (error: any, res: Response) {
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

  if (error.name === "SequelizeDatabaseError") {
    res.status(400).json({ errors: { message: error.sqlMessage, path: error.code } });
  }

  console.log(error);
  res.status(500).json({ error: error.message });
  return;
}
