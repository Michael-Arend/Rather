import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import AnsweredPollCard from "./AnsweredPollCard";
import UnansweredPollCard from "./UnansweredPollCard";

const Unanswered = () => {
  const [initialQuestions, setInitialQuestions] = useState([]);
  const questions = useSelector((state) => state.questions.questions).sort(
    (a, b) => b.timestamp - a.timestamp
  );
  const authUser = useSelector((state) => state.users.authUser);

  useEffect(() => {
    setInitialQuestions(() => {
      return initialQuestions.length === 0
        ? JSON.parse(JSON.stringify(questions.filter((x) => !isAnswered(x))))
        : initialQuestions;
    });
  }, [questions]);

  const isAnswered = (q) => {
    return (
      q.optionOne.votes.includes(authUser) ||
      q.optionTwo.votes.includes(authUser)
    );
  };

  const handledVoted = (question) => {
    initialQuestions.map((q) => {
      if (q.id === question.id) {
        q.optionOne = question.optionOne;
        q.optionTwo = question.optionTwo;
      }
    });
  };

  return (
    <div>
      {(initialQuestions === undefined || initialQuestions.length === 0) && (
        <p style={{ margin: "30px" }}>
          There are no new Questions to answer right now.
        </p>
      )}
      <ul>
        {initialQuestions.map((q) => (
          <li key={q.id}>
            {!q.optionOne.votes.includes(authUser) &&
            !q.optionTwo.votes.includes(authUser) ? (
              <UnansweredPollCard question={q} voted={handledVoted} />
            ) : (
              <AnsweredPollCard question={q} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Unanswered;
