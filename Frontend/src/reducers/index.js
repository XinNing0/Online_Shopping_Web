import {combineReducers} from "redux";
import {mainPageReducer} from "./mainPageReducer";
import filterReducer from "./filterReducer";
import {fetchOneProductReducer} from "./fetchOneProductReducer";
import addToBagReducer from "./addToBagReducer";
import {logInPageReducer} from "./logInPageReducer";

export default combineReducers({
   mainPageReducer,
   filterReducer,
   fetchOneProductReducer,
   addToBagReducer,
   logInPageReducer,
})