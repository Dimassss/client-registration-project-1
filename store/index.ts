import { combineReducers } from "redux";
import table from './table';
import app from './app';

export const reducer = combineReducers({
    table: table.reducer,
    app: app.reducer
});
export const actions = {
    table: table.actions,
    app: app.actions
}
export const actionsAsync = {
    table: table.actionsAsync,
    app: app.actionsAsync
}
export default {reducer, actions, actionsAsync};