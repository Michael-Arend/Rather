import { useSelector } from "react-redux";
import AnsweredPollCard from "./AnsweredPollCard";

const Answered = () => {
  const authUser = useSelector((state) => state.users.authUser);
  const questions = useSelector((state) => state.questions.questions)
    .filter(
      (x) =>
        x.optionOne.votes.includes(authUser) ||
        x.optionTwo.votes.includes(authUser)
    )
    .sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div>
      <ul>
        {questions !== undefined &&
          questions.map((q) => (
            <li key={q.id}>
              <AnsweredPollCard question={q} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Answered;
