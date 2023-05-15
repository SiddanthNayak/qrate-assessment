import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import CourseContext from "../context/context";
import style from "./lesson.module.css";
import QuizModal from "./QuizModal";
import { enqueueSnackbar } from "notistack";

const Lesson = () => {
  const { lessons } = useContext(CourseContext);
  const [lesson, setLesson] = useState();
  let location = useLocation();
  const { lessonNumber } = location.state;
  const history = useHistory();
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const getFilteredLesson = () => {
      return lessons.filter((lesson) => lesson.lessonNumber === lessonNumber);
    };

    const getLesson = async () => {
      const filteredLesson = await getFilteredLesson();
      setLesson(filteredLesson[0]);
    };
    getLesson();
  }, [lessons, lessonNumber]);

  const handleNextLesson = () => {
    const lessonIndex = lessons.findIndex(
      (lesson) => lesson.lessonNumber === lessonNumber
    );
    if (lessonIndex < lessons.length - 1) {
      history.push("/lesson/" + lessons[lessonIndex + 1].lessonNumber, {
        lessonNumber: lessons[lessonIndex + 1].lessonNumber,
      });
    }
  };

  const handleTakeQuiz = () => {
    let existingData = JSON.parse(localStorage.getItem("quizData"));
    const currentQuizStatus = existingData?.find(
      (item) => item.lessonNumber === lessonNumber
    );

    if (currentQuizStatus) {
      setCurrentQuestionIndex(
        currentQuizStatus.quiz[currentQuizStatus.quiz.length - 1].questionNumber
      );
    }

    if (
      currentQuizStatus?.quiz[currentQuizStatus.quiz.length - 1]
        .questionNumber === lesson.quiz.questions.length
    ) {
      enqueueSnackbar("You have already finished the quiz", {
        variant: "warning",
      });
    } else {
      setShowQuizModal(true);
    }
  };

  const handleOptionChange = (event) => {
    const quizData = {
      lessonNumber: lessonNumber,
      quiz: [
        {
          questionNumber: currentQuestionIndex + 1,
          option: event.target.value,
        },
      ],
    };

    const existingData = JSON.parse(localStorage.getItem("quizData")) || [];

    const lessonIndex = existingData.findIndex(
      (data) => data.lessonNumber === lessonNumber
    );

    if (lessonIndex !== -1) {
      existingData[lessonIndex].quiz.push(quizData.quiz[0]);
    } else {
      existingData.push(quizData);
    }

    localStorage.setItem("quizData", JSON.stringify(existingData));

    setSelectedOption(event.target.value);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < lesson.quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    }
  };

  const handleCloseQuizModal = () => {
    setShowQuizModal(false);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
  };

  return (
    <div className={style.container}>
      {lesson ? (
        <div className={style.videoContainer}>
          <div>
            {lesson.name} - {lesson.description}
          </div>
          <iframe
            width="850"
            height="415"
            src={lesson.video}
            title="YouTube video player"
            allowFullScreen
          />
          <div className={style.buttonGroup}>
            <button type="button" onClick={handleTakeQuiz}>
              Take Quiz
            </button>
            <button type="button" onClick={handleNextLesson}>
              Next Lesson
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {showQuizModal && lesson && (
        <QuizModal
          lesson={lesson}
          currentQuestionIndex={currentQuestionIndex}
          selectedOption={selectedOption}
          handleOptionChange={handleOptionChange}
          handleNextQuestion={handleNextQuestion}
          handleCloseQuizModal={handleCloseQuizModal}
        />
      )}
    </div>
  );
};

export default Lesson;
