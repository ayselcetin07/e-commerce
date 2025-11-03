"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
const api = {
  post: async (path: string, body?: unknown) => {
    const res = await fetch(`${baseUrl}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw json;
    return { data: json };
  },
};

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const res = await api.post("/auth/register", { email, password });
      alert("Kayıt başarılı! Token: " + res.data.token);
    } catch (err) {
      alert("Kayıt başarısız");
    }
  };

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      router.push("/products/manage"); // ✅ yönlendirme buraya
    } catch (err) {
      alert("Giriş başarısız");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 space-y-4">
      <h1 className="text-2xl font-bold text-center">Giriş / Kayıt</h1>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Şifre"
        className="w-full p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex gap-4 justify-center">
        <button onClick={handleRegister} className="bg-blue-500 text-white px-4 py-2 rounded">
          Kayıt Ol
        </button>
        <button onClick={handleLogin} className="bg-green-500 text-white px-4 py-2 rounded">
          Giriş Yap
        </button>
      </div>
    </div>
  );
}
