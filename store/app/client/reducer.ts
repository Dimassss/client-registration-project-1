import { ClientInterface } from "../../../abstractions/interface/model/Client";
import Client from "../../../assets/model/Client";

type State = {
    client: ClientInterface,
    random: any
};

export const def = {
    client: () => new Client({
        id: null,
        firstName: '',
        lastName: '',
        gender: 'other',
        loyaltyProgram: 'none',
        cardNumber: ''
      }),
    random: () => []
}

const actionTypePrefix = 'APP/CLIENT';
export const ACTION_TYPE = {
    SET_CLIENT: `${actionTypePrefix}/SET_CLIENT`,
    SAVE_CLIENT: {
        //START: `${actionTypePrefix}/SAVE_CLIENT/START`,
        SUCCESS: `${actionTypePrefix}/SAVE_CLIENT/SUCCESS`,
        ERROR: `${actionTypePrefix}/SAVE_CLIENT/ERROR`
    },
    SET_RANDOM_DATA: `${actionTypePrefix}/SET_RANDOM_DATA`
};

export const cases = {
    [ACTION_TYPE.SET_CLIENT](state: State, {client}: {client: ClientInterface} ){
        if(!client) client = def.client();
        return {...state, client};
    },
    [ACTION_TYPE.SAVE_CLIENT.SUCCESS](state, {data}){
        return {...state, random: data}
    },
    [ACTION_TYPE.SAVE_CLIENT.ERROR](state, {error}){
        throw error;
    },
    [ACTION_TYPE.SET_RANDOM_DATA](state, data){
        return {...state, random: data};
    }
};

const reducer = (state: State, action) => {
    if(!state) state = {client: def.client(), random: []};
    else{
        if(!state.client) state.client = def.client();
        if(!state.random) state.random = def.random();
    }
    const f = cases[action.type];
    
    if(f) return f(state, action.payload);
    return state;
}

export default reducer;