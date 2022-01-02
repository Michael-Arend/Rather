import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/NavBar";
import Home from "./Pages/Home";
import NewQuestion from "./Pages/NewQuestion";
import Leaderboard from "./Pages/Leaderboard";
import { LoadingBar } from "react-redux-loading-bar";
import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { _getUsers, _getQuestions } from "./_DATA";
import { userObjInArray, questionObjInArray } from "./Helper/Converter";
import Login from "./Pages/Login";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    _getQuestions()
      .then((data) => questionObjInArray(data))
      .then((data) =>
        dispatch({ type: "PUSH_ALL_QUESTIONS", questions: data })
      );

    _getUsers()
      .then((data) => userObjInArray(data))
      .then((data) => dispatch({ type: "PUSH_ALL_USERS", users: data }));
  }, []);

  const authUser = useSelector((state) => state.users.authUser);

  return (
    <div>
      <LoadingBar style={{ backgroundColor: "blue", height: "5px" }} />
      {authUser !== "" && <Navbar />}
      {authUser !== "" ? (
        <div className="main-container">
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/:id/*" element={<Home />} />
            <Route path="/add" element={<NewQuestion />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </div>
      ) : (
        <div className="main-container">
          <Login />
        </div>
      )}
    </div>
  );
}

export default App;
