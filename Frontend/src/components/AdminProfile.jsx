import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AdminProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://ai-campusspeak.onrender.com/api/auth/admin/profile", {
        withCredentials: true,
      })
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleLogout = async () => {
    await axios.get(
      "https://ai-campusspeak.onrender.com/api/auth/admin/logout",{ withCredentials: true }
    );
    alert("Logged out successfully");
    window.location.href = "/admin/login";
  };

  if (loading)
    return <p className="text-center mt-10 text-lg">Loading profile...</p>;

  if (!profile)
    return alert("Resp. Admin Please login to view your profile");

  return (
    <main className="min-h-screen bg-[url('/image.png')] bg-cover bg-center w-full flex flex-col items-center justify-center px-4">
      
      <section className="bg-cyan-100 w-full max-w-md rounded-xl shadow-lg p-6 justify-center">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Profile</h1>
        <div className="flex justify-center mb-4">
          <img
            src="/user-profile.png"
            alt="User"
            className="w-28 h-28 rounded-full border"
          />
        </div>

        <h2 className="text-2xl font-bold text-center">
          {profile.fullName} {profile.lastName}
        </h2>

        <div className="mt-6 space-y-3 text-gray-700">
          <p><span className="font-semibold">Email:</span> {profile.email}</p>
          
        </div>

        <button
          onClick={handleLogout}
          className="w-full mt-6 bg-red-500 text-white py-2 rounded hover:bg-red-600 cursor-pointer"
        >
          Logout
        </button>
      </section>

      
    </main>
  );
};

export default AdminProfile;
