import { useEffect, useState } from "react";
import axios from "axios";
import QuestionTemplate from "./Questiontemplate";

const StartPrep = () => {
	const [companyNames, setCompanyNames] = useState([]);
	const [roles, setRoles] = useState([]);
	const [skills, setSkills] = useState([]);
	const [domains, setDomains] = useState([]);
	const [experienceLevels, setExperienceLevels] = useState([]);
	const [difficulties, setDifficulties] = useState([]);
	const [questionTypes, setQuestionTypes] = useState([]);
	const [questions, setQuestions] = useState([]);
	const [filteredQuestions, setFilteredQuestions] = useState([]);

	const [showFilters, setShowFilters] = useState(false);

	const [formData, setFormData] = useState({
		companyName: "",
		role: "",
		skill: "",
		Domain: "",
		ExperienceLevel: "",
		difficulty: "",
		questiontype: "",
	});

	const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value.toLowerCase() });
    };

	const fetchQuestions = async () => {
		try {
			const response = await axios.get(
				"https://opencoursebackend.onrender.com/Interview/getQuestions"
			);
			setQuestions(response.data);
			setFilteredQuestions(response.data);
			setCompanyNames([
				...new Set(
					response.data.map((item) =>
						item.companyName.toLowerCase()
					)
				),
			]);
			setRoles([
				...new Set(
					response.data.map((item) =>
						item.role.toLowerCase()
					)
				),
			]);
			setSkills([
				...new Set(
					response.data.map((item) =>
						item.skill.toLowerCase()
					)
				),
			]);
			setDomains([
				...new Set(
					response.data.map((item) =>
						item.Domain.toLowerCase()
					)
				),
			]);
			setExperienceLevels([
				...new Set(
					response.data.map((item) =>
						item.ExperienceLevel.toLowerCase()
					)
				),
			]);
			setDifficulties([
				...new Set(
					response.data.map((item) =>
						item.difficulty.toLowerCase()
					)
				),
			]);
			setQuestionTypes([
				...new Set(
					response.data.map((item) =>
						item.questiontype.toLowerCase()
					)
				),
			]);
		} catch (err) {
			console.error("Error fetching questions:", err);
		}
	};

	useEffect(() => {
		fetchQuestions();
        handleShowQuestions();
	}, []);

	const createOptions = (array) => {
		return array.map((item, index) => (
			<option
				key={index}
				value={item}>
				{item.charAt(0).toUpperCase() + item.slice(1)}
			</option>
		));
	};
	const handleShowQuestions = () => {
		const filtered = questions.filter((question) => {
			return (
				(formData.companyName
					? question.companyName.toLowerCase() ===
					  formData.companyName
					: true) &&
				(formData.role
					? question.role.toLowerCase() ===
					  formData.role
					: true) &&
				(formData.skill
					? question.skill.toLowerCase() ===
					  formData.skill
					: true) &&
				(formData.Domain
					? question.Domain.toLowerCase() ===
					  formData.Domain
					: true) &&
				(formData.ExperienceLevel
					? question.ExperienceLevel.toLowerCase() ===
					  formData.ExperienceLevel
					: true) &&
				(formData.difficulty
					? question.difficulty.toLowerCase() ===
					  formData.difficulty
					: true) &&
				(formData.questiontype
					? question.questiontype.toLowerCase() ===
					  formData.questiontype
					: true)
			);
		});

		setFilteredQuestions(
			filtered.length > 0 ? filtered : questions
		); // If no match, show all
	};

	return (
		<div className="bg-black min-h-screen p-5">
			{/* Toggle Button for Mobile */}
			<div className="md:hidden flex justify-between items-center mb-4">
				<h2 className="text-white text-xl font-bold">
					Start Preparation
				</h2>

				<button
					onClick={() =>
						setShowFilters(!showFilters)
					}
					className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded">
					{showFilters
						? "Hide Filters"
						: "Show Filters"}
				</button>


			</div>

			<div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4">
				{/* Filters Sidebar */}
				<div
					className={`${
						showFilters
							? "block"
							: "hidden md:block"
					} col-span-1 w-full md:w-[200px] p-4 shadow-md h-auto md:h-[calc(100vh-125px)] overflow-y-auto border-r-2`}>
					<div className="space-y-4">
						{[
							{
								label: "By Technology/Skills",
								name: "skill",
								options: skills,
							},
							{
								label: "By Industry/Domain",
								name: "Domain",
								options: domains,
							},
							{
								label: "By Company",
								name: "companyName",
								options: companyNames,
							},
							{
								label: "By Job Role",
								name: "role",
								options: roles,
							},
							{
								label: "By Question Type",
								name: "questiontype",
								options: questionTypes,
							},
							{
								label: "By Difficulty Level",
								name: "difficulty",
								options: difficulties,
							},
							{
								label: "By Experience Level",
								name: "ExperienceLevel",
								options: experienceLevels,
							},
						].map((filter, index) => (
							<div
								key={index}
								className="mb-4">
								<label
									className="block mb-1 text-white font-medium"
									htmlFor={
										filter.name
									}>
									{
										filter.label
									}
								</label>
								<select
									name={
										filter.name
									}
									id={
										filter.name
									}
									value={
										formData[
											filter
												.name
										]
									}
									onChange={
										handleChange
									}
									className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
									<option value="">
										Select...
									</option>
									{createOptions(
										filter.options
									)}
								</select>
							</div>
						))}

						<div className="flex justify-center items-center">
							<button
								onClick={
									handleShowQuestions
								}
								className="h-10 cursor-pointer rounded bg-orange-500 hover:bg-orange-600 text-white p-2 w-full">
								Show Questions
							</button>
						</div>
					</div>
				</div>



				{/* Questions Display */}
				<div className="col-span-3 md:col-span-3 lg:col-span-6 w-full rounded-md h-[calc(100vh-90px)] overflow-y-auto p-4">
					{filteredQuestions.length > 0 ? (
						filteredQuestions.map(
							(exp, index) => (

								<QuestionTemplate
									key={
										index
									}
									exp={
										exp
									}
								/>
							)
						)
					) : (
						<p className="text-white text-center">
							Loading ...
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default StartPrep;
