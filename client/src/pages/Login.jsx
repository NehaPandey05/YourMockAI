import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        alert("Invalid server response");
        return;
      }

      if (res.ok && data.token)  {
        // ✅ store full user
     localStorage.setItem("token", data.token)
        // ✅ redirect
        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed");
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

      {/* Form */}
      <div className="relative z-10 bg-white/30 backdrop-blur-lg border border-white/20 p-8 rounded-2xl w-80 shadow-xl">

        <h1 className="text-3xl font-bold text-center mb-2 text-white">
          YourMock AI
        </h1>

        <p className="text-center text-gray-200 mb-6">
          Welcome Back
        </p>

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
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="text-center mt-4 text-sm text-white">
          Don’t have an account?{" "}
          <Link to="/signup" className="font-semibold underline">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;