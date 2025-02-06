import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link, json } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setSignupData } from "../reducer/slice/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "rsuite";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Show the loading toast and store the toast ID
		const loadingToastId = toast.loading("Logging in...", {
			position: "top-right",
			autoClose: false,
			hideProgressBar: true,
			closeOnClick: false,
			pauseOnHover: true,
			draggable: true,
			theme: "light",
		});

		try {
			// Send the login request
			const response = await axios.post(
				"https://opencoursebackend.onrender.com/auth/login",
				formData
			);

			if (response) {
				console.log("login response", response.data);

				// Dispatch data to store
				dispatch(
					setSignupData(response.data.data.user)
				);
				dispatch(setToken(response.data.data.token));

				// Store signup data and token in local storage
				localStorage.setItem(
					"signupData",
					JSON.stringify(response.data.data.user)
				);
				localStorage.setItem(
					"token",
					JSON.stringify(response.data.data.token)
				);

				// Navigate to the home page
				navigate("/");

				// Dismiss the loading toast
				toast.dismiss(loadingToastId);

				// Show success message
				toast.success("Login Successful!", {
					position: "top-right",
					autoClose: 5000,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
				});
			} else {
				// Dismiss the loading toast
				toast.dismiss(loadingToastId);

				// Handle the failed login case
				toast.error("Login failed", {
					position: "top-right",
					autoClose: 5000,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
				});
			}
		} catch (err) {
			console.log("Error is ", err);
			// Dismiss the loading toast
			toast.dismiss(loadingToastId);

			// Show error toast
			toast.error("Error logging in", {
				position: "top-right",
				autoClose: 5000,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
		}
	};

	return (
		<div className="bg-bg-dark">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<div className="w-full rounded-lg shadow dark:border sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
					<div className="p-6 space-y-4 md:space-y-3 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
							Create an account
						</h1>
						<form
							onSubmit={handleSubmit}
							className="space-y-4 md:space-y-4">
							<div>
								<label
									htmlFor="email"
									className="block mb-2 text-sm font-semibold text-white">
									Email
								</label>
								<input
									type="email"
									name="email"
									value={
										formData.email
									}
									onChange={
										handleChange
									}
									placeholder="Email"
									className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
									required
								/>
							</div>

							<div>
								<label
									htmlFor="password"
									className="block mb-2 text-sm font-semibold text-white">
									Password
								</label>
								<input
									type="password"
									name="password"
									value={
										formData.password
									}
									onChange={
										handleChange
									}
									placeholder="Password"
									className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
									required
								/>
							</div>

							<div className="flex justify-center">
								<button
									type="submit"
									className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-200">
									Login
								</button>
							</div>

							{/* <GoogleLogin
 
  onSuccess={(credentialResponse) => {
	const data = jwtDecode(credentialResponse.credential); 
   console.log(data)
  }}
  onError={() => {
    console.log("Login Failed");
   }}
/> */}
							<p className=" text-center text-gray-600">
								Already have an
								account?{" "}
								<Link
									to="/signup"
									className="text-blue-600 hover:underline">
									Log In
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
