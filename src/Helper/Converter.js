export const userObjInArray = (users) => {
  const userArray = [];
  Object.keys(users).forEach((key) =>
    userArray.push({
      id: users[key].id,
      name: users[key].name,
      password: users[key].password,
      avatarURL: users[key].avatarURL,
      answers: users[key].answers,
      questions: users[key].questions,
    })
  );
  return userArray;
};

export const questionObjInArray = (questions) => {
  const questionArray = [];
  Object.keys(questions).forEach((key) =>
    questionArray.push({
      id: questions[key].id,
      author: questions[key].author,
      timestamp: questions[key].timestamp,
      optionOne: questions[key].optionOne,
      optionTwo: questions[key].optionTwo,
    })
  );
  return questionArray;
};
