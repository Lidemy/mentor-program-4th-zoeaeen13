import { SET_FILTER } from "../actionTypes";
import { FILTERS } from "../../constants/filters";

const initState = FILTERS.ALL;

export default function filterReducer(state = initState, action) {
  switch (action.type) {
    case SET_FILTER: {
      return action.payload.newFilter;
    }
    default: {
      return state;
    }
  }
}
