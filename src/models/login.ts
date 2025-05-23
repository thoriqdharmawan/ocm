export interface UserType {
  id: number;
  username: string;
  email: string;
  password: string;
  role: "admin" | "user";
  token: string;
  refreshToken: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  isActive: boolean;
  isVerified: boolean;
}