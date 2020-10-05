import gender from '../../../abstractions/type/model/gender';
import loyaltyProgram from '../../../abstractions/type/model/loyaltyProgram';
import Client from '../../../assets/model/Client';
import clientStore from '../../../store/app/client';
import { ACTION_TYPE, def } from '../../../store/app/client/reducer';
import combine from '../../test-tools/generator/combine/combine';


const firstNames = ['', 'aa', 'aaa'];
const lastNames = firstNames;
const genders = ['female', 'male'];
const loyaltyPrograms = ['none', 'card', 'mobile'];
const cardNumbers = [null, '', '1', 'a', '1111111111111111', '111111111111111a', '11111111111111111', '1111111111111111a'];
const allClientsCombinations = [null, undefined];

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


test('/store/app/client/actions/SET_CLIENT', () => {
    const action = clientStore.actions.setClient;
    
    allClientsCombinations.forEach(client => {
        expect(action(client)).toEqual({
            type: ACTION_TYPE.SET_CLIENT,
            payload: {
                client: client
            }
        });
    });

});

test('/store/app/client/reducer', () => {
    const reducer = clientStore.reducer;
    const setClient = clientStore.actions.setClient;
    const allClients = allClientsCombinations;

    allClients.forEach(state => {
        allClients.forEach(client => {
            expect(reducer(state, setClient(client)))
                .toEqual(client ? client : def.client);
        }); 
    });
});