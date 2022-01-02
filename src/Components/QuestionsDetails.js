import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PollBar from "./PollBar";

const QuestionsDetails = () => {
  const params = useParams();
  const id = params.questionId;
  const questions = useSelector((state) => state.questions.questions);
  const question = questions.find((q) => q.id === id);
  const users = useSelector((state) => state.users.users);
  const authUser = useSelector((state) => state.users.authUser);
  const author = users.find((u) => u.id === question.author);
  const navigate = useNavigate();

  return (
    <div className="pollcard-wrapper big-pollcard-wrapper">
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
          <div
            style={{
              border: question.optionOne.votes.includes(authUser)
                ? "1px solid rgba(168, 152, 250,0.8)"
                : "none",
              backgroundColor: question.optionOne.votes.includes(authUser)
                ? "rgba(168, 152, 250,0.1)"
                : "transparent",

              padding: "20px",
            }}
          >
            <PollBar
              text={question.optionOne.text}
              votes={question.optionOne.votes.length}
              overallVotes={
                question.optionOne.votes.length +
                question.optionTwo.votes.length
              }
              option="1"
              votedByUser={question.optionOne.votes.includes(authUser)}
            />
            <h5>
              {question.optionOne.votes.length} of{" "}
              {question.optionOne.votes.length +
                question.optionTwo.votes.length}{" "}
              votes{" "}
            </h5>
          </div>

          <div
            style={{
              border: question.optionTwo.votes.includes(authUser)
                ? "1px solid rgba(168, 152, 250,0.8)"
                : "none",
              backgroundColor: question.optionTwo.votes.includes(authUser)
                ? "rgba(168, 152, 250,0.1)"
                : "transparent",

              padding: "20px",
            }}
          >
            <PollBar
              text={question.optionTwo.text}
              votes={question.optionTwo.votes.length}
              overallVotes={
                question.optionOne.votes.length +
                question.optionTwo.votes.length
              }
              option="2"
              votedByUser={question.optionTwo.votes.includes(authUser)}
            />
            <h5>
              {question.optionTwo.votes.length} of{" "}
              {question.optionOne.votes.length +
                question.optionTwo.votes.length}{" "}
              votes{" "}
            </h5>
          </div>
        </div>
      </div>
      <button onClick={() => navigate("/Home/unanswered")}>Back</button>
    </div>
  );
};

export default QuestionsDetails;
