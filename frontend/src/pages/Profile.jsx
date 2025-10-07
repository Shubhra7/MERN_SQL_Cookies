import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get("/profile")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  if (!user)
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading or unauthorized...</p>
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user.username} 👋</h1>
        <p>Email: {user.email}</p>
      </div>
    </>
  );
}
