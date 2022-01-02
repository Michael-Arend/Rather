const PollBar = ({ text, votes, overallVotes, votedByUser, option }) => {
  const percent = (votes / overallVotes) * 100;
  const percentText = Math.round(percent) + "%";
  const color =
    option == 1 ? "rgba(250, 235, 127,0.7)" : "rgba(140, 250, 200,0.6)";

  const fontweight = votedByUser ? 700 : 400;

  return (
    <div id="PollBarWrapper" className="poll-bar-wrapper">
      <div
        className="pollbar-percent"
        style={{ width: percentText, backgroundColor: color }}
      ></div>
      <div className="pollbar-text" style={{ fontWeight: fontweight }}>
        {text}
      </div>
      <p>{percentText}</p>
    </div>
  );
};

export default PollBar;
