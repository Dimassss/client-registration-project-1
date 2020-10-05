import ModelInterface from '../../abstractions/interface/model/Model';

export class Model implements ModelInterface{
    id: number;

    constructor({id}: {id: number}){
        this.id = id;
    }
}