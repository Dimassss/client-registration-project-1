import { combineReducers } from "redux";
import clients from './clients';

export const reducer = combineReducers({
    clients: clients.reducer
});
export const actions = {
    clients: clients.actions
}
export default {reducer, actions};