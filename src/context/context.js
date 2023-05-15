import React, { useState, useEffect, createContext } from "react";
import { lessonData } from "../mock/data";

const CourseContext = createContext();

export const LessonProvider = ({ children }) => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    setLessons(lessonData);
  }, []);

  return (
    <CourseContext.Provider value={{ lessons }}>
      {children}
    </CourseContext.Provider>
  );
};

export default CourseContext;
