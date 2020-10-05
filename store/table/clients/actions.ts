import { ClientInterface } from "../../../abstractions/interface/model/Client";
import { ACTION_TYPE } from "./reducer";

export const update = (clients: ClientInterface) => {
    return {
        type: ACTION_TYPE.UPDATE,
        payload: {clients}
    }
}

export default {update};