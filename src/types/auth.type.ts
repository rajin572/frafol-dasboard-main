interface IJwtPayload {
  userId: string;
  name: string;
  sureName: string;
  companyName: string;
  email: string;
  role: "super-admin" | "admin" | "user" | "other";
  allowedRoutes?: string[];
  iat: number;
  exp: number;
}

export type { IJwtPayload };
