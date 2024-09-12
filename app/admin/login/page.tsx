"use client";
import { useFetchData } from "@/src/hooks/useFetchData";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

// eco@gmail.com
// 1234
const Login = () => {
  const { putData } = useFetchData("admin");

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId || !password) {
      setError("Need to fill both user id and password");
    }
    let res;
    try {
      res = await putData({ email: userId, password: password }, "post");
    } catch (err) {
      setError("Ivalid Password or id");
    }
    console.log(res);
    if (res.token) {
      localStorage.setItem("authToken", res.token);
      router.push("/admin");
    } else {
      console.log(res);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        <div className="mb-4">
          <label htmlFor="userId" className="block text-gray-700 text-sm font-bold mb-2">
            User ID:
          </label>
          <input type="text" id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password:
          </label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        {error && <p className="text-red-500 text-sm mb-1">{error}</p>}

        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
