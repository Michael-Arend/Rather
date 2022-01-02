import { _saveNewUser } from "../../_DATA";

const initialState = { users: [], authUser: "" };

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PUSH_ALL_USERS": {
      return { users: action.users, authUser: state.authUser };
    }

    case "ADD_QUESTION": {
      return {
        authUser: state.authUser,
        users: state.users.map((u) =>
          u.id === action.user
            ? { ...u, questions: [...u.questions, action.question.id] }
            : u
        ),
      };
    }

    case "UPDATE_QUESTION": {
      return {
        authUser: state.authUser,
        users: state.users.map((u) =>
          u.id === action.userAnswer.user
            ? {
                ...u,
                answers: {
                  ...u.answers,
                  [action.userAnswer.questionsId]: action.userAnswer.option,
                },
              }
            : u
        ),
      };
    }

    case "LOGIN_USER": {
      return {
        authUser: action.authUser,
        users: state.users,
      };
    }

    case "LOGOUT_USER": {
      return {
        authUser: "",
        users: state.users,
      };
    }

    case "ADD_USER": {
      return {
        authUser: action.user.id,
        users: [...state.users, action.user],
      };
    }
  }

  return state;
};

export const registerUser = (newUser) => {
  return async (dispatch) => {
    _saveNewUser(newUser.firstName + " " + newUser.lastName, newUser.password)
      .then((user) => {
        dispatch({
          type: "ADD_USER",
          user: user,
        });
      })
      .catch((e) => {
        throw new Error(e);
      });
  };
};
