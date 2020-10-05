import gender from "../../../abstractions/type/model/gender";
import loyaltyProgram from "../../../abstractions/type/model/loyaltyProgram";
import Client from "../../../assets/model/Client";
import combine from "../../test-tools/generator/combine/combine";

test('assets/model/Client', () => {
    const firstNames = [null, '', 'a', 'aa', 'aaa'];
    const lastNames = firstNames;
    const genders = ['female', 'male', 'other'];
    const loyaltyPrograms = ['none', 'card', 'mobile'];
    const cardNumbers = [null, '', '1', 'a', '1111111111111111', '111111111111111a', '11111111111111111', '1111111111111111a'];

    combine((arr: [string, string, gender, loyaltyProgram, string]) => {
        const id = Math.round(Math.random()*1000000);
        const obj = {
            id,
            firstName: arr[0],
            lastName: arr[1],
            gender: arr[2],
            loyaltyProgram: arr[3],
            cardNumber: arr[4]
        };
        const client = new Client(obj);
        
        expect(Object.assign(client, {createDate: null})).toEqual({...obj, createDate: null})
    }, firstNames, lastNames, genders, loyaltyPrograms, cardNumbers);
})