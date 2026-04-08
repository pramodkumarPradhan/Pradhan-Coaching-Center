"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";

export default function LoginPage() {
  const router = useRouter();
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (user: any) => {
    localStorage.setItem("user", JSON.stringify(user));
    router.push("/notes");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-indigo-200 gap-4">
      
      {showRegister ? (
        <>
          <RegisterModal />
          <button
            onClick={() => setShowRegister(false)}
            className="text-sm text-blue-600"
          >
            Already have an account? Login
          </button>
        </>
      ) : (
        <>
          <LoginModal onLogin={handleLogin} />
          <button
            onClick={() => setShowRegister(true)}
            className="text-sm text-blue-600"
          >
            New user? Register
          </button>
        </>
      )}

    </div>
  );
}