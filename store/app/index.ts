import { combineReducers } from "redux";
import client from './client';

export const reducer = combineReducers({
    client: client.reducer
});
export const actions = {
    client: client.actions
}
export default {reducer, actions};