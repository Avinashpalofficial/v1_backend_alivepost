import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET ;


export function AuthUser(
  req: Request,
  res: Response,
  next: NextFunction
): any {
  const token = req.cookies.token.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      msg: "No authentication token provided",
    });
  }

  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set");
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET) as AuthUserType
    // Attach decoded token to request for downstream use
    (req as any).user= verified;
    
    next();
  } catch (error) {
  next(error)
  }
}