import { combineReducers } from "redux";
import client from './client';

export const reducer = combineReducers({
    client: client.reducer
});
export const actions = {
    client: client.actions
};
export const actionsAsync = {
    client: client.actionsAsync
}

export default {reducer, actions, actionsAsync};