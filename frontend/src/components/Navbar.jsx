import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await api.post("/logout");
    navigate("/login");
  };
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <h1
        className="text-lg font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        MERN + MySQL
      </h1>
      <div className="space-x-4">
        <button
          onClick={() => navigate("/profile")}
          className="hover:text-blue-400"
        >
          Profile
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
