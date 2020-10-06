import { ClientInterface } from "../../../abstractions/interface/model/Client";

type State = {
    clients: ClientInterface[],
    isLoading: boolean
}

const actionTypePrefix = 'TABLE/CLIENTS';
export const ACTION_TYPE = {
    UPDATE: `${actionTypePrefix}/UPDATE`,
    LOAD_CLIENTS: {
        START: `${actionTypePrefix}/LOAD_CLIENTS/START`,
        SUCCESS: `${actionTypePrefix}/LOAD_CLIENTS/SUCCESS`,
        ERROR: `${actionTypePrefix}/LOAD_CLIENTS/ERROR`
    }
};

export const cases = {
    [ACTION_TYPE.UPDATE](state: State, {clients: newClients}){
        const clients = [...state.clients];
        
        newClients.forEach(client => {
            let inTable = false;

            clients.forEach((c, i) => {
                if(c.id == client.id){
                    clients[i] = client;
                    inTable = true;
                }
            });

            if(!inTable) clients.push(client);
        });

        return {...state, clients};
    },
    [ACTION_TYPE.LOAD_CLIENTS.START](state: State){
        return {...state, isLoading: true};
    },
    [ACTION_TYPE.LOAD_CLIENTS.SUCCESS](state: State, {clients}){
        let newState = {...state};
        newState.isLoading = false;
        newState.clients = cases[ACTION_TYPE.UPDATE](newState, {clients}).clients;
        return newState;
    },
    [ACTION_TYPE.LOAD_CLIENTS.ERROR](state: State, error){
        console.error({state, msg: 'Cant load clients', error});
        return {...state, isLoading: false};
    }
};

const reducer = (state: State = {clients: [], isLoading: false}, action) => {
    const f = cases[action.type];
    
    if(f) return f(state, action.payload);
    return state;
}

export default reducer;