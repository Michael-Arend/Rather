import { _saveQuestion, _saveQuestionAnswer } from "../../_DATA";

const initialState = { users: [], questions: [] };

export const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PUSH_ALL_QUESTIONS": {
      return { questions: action.questions };
    }
    case "UPDATE_QUESTION": {
      return {
        ...state,
        questions: state.questions.map((q) =>
          q.id === action.question.id ? action.question : q
        ),
      };
    }

    case "ADD_QUESTION": {
      return {
        questions: [...state.questions, action.question],
      };
    }
  }

  return state;
};

export const createNewQuestion = (newQuestion) => {
  return async (dispatch) => {
    _saveQuestion(newQuestion)
      .then((question) => {
        dispatch({
          type: "ADD_QUESTION",
          question: question,
          user: newQuestion.author,
        });
      })
      .catch((e) => {
        throw new Error(e);
      });
  };
};

export const UpdateQuestion = (newQuestion, userAnswer) => {
  return async (dispatch) => {
    _saveQuestionAnswer({
      authedUser: userAnswer.user,
      qid: userAnswer.questionsId,
      answer: userAnswer.option,
    })
      .then((question) => {
        {
          dispatch({
            type: "UPDATE_QUESTION",
            question: newQuestion,
            userAnswer: userAnswer,
          });
        }
      })
      .catch((e) => {
        throw new Error(e);
      });
  };
};
