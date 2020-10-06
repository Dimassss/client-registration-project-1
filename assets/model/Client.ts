import { ClientConstructorInterface, ClientInterface } from "../../abstractions/interface/model/Client";
import gender from "../../abstractions/type/model/gender";
import loyaltyProgram from "../../abstractions/type/model/loyaltyProgram";
import { Model } from "./Model";

export default class Client extends Model implements ClientInterface{
    firstName: string;
    lastName: string;
    gender: gender;
    loyaltyProgram: loyaltyProgram;
    cardNumber: string;
    createDate: number;
    
    constructor({id, firstName, lastName, gender = 'other', loyaltyProgram = 'none', cardNumber, createDate}: ClientConstructorInterface){
        super({id});

        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.loyaltyProgram = loyaltyProgram;
        this.cardNumber = cardNumber;
        this.createDate = createDate != null ? createDate : new Date().getTime();
    }

    validate(){
        return (this.firstName && this.firstName.length > 2) &&
                (this.lastName && this.lastName.length > 2) &&
                (this.loyaltyProgram != 'card' || (this.cardNumber && this.cardNumber.match(/\d{16}/))) &&
                (this.createDate && typeof this.createDate == 'number');
    }
}



