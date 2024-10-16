import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import logo from "../../assets/Union.svg";
import { FcGoogle } from "react-icons/fc";
import heroImg from "../../assets/Frame 41.png";
import { Link, useNavigate } from "react-router-dom";
import { usePostDataMutation } from "../../redux/api/register-api";
import { FormData } from "../../types";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();
  const [postData] = usePostDataMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postData(formData);
    console.log("Sign-up data:", formData);
    navigate("/login");
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between bg-black w-full h-screen p-6 lg:p-10">
      <div className="flex flex-col justify-center w-full lg:w-1/2 h-full">
        <div className="flex items-center justify-center mb-8">
          <img src={logo} alt="Logo" className="w-[30px] h-[30px] mr-2" />
          <span className="text-[36px] text-white font-semibold">Snapgram</span>
        </div>

        <div className="text-center text-white mb-10">
          <h3 className="text-4xl font-bold">Create your account</h3>
          <p className="text-gray-400 mt-2">
            Please fill in the details to sign up.
          </p>
        </div>

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
            label="Full Name"
            variant="outlined"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />
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
            label="Email"
            variant="outlined"
            name="email"
            value={formData.email}
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
            Sign Up
          </Button>

          <button className="flex items-center justify-center w-full max-w-xs mx-auto mt-6 bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm py-2 px-4 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <FcGoogle className="mr-2 text-xl" />
            Sign in with Google
          </button>

          <div className="text-center text-white mt-6">
            <p className="text-sm">
              Already have an account?{" "}
              <Link to={"/login"} className="text-[#877EFF] hover:underline">
                Log in
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

export default SignUp;
