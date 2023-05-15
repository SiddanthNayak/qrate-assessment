import "./App.css";
import { Course } from "./pages/Course";
import { LessonProvider } from "./context/context";
import { Route, Switch } from "react-router-dom";
import Lesson from "./pages/Lesson";

function App() {
  return (
    <LessonProvider>
      <Switch>
        <Route exact path="/" component={Course} />
        <Route exact path="/lesson/:id" component={Lesson} />
      </Switch>
    </LessonProvider>
  );
}

export default App;
