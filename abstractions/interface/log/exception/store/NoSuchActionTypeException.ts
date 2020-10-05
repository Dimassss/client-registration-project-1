export default interface NoSuchActionTypeExceptionInterface{
    action: {type: string, payload: any},
    state: any,
    msg: string
}