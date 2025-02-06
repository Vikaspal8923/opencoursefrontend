import { CgSandClock } from "react-icons/cg";
import { FaEye, FaPencilAlt } from "react-icons/fa";
import { useState } from "react";
import parse from "html-react-parser";

const QuestionTemplate = ({ exp }) => {
	const [showAnswer, setShowAnswer] = useState(true);

	return (
		<div className="w-full md:w-[95%] bg-black p-4 mb-4 rounded-lg shadow-lg flex flex-col md:flex-row">
			<div className="w-full ml-0 md:ml-5 p-2 md:pl-5 flex flex-col mt-3 md:mt-5">

				{/* QUESTION */}
				<p className="text-white text-lg md:text-xl font-bold flex flex-col md:flex-row text-start justify-start">

					<strong className="text-lg md:text-xl text-blue-600">
						Question:
					</strong>

					<span className="mt-1 md:mt-0 md:ml-2">
						{exp.questions}
					</span>
				</p>

				<hr className="border-gray-600 my-2" />

				{/* ANSWER */}
				{showAnswer && (
					<div className="text-white text-base md:text-lg mt-2">
						{parse(exp.answers)}
					</div>
				)}

				{/* METADATA */}
				<div className="flex flex-wrap gap-2 mt-3 justify-start">

					<span className="text-xs md:text-sm font-medium text-white bg-gray-800 px-2 py-1 rounded">
						Company: #{exp.companyName}
					</span>

					<span className="text-xs md:text-sm font-medium text-blue-500 bg-gray-800 px-2 py-1 rounded">
						Skill: #{exp.skill}
					</span>

					<span className="text-xs md:text-sm font-medium text-white bg-gray-800 px-2 py-1 rounded">
						Type: #{exp.questiontype}
					</span>

					<span className="text-xs md:text-sm font-medium text-blue-500 bg-gray-800 px-2 py-1 rounded">
						Role: #{exp.role}
					</span>
				</div>
			</div>
		</div>
	);
};

export default QuestionTemplate;
