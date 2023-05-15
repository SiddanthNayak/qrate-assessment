import React from "react";
import style from "./lesson-tile.module.css";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const LessonTile = ({ lesson, handleClick }) => {
  const getCompletetionStatus = (lessonNumber) => {
    const quizData = JSON.parse(localStorage.getItem("quizData"));
    if (quizData) {
      let lessonStatus = quizData.find(
        (items) => items.lessonNumber === lessonNumber
      );
      if (lessonStatus) {
        return (lessonStatus.quiz.length * 100) / lesson.quiz.questions.length;
      }
      return 0;
    }
    return 0;
  };

  return (
    <div
      className={style.lessonContainer}
      onClick={() => handleClick(lesson.lessonNumber)}
    >
      <p>
        {lesson.name} - {lesson.description}
      </p>
      <div className={style.statsContainer}>
        <p>{getCompletetionStatus(lesson.lessonNumber)}% completed</p>
        <NavigateNextIcon />
      </div>
    </div>
  );
};

export default LessonTile;
