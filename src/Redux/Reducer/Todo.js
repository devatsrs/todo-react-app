import { todoConstants } from "../Constants";

let todo = JSON.parse(localStorage.getItem("todo"));

//const initialState = user ? { loggingIn: false, loggedIn: true, user } : {};

export function authentication(state = {}, action) {


  switch (action.type) {
    case todoConstants.TODO_ADD:
      return {
        ...state,
        user: action.todo,
      };
    case todoConstants.TODO_EDIT:
      return {
        ...state,
        user: action.todo,
      };
    case todoConstants.TODO_DELETE:
      return {
        ...state,
        user: action.todo,
      };

    case todoConstants.TODO_COMPLETE:
      return {
        ...state,
        user: action.todo,
      };
    default:
      return state;
  }
}
