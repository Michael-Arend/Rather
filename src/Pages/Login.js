import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hash, compare } from "../Helper/PasswordHelper";
import { registerUser } from "../Store/UserStore/userReducer";
import { useLocation } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const select = useRef();
  const firstName = useRef();
  const lastName = useRef();
  const password = useRef();
  const reppassword = useRef();
  const passwordLogin = useRef();

  const navigate = useNavigate();

  const { state } = useLocation();

  const users = useSelector((state) => state.users.users);
  const [isRegisterShown, setIsRegisterShown] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const [isPasswordWrong, setIsPasswordWrong] = useState(false);

  const HandleLogin = (event) => {
    event.preventDefault();
    const pw = users.find((u) => u.id == select.current.value).password;

    if (!compare(passwordLogin.current.value, pw)) {
      setIsPasswordWrong(true);
      setTimeout(() => setIsPasswordWrong(false), 300);
      return;
    }

    dispatch({ type: "LOGIN_USER", authUser: select.current.value });
    navigate(state?.path || "/questions/unanswered");
  };

  const HandleRegister = (event) => {
    event.preventDefault();
    setErrorList([]);
    if (firstName.current.value.length < 3) {
      setErrorList((prev) => [...prev, "Please Enter a valid Firstname"]);
    }
    if (lastName.current.value.length < 3) {
      setErrorList((prev) => [...prev, "Please Enter a valid Lastname"]);
    }
    if (password.current.value.length < 7) {
      setErrorList((prev) => [
        ...prev,
        "Your Password has to be at least 7 character long.",
      ]);
    }
    if (password.current.value !== reppassword.current.value) {
      setErrorList((prev) => [...prev, "Both Passwords differ."]);
    }

    if (errorList.length > 0) return;
    console.log(errorList.length);

    const passwordHash = hash(password.current.value);
    dispatch(
      registerUser({
        firstName: firstName.current.value,
        lastName: lastName.current.value,
        password: passwordHash,
      })
    );
    navigate(state?.path || "/questions/unanswered");
  };

  return (
    <div>
      {!isRegisterShown ? (
        <div className="new-question-wrapper">
          <h2>Welcome to the "Would you Rather App"</h2>
          <h5>To continue, you have to choose:</h5>
          <img width="100%" src="../ratherlogo.png"></img>
          <form onSubmit={HandleLogin}>
            <h4>Would you rather...</h4>
            <select ref={select}>
              {users !== undefined &&
                users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
            </select>
            <label>Password</label>
            <input
              ref={passwordLogin}
              type="password"
              minLength={6}
              className="new-question-input"
              style={{ borderColor: isPasswordWrong ? "red" : "#ddd" }}
            ></input>
            <button type="submit">Login</button>
            <div className="or-container">
              <div className="or-first" />
              <h4>OR</h4>
              <div className="or-last" />
            </div>
          </form>
          <button onClick={() => setIsRegisterShown(true)}>Register</button>
        </div>
      ) : (
        <div className="new-question-wrapper">
          <h2>Welcome to the "Would you Rather App"</h2>
          <h5>To continue, you have to choose:</h5>

          <form onSubmit={HandleRegister}>
            <label>First Name</label>
            <input
              ref={firstName}
              placeholder="first name"
              className="new-question-input"
            ></input>
            <label>Last Name</label>
            <input
              ref={lastName}
              placeholder="last name"
              className="new-question-input"
            ></input>
            <label>Password</label>
            <input
              ref={password}
              type="password"
              minLength={6}
              className="new-question-input"
            ></input>
            <label>Repeat Password</label>
            <input
              ref={reppassword}
              type="password"
              minLength={6}
              className="new-question-input"
            ></input>

            <button type="submit">Register</button>
          </form>
          <div>
            {errorList.map((e) => {
              return <p key={e}>{e}</p>;
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default Login;
