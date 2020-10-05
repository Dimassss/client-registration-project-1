import { combineReducers } from "redux";
import table from './table';

export const reducer = combineReducers({
    table: table.reducer
});
export const actions = {
    table: table.actions
}
export default {reducer, actions};