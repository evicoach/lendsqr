// src/types/express/index.d.ts

import { JwtPayload } from "jsonwebtoken";

// import { Language, User } from "../custom";

// to make the file a module and avoid the TypeScript error
export {};
export interface User {
  user_id: number;
  email: string;
  first_name: string;
  last_name: string;
  dob: string;
  password?: string;
  sex: string;
}

declare global {
  namespace Express {
    export interface Request {
      email: string | JwtPayload;
      user: User;
    }
  }
}
