import { useSelector, useDispatch } from "react-redux";
import PollButton from "./PollButton";
import { UpdateQuestion } from "../Store/QuestionStore/questionReducer";

const UnansweredPollCard = ({ question, voted }) => {
  const users = useSelector((state) => state.users.users);
  const authUser = useSelector((state) => state.users.authUser);
  const author = users.find((u) => u.id === question.author);
  const dispatch = useDispatch();

  const votedHandler = (option) => {
    const newQuestion = JSON.parse(JSON.stringify(question));

    if (option === 1) {
      newQuestion.optionOne.votes.push(authUser);
    } else {
      newQuestion.optionTwo.votes.push(authUser);
    }

    dispatch(
      UpdateQuestion(newQuestion, {
        user: authUser,
        questionsId: newQuestion.id,
        option: option === 1 ? "optionOne" : "optionTwo",
      })
    );

    voted(newQuestion);
  };

  return (
    <div className="pollcard-wrapper">
      <div className="pollcard-header">
        <h4>{author !== undefined && author.name} asks: Would you rather?</h4>
      </div>
      <div className="pollcard-body">
        <div
          className="pollcard-avatar"
          style={{
            backgroundImage: `url(${
              author === undefined ? "" : "../" + author.avatarURL
            })`,
          }}
        ></div>
        <div className="pollcard-content">
          <PollButton
            clicked={() => votedHandler(1)}
            text={question.optionOne.text}
            option="1"
          />
          <PollButton
            clicked={() => votedHandler(2)}
            text={question.optionTwo.text}
            option="2"
          />
        </div>
      </div>
    </div>
  );
};

export default UnansweredPollCard;
