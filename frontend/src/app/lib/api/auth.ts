import { api } from "../api";
import { RegisterInput, LoginInput } from "@Types/user";

export async function registerUser(data: RegisterInput) {
  const res = await api.post("/auth/register", data);
  return res.data;
}

export async function loginUser(data: LoginInput) {
  const res = await api.post("/auth/login", data);
  return res.data; // JWT token burada döner
}
