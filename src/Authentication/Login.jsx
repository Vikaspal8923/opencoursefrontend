
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link, json } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setSignupData } from "../reducer/slice/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from 'rsuite';



const Login = () => {


	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});


	const dispatch = useDispatch();
	const navigate = useNavigate();

	console.log("Dispatch function:", dispatch);
    console.log("Navigate function:", navigate);



	const handleChange = (e) => {
		 setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
	  
		try {
		  toast.loading("Logging in...", { position: "top-right", autoClose: false });
	  
		  const response = await axios.post("https://opencoursem.netlify.app/auth/login", formData);
	  
		  console.log("Full Response:", response); // Log the full response
	  
		  if (response.status === 200) {
			const { user, token } = response.data.data;
	  
			console.log("User:", user);
			console.log("Token:", token);
	  
			dispatch(setSignupData(user));
			dispatch(setToken(token));
	  
			localStorage.setItem("signupData", JSON.stringify(user));
			localStorage.setItem("token", token); // Store token without quotes
	  
			navigate("/");
			toast.dismiss();
			toast.success("Login Successful!");
		  } else {
			toast.dismiss();
			toast.error("Login failed. Please try again.");
		  }
		} catch (err) {
		  console.error("Login Error:", err.response ? err.response.data : err.message);
		  toast.dismiss();
		  toast.error("Error logging in. Please check credentials.");
		}
	  };
	  




	return (
		<div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-200 to-indigo-200">
			<form
				onSubmit={handleSubmit}
				className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
				<h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
					Login
				</h2>
				<input
					type="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					placeholder="Email"
					className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>
				<input
					type="password"
					name="password"
					value={formData.password}
					onChange={handleChange}
					placeholder="Password"
					className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>
				<button
					type="submit"
					className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-200">
					Login
				</button>

				
{/* <GoogleLogin
 
  onSuccess={(credentialResponse) => {
	const data = jwtDecode(credentialResponse.credential); 
   console.log(data)
  }}
  onError={() => {
    console.log("Login Failed");
   }}
/> */}
				<p className="mt-4 text-center text-gray-600">
					Don't have an account?{" "}
					<Link
						to="/signup"
						className="text-blue-600 hover:underline">
						Sign Up
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Login;
