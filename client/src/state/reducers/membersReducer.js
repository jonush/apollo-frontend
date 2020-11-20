import {
  MEMBERS_START,
  MEMBERS_SUCCESS,
  MEMBERS_FAILURE,
  MEMBERS_RESET,
} from "../actions/fetchMembers";

export const initialState = {
  isFetching: false,
  members: [],
  errors: "",
};

export const membersReducer = (state = initialState, action) => {
  switch(action.type) {
    case MEMBERS_START:
      return {
        ...state,
        isFetching: true,
      }
    case MEMBERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        members: action.payload,
      }
    case MEMBERS_FAILURE:
      return {
        ...state,
        errors: action.payload
      }
    case MEMBERS_RESET: {
      return {
        members: initialState.members,
      }
    }
    default:
      return state
  }
}
