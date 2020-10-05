import _ from 'lodash';
import { ClientInterface } from '../../../abstractions/interface/model/Client';
import gender from '../../../abstractions/type/model/gender';
import loyaltyProgram from '../../../abstractions/type/model/loyaltyProgram';
import Client from '../../../assets/model/Client';
import clients from '../../../store/table/clients';
import { ACTION_TYPE } from '../../../store/table/clients/reducer';
import combine from '../../test-tools/generator/combine/combine';


const firstNames = [null, '', 'a', 'aa', 'aaa'];
const lastNames = firstNames;
const genders = ['female', 'male', 'other'];
const loyaltyPrograms = ['none', 'card', 'mobile'];
const cardNumbers = [null, '', '1', 'a', '1111111111111111', '111111111111111a', '11111111111111111', '1111111111111111a'];
const allClientsCombinations = [];

combine((arr: [string, string, gender, loyaltyProgram, string]) => {
    allClientsCombinations[allClientsCombinations.length] = new Client({
        id: allClientsCombinations.length + 1,
        firstName: arr[0],
        lastName: arr[1],
        gender: arr[2],
        loyaltyProgram: arr[3],
        cardNumber: arr[4]
    });
}, firstNames, lastNames, genders, loyaltyPrograms, cardNumbers);


const count = allClientsCombinations.length;
let subArraysOfClients = [];
for(let len = Math.round(count/3); len < Math.round(count*2/3); len++){
    let r = []
    for(let i = 0; i < 20; i++){
        r.push(_.sampleSize(allClientsCombinations, len));
    }
    subArraysOfClients.push(r);
}

expect.extend({
    isEqualSet(arr1, arr2){
        let f = (a,b) => a.id == b.id;
        let pass = _.differenceWith(arr1, arr2, f).length == 0 && _.differenceWith(arr2, arr1, f).length == 0;

        return {
            pass,
            message: () => ``
        };
    }
});

declare global {
    namespace jest {
        interface Matchers<R> {
            isEqualSet(arr: (any)[]): R;
        }
    }
}


test('store/table/clients/action', () => {
    const actions = clients.actions;
    const testUpdatedAction = (arr: ClientInterface) => actions.update(arr);
    
    subArraysOfClients.forEach(arr => {
        expect(testUpdatedAction(arr)).toEqual({type: ACTION_TYPE.UPDATE, payload: {clients: arr}});
    });
});

test('store/table/clients/reducer/UPDATE', () => {
    const reducer = clients.reducer;
    const actions = clients.actions;
    let state = [];
    
    subArraysOfClients.forEach((arr, i) => {
        let newState = reducer(state, actions.update(arr));
        expect(newState).isEqualSet([...state, ...arr]);
        state = newState;
    });
});