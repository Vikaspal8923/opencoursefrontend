import React, { useState, useEffect } from "react";

const ComingSoon = () => {
	const [email, setEmail] = useState("");
	const [messageVisible, setMessageVisible] = useState(false);
	const [timeLeft, setTimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});


	const handleInputChange = (e) => {
		setEmail(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (email.trim() !== "") {
			setMessageVisible(true); 

			setTimeout(() => {
				setMessageVisible(false);
			}, 5000);

			setEmail(""); 
		}
	};

	// Countdown Timer Logic
	useEffect(() => {
		const targetDate = new Date("2025-02-20T00:00:00");
		const timer = setInterval(() => {
			const now = new Date();
			const difference = targetDate - now;

			if (difference <= 0) {
				clearInterval(timer);
				setTimeLeft({
					days: 0,
					hours: 0,
					minutes: 0,
					seconds: 0,
				});
			} else {
				setTimeLeft({
					days: Math.floor(
						difference /
							(1000 * 60 * 60 * 24)
					),
					hours: Math.floor(
						(difference /
							(1000 * 60 * 60)) %
							24
					),
					minutes: Math.floor(
						(difference / (1000 * 60)) % 60
					),
					seconds: Math.floor(
						(difference / 1000) % 60
					),
				});
			}
		}, 1000);

		return () => clearInterval(timer);
	}, []);


  
	return (
		<div className="bg-black text-white h-screen flex flex-col items-center justify-center">
			{/* Title */}
			<h1 className="text-4xl font-bold mb-4">
				Community Page Coming Soon!
			</h1>
			<p className="text-lg text-gray-300 mb-8">
				We're building something amazing. Stay tuned!
			</p>

			{/* Countdown Timer */}
			<div className="flex space-x-4 mb-8">
				{["Days", "Hours", "Minutes", "Seconds"].map(
					(unit, index) => (
						<div
							key={index}
							className="text-center">
							<span className="block text-5xl font-bold">
								{
									Object.values(
										timeLeft
									)[index]
								}
							</span>
							<span className="text-gray-400">
								{unit}
							</span>
						</div>
					)
				)}
			</div>

			{/* Subscription Form */}
			<div className="w-full max-w-md">
				<form
					onSubmit={handleSubmit}
					className="flex flex-col sm:flex-row items-center">
					<input
						type="email"
						placeholder="Enter your email"
						name="email"
						value={email}
						onChange={handleInputChange}
						className="w-full sm:w-auto flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none"
						required
					/>
					<button
						type="submit"
						className="mt-4 sm:mt-0 sm:ml-4 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-bold">
						Notify Me
					</button>
				</form>

				{/* Success Message (Hidden by Default) */}
				<div
					className={`mt-4 text-green-400 text-center ${
						messageVisible
							? "block"
							: "hidden"
					}`}>
					Notification sent successfully!
				</div>
			</div>
		</div>
	);
};

export default ComingSoon;
