import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ApiError } from '../types/index.js';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error('Error:', error);

  if (error instanceof ZodError) {
    const apiError: ApiError = {
      message: 'Validation failed',
      code: 'VALIDATION_ERROR',
      details: error.errors
    };
    res.status(400).json(apiError);
    return;
  }

  if (error.name === 'PrismaClientKnownRequestError') {
    // Handle unique constraint violations
    if ((error as any).code === 'P2002') {
      const apiError: ApiError = {
        message: 'A record with this data already exists',
        code: 'DUPLICATE_RECORD'
      };
      res.status(409).json(apiError);
      return;
    }
  }

  // Default error response
  const apiError: ApiError = {
    message: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : error.message,
    code: 'INTERNAL_ERROR'
  };

  res.status(500).json(apiError);
}

export function notFoundHandler(req: Request, res: Response) {
  const apiError: ApiError = {
    message: `Route ${req.originalUrl} not found`,
    code: 'NOT_FOUND'
  };
  res.status(404).json(apiError);
}
