import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegCircleXmark } from "react-icons/fa6";
import axiosInstance from "../../Api/axiosInstance";

function CreateQuiz({ lastSectionId, roadMapId ,setAddQuiz }) {
  const [quiz, setQuiz] = useState({
    passingScore: 0,
    isRequired: false,
    questions: [
      {
        text: "",
        points: 0,
        options: [
          { text: "", isCorrect: false },
        ],
      },
    ],
  });

  const handelChange = (e) => {
    const { name, value } = e.target;
    setQuiz({ ...quiz, [name]: value });
  };

  const handleIsRequiredChange = () => {
    setQuiz((prevQuiz) => ({ ...prevQuiz, isRequired: !prevQuiz.isRequired }));
  };

  const handelAddQuiz = async () => {
    try {
      const response = await axiosInstance.post(
        `Roadmap/${roadMapId}/sections/${lastSectionId}/create-quiz-with-questions`,
        quiz,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handelAddQuestion = () => {
    const newQuestion = {
      text: "",
      points: 0,
      options: [
        { text: "", isCorrect: false },
      ],
    };
    setQuiz({ ...quiz, questions: [...quiz.questions, newQuestion] });
  };

  const handelAddOption = (questionIndex) => {
    const newOption = {
      text: "",
      isCorrect: false,
    };
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[questionIndex].options.push(newOption);
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handelDeleteOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleQuestionChange = (e, index) => {
    const { name, value } = e.target;
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index][name] = value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleOptionChange = (e, questionIndex, optionIndex) => {
    const { name, value } = e.target;
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[questionIndex].options[optionIndex][name] = value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleCorrectOptionChange = (questionIndex, optionIndex) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[questionIndex].options.forEach((option, i) => {
      option.isCorrect = i === optionIndex;
    });
    setQuiz({ ...quiz, questions: updatedQuestions });
  };
  return (
    <div className="my-10">
      <div className="container mx-auto">
        <div>
          <h2 className="text-center text-[32px] font-medium">Add Quiz</h2>
        </div>
        <div className="shadow-lg rounded-[24px] p-10">
          <h2 className="text-[#021B1A] text-[24px] font-medium my-4">
            Add quiz to this section
          </h2>
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col gap-2">
              <label className="font-medium">Passing Score</label>
              <select
                onChange={handelChange}
                name="passingScore"
                value={quiz.passingScore}
                className="px-5 w-[320px] py-4 outline-none border border-[#F1F7F6] rounded-[8px]"
              >
                <option value="">Select Passing Score</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
                <option value="60">60</option>
                <option value="70">70</option>
                <option value="80">80</option>
                <option value="90">90</option>
                <option value="100">100</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <h2 className="font">Mark quiz as Required</h2>
              <button
                onClick={handleIsRequiredChange}
                className={`relative inline-flex h-6 w-11 items-center cursor-pointer rounded-full transition-colors duration-300 ${
                  quiz.isRequired ? "bg-green-900" : "bg-[#F1F7F6]"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 ${
                    quiz.isRequired ? "translate-x-5" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {quiz.questions.map((question, qIndex) => (
            <div
              key={qIndex}
              className="my-5 border border-gray-200 p-5 rounded-lg"
            >
              <div className="w-full flex items-center gap-3 my-5">
                <div className="flex flex-col gap-2 w-full">
                  <label className="font-medium">Question {qIndex + 1}</label>
                  <input
                    type="text"
                    placeholder="Question text"
                    name="text"
                    value={question.text}
                    onChange={(e) => handleQuestionChange(e, qIndex)}
                    className="outline-none border border-[#F1F7F6] w-full rounded-[8px] px-5 py-4"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-medium">Points</label>
                  <input
                    type="number"
                    min={1}
                    name="points"
                    value={question.points}
                    onChange={(e) => handleQuestionChange(e, qIndex)}
                    className="outline-none border border-[#F1F7F6] w-full rounded-[8px] px-5 py-4"
                  />
                </div>
              </div>

              <h3 className="font-medium my-4">Options</h3>
              {question.options.map((option, oIndex) => (
                <div
                  key={oIndex}
                  className="flex items-center gap-4 w-full justify-between my-2"
                >
                  <div className="flex items-center gap-2 w-[60%]">
                    <input
                      className="border border-[#F1F7F6] rounded-[8px] px-5 py-4 outline-none w-full"
                      placeholder={`Option ${oIndex + 1} text`}
                      type="text"
                      name="text"
                      value={option.text}
                      onChange={(e) => handleOptionChange(e, qIndex, oIndex)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <h2 className="font">Correct option</h2>
                    <button
                      onClick={() => handleCorrectOptionChange(qIndex, oIndex)}
                      className={`relative inline-flex h-6 w-11 items-center cursor-pointer rounded-full transition-colors duration-300 ${
                        option.isCorrect ? "bg-green-900" : "bg-[#F1F7F6]"
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 ${
                          option.isCorrect ? "translate-x-5" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                  <div
                    onClick={() => handelDeleteOption(qIndex, oIndex)}
                    className="bg-[#F1F7F6] rounded-[8px] px-4 py-4 cursor-pointer"
                  >
                    <FaRegCircleXmark
                      size={24}
                      className="text-[#021B1A]"
                    />
                  </div>
                </div>
              ))}

              <div className="flex justify-start mt-4 w-full">
                <button
                  onClick={() => handelAddOption(qIndex)}
                  className="flex items-center cursor-pointer w-full justify-center gap-2 bg-[#F1F7F6] text-[#021B1A] px-4 py-2 rounded-[8px]"
                >
                  <span>
                    <CiCirclePlus size={25} />
                  </span>
                  Add Option
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-center ">
            <button
              onClick={handelAddQuestion}
              className="flex items-center w-full cursor-pointer justify-center gap-2 bg-[#F1F7F6] text-[#021B1A] px-4 py-3 rounded-[8px] mt-5"
            >
              <span>
                <CiCirclePlus size={25} />
              </span>
              Add Question
            </button>
          </div>
          <div className="flex items-center justify-between gap-2 mt-8 px-28">
            <button
              onClick={handelAddQuiz}
              className="border border-[#095544] px-5 py-3 rounded-[8px] cursor-pointer"
            >
              Finish
            </button>
            <button
              onClick={() => setAddQuiz(false)}
              className="bg-[#095544] px-5 py-3 rounded-[8px] text-white cursor-pointer"
            >
              Add Section
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateQuiz;
