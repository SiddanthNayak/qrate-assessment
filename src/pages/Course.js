import React, { useContext } from "react";
import LessonTile from "../components/lesson-tile/lesson-tile";
import style from "./course.module.css";
import CourseContext from "../context/context";
import { useHistory } from "react-router-dom";

export const Course = () => {
  const { lessons } = useContext(CourseContext);
  const history = useHistory();
  const navigateLesson = (id) => {
    history.push("/lesson/" + id, { lessonNumber: id });
  };

  return (
    <div className={style.container}>
      {lessons &&
        lessons.map((lesson) => {
          return (
            <LessonTile
              handleClick={(id) => navigateLesson(id)}
              key={lesson.lessonNumber}
              lesson={lesson}
            />
          );
        })}
    </div>
  );
};
