import { Route, Routes, Link, useLocation } from "react-router-dom";
import Unanswered from "../Components/Unanswered";
import Answered from "../Components/Answered";
import QuestionsDetails from "../Components/QuestionsDetails";

const Home = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname.toLocaleLowerCase() === "/home/unanswered" ||
      location.pathname.toLocaleLowerCase() === "/home/answered" ? (
        <div>
          <div className="tab-header">
            <Link to="/home/unanswered">
              <div
                className={
                  location.pathname.includes("/unanswered")
                    ? "active-sub-nav-item nav-item"
                    : "inactive-sub-nav-item nav-item"
                }
              >
                <p>Unanswered Questions</p>
              </div>
            </Link>
            <Link className="" to="/home/answered">
              <div
                className={
                  location.pathname.includes("/answered")
                    ? "active-sub-nav-item nav-item"
                    : "inactive-sub-nav-item nav-item"
                }
              >
                <p> Answered Questions</p>
              </div>
            </Link>
          </div>
          <div>
            <Routes>
              <Route path="/unanswered" element={<Unanswered />} />
              <Route path="/answered" element={<Answered />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/:questionId" element={<QuestionsDetails />} />
        </Routes>
      )}
    </div>
  );
};

export default Home;
