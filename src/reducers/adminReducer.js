import { SET_CURRENT_PROJECT, PROJECT_FETCH_SUCCESS } from "../actions/adminActions";

const INITIAL_STATE = {
  project: {
    currentProject: "",
    data: ''
  }
};

const adminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_PROJECT: {
      return {
        ...state,
        project: {
          ...state.project,
          currentProject: action.payload.projectName
        }
      };
    }

    case PROJECT_FETCH_SUCCESS: {
      return {
        ...state,
        project: {
          ...state.project,
          data: action.payload.data
      }

      };
    }

    default:
      return state;
  }
};
export default adminReducer;
