export interface IAdmin {
  _id: string;
  name: string;
  sureName?: string;
  email: string;
  phone?: string;
  address?: string;
  role: "super-admin" | "admin";
  allowedRoutes: string[];
  createdAt: string;
  updatedAt: string;
}
