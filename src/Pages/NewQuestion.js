import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { createNewQuestion } from "../Store/QuestionStore/questionReducer";

const NewQuestion = () => {
  const dispatch = useDispatch();
  const option1 = useRef();
  const option2 = useRef();
  const ismounted = useRef(false);
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const authUser = useSelector((state) => state.users.authUser);

  useEffect(() => {
    ismounted.current = true;
    return () => {
      ismounted.current = false;
    };
  }, []);

  const showMessage = (message, success) => {
    setMessage(message);
    setSuccessful(success);

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const HandleSubmit = (event) => {
    event.preventDefault();
    if (
      option1.current.value.length === 0 ||
      option2.current.value.length === 0
    ) {
      showMessage("You need to enter two options.", false);
      return;
    }

    const newQuestion = {
      optionOneText: option1.current.value,
      optionTwoText: option2.current.value,
      author: authUser,
    };
    try {
      dispatch(createNewQuestion(newQuestion));
      ismounted.current &&
        showMessage("Successfully created a new question.", true);
    } catch (e) {
      ismounted.current &&
        showMessage("Something went wrong, try again, please.", false);
    }
    option1.current.value = "";
    option2.current.value = "";
  };

  return (
    <div className="new-question-wrapper">
      <h2>Create new question:</h2>
      <form onSubmit={HandleSubmit}>
        <h4 style={{ marginBottom: "10px" }}>Would you rather...</h4>
        <input
          ref={option1}
          placeholder="option 1"
          className="new-question-input"
        ></input>
        <div className="or-container">
          <div className="or-first" />
          <h4>OR</h4>
          <div className="or-last" />
        </div>
        <input
          ref={option2}
          placeholder="option 2"
          className="new-question-input"
        ></input>
        <button type="submit">Submit</button>
      </form>
      <div className="message-container">
        <p
          className="new-question-message"
          style={{ color: successful ? "#45910e" : "#e52e2e" }}
        >
          {message}
        </p>
      </div>
    </div>
  );
};

export default NewQuestion;
