import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
      email: string;
      role: string;
    };
  }
}

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
    user?: any;      
  }
}
