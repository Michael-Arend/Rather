import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PollBar from "./PollBar";

const AnsweredPollCard = ({ question }) => {
  const users = useSelector((state) => state.users.users);
  const authUser = useSelector((state) => state.users.authUser);
  const author = users.find((u) => u.id === question.author);

  const navigate = useNavigate();

  return (
    <div
      className="pollcard-wrapper"
      style={{ cursor: "pointer" }}
      onClick={() => navigate("/questions/" + question.id)}
    >
      <div className="pollcard-header">
        <h4>{author !== undefined && author.name} asked: Would you rather?</h4>
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
          <PollBar
            text={question.optionOne.text}
            votes={question.optionOne.votes.length}
            overallVotes={
              question.optionOne.votes.length + question.optionTwo.votes.length
            }
            option="1"
            votedByUser={question.optionOne.votes.includes(authUser)}
          />

          <PollBar
            text={question.optionTwo.text}
            votes={question.optionTwo.votes.length}
            overallVotes={
              question.optionOne.votes.length + question.optionTwo.votes.length
            }
            option="2"
            votedByUser={question.optionTwo.votes.includes(authUser)}
          />
        </div>
      </div>
    </div>
  );
};

export default AnsweredPollCard;
