"use client";

import { useState } from "react";

export default function RegisterModal() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !phone || !password) {
      alert("All fields required");
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phone, password }),
    });

    const data = await res.json();

    if (data.error) {
      alert(data.error);
    } else {
      alert("Registered successfully ✅");
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl w-[350px]">
      <h2 className="text-xl font-bold mb-5 text-center">Register</h2>

      <input
        placeholder="Name"
        className="border p-3 w-full mb-3 rounded-lg"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Phone"
        className="border p-3 w-full mb-3 rounded-lg"
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-3 w-full mb-4 rounded-lg"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleRegister}
        className="bg-green-600 text-white w-full py-3 rounded-lg"
      >
        Register
      </button>
    </div>
  );
}