import { useSelector } from "react-redux";
import LeaderBoardCard from "../Components/LeaderBoardCard";

const Leaderboard = () => {
  const users = useSelector((state) => state.users.users).sort(
    (a, b) =>
      Object.keys(b.answers).length +
      b.questions.length -
      (Object.keys(a.answers).length + a.questions.length)
  );

  return (
    <div>
      <ul>
        {users !== undefined &&
          users.map((u, index) => (
            <li key={u.id}>
              <LeaderBoardCard user={u} position={index + 1} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
