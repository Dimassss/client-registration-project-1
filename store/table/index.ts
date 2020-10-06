import { combineReducers } from "redux";
import clients from './clients';

export const reducer = combineReducers({
    clients: clients.reducer
});
export const actions = {
    clients: clients.actions
}
export const actionsAsync = {
    clients: clients.actionsAsync
}
export default {reducer, actions, actionsAsync};