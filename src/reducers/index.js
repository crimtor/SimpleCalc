import { combineReducers } from "redux";
import CalcReducer from "./calc_reducer";

const rootReducer = combineReducers({
  calc: CalcReducer
});

export default rootReducer;
