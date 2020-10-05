import { ClientInterface } from "../../../abstractions/interface/model/Client";
import Client from "../../../assets/model/Client";
import { ACTION_TYPE } from "./reducer";

export const setClient = (client: ClientInterface) => {
    return {
        type: ACTION_TYPE.SET_CLIENT,
        payload: {client: client ? new Client(client) : null}
    }
}

export default {setClient};