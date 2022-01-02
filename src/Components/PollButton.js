const PollButton = ({ text, option, clicked }) => {
  const color =
    option == 1 ? "rgba(250, 235, 127,0.7)" : "rgba(140, 250, 200,0.6)";

  return (
    <div
      onClick={clicked}
      className="poll-button-wrapper"
      style={{ backgroundColor: color }}
    >
      <div className="pollbar-text">{text}</div>
    </div>
  );
};

export default PollButton;
