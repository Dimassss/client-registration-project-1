import gender from "../../type/model/gender";
import loyaltyProgram from "../../type/model/loyaltyProgram";
import ModelInterface from "./Model";

export interface ClientConstructorInterface{
    id: number,
    firstName: string,
    lastName: string,
    gender: gender,
    loyaltyProgram: loyaltyProgram,
    cardNumber: null | string,
    createDate?: number //timestamp
}

export interface ClientInterface extends ModelInterface, ClientConstructorInterface{
    validate: () => boolean
}