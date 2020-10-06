import a from './actions';
import r from './reducer';
import a_s from './actions.async';

export const actions = a;
export const reducer = r;
export const actionsAsync = a_s;
export default { reducer: r, actions: a, actionsAsync };