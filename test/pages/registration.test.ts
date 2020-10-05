import { validateUser } from '../../pages/registration';
import combine from '../test-tools/generator/combine/combine';

test('validateUser() from /registration', () => {
    const firstNames = [null, '', 'a', 'aa', 'aaa'];
    const lastNames = firstNames;
    const gender = ['female', 'male', 'other'];
    const loyaltyPrograms = ['none', 'card', 'mobile'];
    const cardNumbers = [null, '', '1', 'a', '1111111111111111', '111111111111111a', '11111111111111111', '1111111111111111a'];

    combine((v) => {
        const user = {
            firstName: v[0],
            lastName: v[1],
            gender: v[2],
            loyaltyProgram: v[3],
            cardNumber: v[4]
        };
        const err = {
            firstName: user.firstName !== null && user.firstName.length < 2,
            lastName: user.lastName !== null && user.lastName.length < 2,
            cardNumber: user.loyaltyProgram == 'card' && !(user.cardNumber !== null && user.cardNumber.match(/\d{16}/))
        };

        expect(validateUser(user)).toEqual(err);
    }, firstNames, lastNames, gender, loyaltyPrograms, cardNumbers);

});