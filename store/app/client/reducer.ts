import { ClientInterface } from "../../../abstractions/interface/model/Client";
import Client from "../../../assets/model/Client";

export const def = {
    client: () => new Client({
        id: null,
        firstName: '',
        lastName: '',
        gender: 'other',
        loyaltyProgram: 'none',
        cardNumber: ''
      })
}

const actionTypePrefix = 'APP/CLIENT';
export const ACTION_TYPE = {
    SET_CLIENT: `${actionTypePrefix}/SET_CLIENT`
};

export const cases = {
    [ACTION_TYPE.SET_CLIENT](state: ClientInterface, {client}: {client: ClientInterface} ){
        if(!client) client = def.client();
        return new Client(client);
    }
};

export default (state: ClientInterface, action) => {
    if(!state) state = def.client();
    const f = cases[action.type];
    
    if(f) return f(state, action.payload);
    return state;
}