import { ACTION_TYPE } from "./reducer";

export const loadClients = async (dispatch, {count = 20, offset = 0}) => {
    dispatch({
        type: ACTION_TYPE.LOAD_CLIENTS.START
    });

    try {
        let res = await fetch(`/api/table/clients/get-part/${count}/${offset}`, {
            method: 'GET'
        });
        let newClients = await res.json();

        dispatch({
            type: ACTION_TYPE.LOAD_CLIENTS.SUCCESS,
            payload: {
                clients: newClients
            }
        });
    } catch (error) {
        console.log(error)
        dispatch({
            type: ACTION_TYPE.LOAD_CLIENTS.ERROR,
            error
        })  
    }
}

export default {loadClients};