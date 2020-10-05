import NoSuchActionTypeExceptionInterface from "../../../../abstractions/interface/log/exception/store/NoSuchActionTypeException";

export default class NoSuchActionTypeException extends Error implements NoSuchActionTypeExceptionInterface{
    action: {type: string, payload: any};
    state: any;
    msg: string;

    constructor(props: NoSuchActionTypeExceptionInterface){
        super(JSON.stringify(props, null, ' '));
    }

}