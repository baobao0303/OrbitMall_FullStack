import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import HttpConstants from '../constants/http.constants';

function formatErrorMessage(error: joi.ValidationError) {
  return error.details.map((item) => item.message.replace(/['"]/g, ''));
}

export default function validateSchema(schema: joi.Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false
    });
    if (error) {
      return res.status(HttpConstants.BAD_REQUEST).json({
        errors: formatErrorMessage(error)
      });
    }
    next();
  };
}
