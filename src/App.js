import { Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import NewQuestion from "./Pages/NewQuestion";
import Leaderboard from "./Pages/Leaderboard";
import { LoadingBar } from "react-redux-loading-bar";
import "./App.css";
import { Component, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { _getUsers, _getQuestions } from "./_DATA";
import { userObjInArray, questionObjInArray } from "./Helper/Converter";
import Login from "./Pages/Login";
import NotFound from "./Components/NotFound";
import NavBar from "./Components/NavBar";
import RequireAuth from "./Components/RequireAuth";

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
      <NavBar />
      <div className="main-container">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/questions/*"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/add"
            element={
              <RequireAuth>
                <NewQuestion />
              </RequireAuth>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <RequireAuth>
                <Leaderboard />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
      )
    </div>
  );
}

export default App;
