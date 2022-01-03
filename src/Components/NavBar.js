import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const NavBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.users.authUser);
  const users = useSelector((state) => state.users.users);

  const HandleLogout = () => {
    dispatch({ type: "LOGOUT_USER" });
  };

  return (
    <nav className="nav-bar">
      <div
        className={
          location.pathname.toLowerCase().includes("/home")
            ? "active-nav-item nav-item"
            : "nav-item"
        }
      >
        <Link to="/questions/unanswered">Questions</Link>
      </div>

      <div
        className={
          location.pathname.toLowerCase().includes("/add")
            ? "active-nav-item nav-item"
            : "nav-item"
        }
      >
        <Link to="/add">New Question</Link>
      </div>

      <div
        className={
          location.pathname.toLowerCase().includes("/leaderboard")
            ? "active-nav-item nav-item"
            : "nav-item"
        }
      >
        <Link to="/leaderboard">Leaderboard</Link>
      </div>

      <div className="profile-wrapper">
        {authUser !== "" && (
          <div className="profile">
            <div>
              <div
                className="pollcard-avatar profile-avatar"
                style={{
                  backgroundImage: `url(${
                    authUser === undefined
                      ? ""
                      : "../" + users.find((u) => u.id == authUser).avatarURL
                  })`,
                }}
              ></div>
              <p>{users.find((u) => u.id == authUser).name}</p>
            </div>
            <button onClick={HandleLogout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
