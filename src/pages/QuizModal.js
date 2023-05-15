import React from "react";
import style from "./quizModal.module.css";

const QuizModal = ({
  lesson,
  currentQuestionIndex,
  selectedOption,
  handleOptionChange,
  handleNextQuestion,
  handleCloseQuizModal,
}) => {
  const { questions } = lesson.quiz;

  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <div className={style.modalHeader}>
          <h3>Quiz</h3>
          <button type="button" onClick={handleCloseQuizModal}>
            x
          </button>
        </div>
        <p>{questions[currentQuestionIndex].questionText}</p>
        <div>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <div key={index}>
              <input
                type="radio"
                name="quiz-option"
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
              />
              <label>{option}</label>
            </div>
          ))}
        </div>
        <div className={style.buttonGroup}>
          {currentQuestionIndex < questions.length - 1 ? (
            <button type="button" onClick={handleNextQuestion}>
              Next Question
            </button>
          ) : (
            <button type="button" onClick={handleCloseQuizModal}>
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
