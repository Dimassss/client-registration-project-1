import Client from "../../../assets/model/Client";
import { ACTION_TYPE } from "./reducer";

export const saveClient = async (dispatch, client: Client) => {
    try {
        let res = await fetch(`/api/app/client/save-client`, {
            method: 'POST',
            body: JSON.stringify(client)
        });
        let id = +(await res.text());

        dispatch({
            type: ACTION_TYPE.SAVE_CLIENT.SUCCESS,
            payload: {
                client: new Client({id, ...client})
            }
        });
    } catch (error) {
        dispatch({
            type: ACTION_TYPE.SAVE_CLIENT.ERROR,
            error
        })  
    }
}

export const loadRandomData = async (dispatch) => {
    try {
        let res = await fetch(`https://meowfacts.herokuapp.com/`, {
            method: 'GET'
        });
        let {data} = await res.json();

        dispatch({
            type: ACTION_TYPE.SAVE_CLIENT.SUCCESS,
            payload: {
                data
            }
        });
    } catch (error) {
        dispatch({
            type: ACTION_TYPE.SAVE_CLIENT.ERROR,
            error
        })  
    }
}

export default {saveClient, loadRandomData};