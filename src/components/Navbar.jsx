import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import LoginModal from "./LoginModal";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="w-full py-4 px-10 flex justify-between">
      <p>StudySpot PH</p>
      {isLoggedIn ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={() => setIsLoginOpen(true)}>Login</button> // 
      )}

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
};

export default Navbar;
