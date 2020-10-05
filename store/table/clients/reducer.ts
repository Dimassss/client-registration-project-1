import { Console } from "console";
import { ClientInterface } from "../../../abstractions/interface/model/Client";
import NoSuchActionTypeException from "../../../assets/log/exception/store/NoSuchActionTypeException";

const actionTypePrefix = 'TABLE/CLIENTS';
export const ACTION_TYPE = {
    UPDATE: `${actionTypePrefix}/UPDATE`
};

export const cases = {
    [ACTION_TYPE.UPDATE](state: ClientInterface[], {clients: newClients}){
        const clients = [...state];
        
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

        return clients;
    }
};

export default (state: ClientInterface[] = [], action) => {
    const f = cases[action.type];
    
    if(f) return f(state, action.payload);
    else if(action.type.toString().match(/@@redux/) != null) return state
    else throw new NoSuchActionTypeException({state, action, msg: 'in ./store/table/clients'});
}