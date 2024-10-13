import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import logo from "../../assets/Union.svg";
import { FcGoogle } from "react-icons/fc";
import heroImg from "../../assets/Frame 41.png";
import { Link } from "react-router-dom";

type FormData = {
  username: string;
  password: string;
};

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login data:", formData);
  };

  return (
    <div className="flex items-center justify-between bg-black w-full h-screen p-6 lg:p-10">
      <div className="flex flex-col justify-center w-full lg:w-1/2 h-full">
        {/* Логотип */}
        <div className="flex items-center justify-center mb-8">
          <img src={logo} alt="Logo" className="w-[30px] h-[30px] mr-2" />
          <span className="text-[36px] text-white font-semibold">Snapgram</span>
        </div>

        {/* Заголовок */}
        <div className="text-center text-white mb-10">
          <h3 className="text-4xl font-bold">Log in to your account</h3>
          <p className="text-gray-400 mt-2">
            Welcome back! Please enter your details.
          </p>
        </div>

        {/* Форма входа */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: 400,
            mx: "auto",
            p: 3,
            borderRadius: 2,
            backgroundColor: "#1a1a1a",
          }}
        >
          <TextField
            label="Username"
            variant="outlined"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              backgroundColor: "#877EFF",
              "&:hover": { backgroundColor: "#6C63FF" },
              textTransform: "none",
            }}
          >
            Login
          </Button>

          <button className="flex items-center justify-center w-full max-w-xs mx-auto mt-6 bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm py-2 px-4 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <FcGoogle className="mr-2 text-xl" />
            Sign in with Google
          </button>

          <div className="text-center text-white mt-6">
            <p className="text-sm">
              Don’t have an account?{" "}
              <Link to={"/sign-up"} className="text-[#877EFF] hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </Box>
      </div>

      <div className="hidden lg:block lg:w-1/2 h-full">
        <img
          src={heroImg}
          alt="Hero"
          className="object-cover w-full h-full rounded-lg"
        />
      </div>
    </div>
  );
};

export default Login;
