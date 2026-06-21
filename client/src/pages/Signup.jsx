import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup" , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

     const data = await res.json();

if (res.ok) {

  localStorage.setItem("token", data.token);

  localStorage.setItem(
    "userId",
    data.user._id
  );

  navigate("/dashboard");
}else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">

      {/* Background */}
      <img
        src="https://media.licdn.com/dms/image/v2/D5612AQEoTzK2rVxHZQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1707420465234?e=2147483647&v=beta&t=IzoxtBV0Y1wyOq5kD05bT5UVW6cSwUVvVJ1n65JdYxA"
        alt="bg"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div className="relative z-10 bg-white/30 backdrop-blur-lg border border-white/20 p-8 rounded-2xl w-80 shadow-xl">

        <h1 className="text-3xl font-bold text-center mb-2 text-white">
          YourMock AI
        </h1>

        <p className="text-center text-gray-200 mb-6">
          Create your account
        </p>

        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full mb-4 p-3 rounded-lg bg-white/80 outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded-lg bg-white/80 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 rounded-lg bg-white/80 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleSignup}
          className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition"
        >
          Signup
        </button>

        <p className="text-center mt-4 text-sm text-white">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;