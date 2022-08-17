export {};
declare global {
  namespace JwtPayload {
    export interface JwtPayload {
      email: string | JwtPayload;
      user: User;
    }
  }
}
