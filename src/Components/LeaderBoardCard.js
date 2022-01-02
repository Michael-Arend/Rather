const LeaderBoardCard = ({ user, position }) => {
  const answered = Object.keys(user.answers).length;
  const questions = user.questions.length;

  return (
    <div className="leaderboard-wrapper">
      <div className="leaderboard-position-conatiner">
        <h3>{position}</h3>
      </div>

      <div className="leaderboard-avatar-container">
        <div
          className="pollcard-avatar"
          style={{
            backgroundImage: `url(${
              user === undefined ? "" : "../" + user.avatarURL
            })`,
          }}
        ></div>
      </div>
      <div className="leaderboard-central">
        <h3>{user.name}</h3>
        <div className="leaderboard-stats-wrapper">
          <p>Answered Questions:</p>
          <p>{answered}</p>
        </div>
        <div className="leaderboard-stats-wrapper">
          <p>Created Questions:</p>
          <p>{questions}</p>
        </div>
      </div>
      <div className="leaderboard-score-wrapper">
        <div>
          <h6>Score</h6>
          <h4>{answered + questions}</h4>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoardCard;
