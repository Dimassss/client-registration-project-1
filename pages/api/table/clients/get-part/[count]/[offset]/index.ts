import gender from "../../../../../../../abstractions/type/model/gender";
import loyaltyProgram from "../../../../../../../abstractions/type/model/loyaltyProgram";
import Client from "../../../../../../../assets/model/Client";

const combine = (count, offset, f, ...arrays) => {
    let counter = -1;


    function loop(arr, f){
        arr.map(v => f(v));
    }

    let l = [(v) => {
        counter++;
        
        if(counter < offset){
            return;
        } else if(counter + 1 > offset + count) {
            throw new Error('end loop');
        }
        
        f(v);
    }];

    let i = l.length;

    arrays.map(arr => {
        const j = parseInt(i + 'v');
        l[j] = (v) => loop(arr, val => l[j-1]([val, ...v]));
        
        i++;
    });

    try{
        l[i-1]([]);
    }catch(e){
        if(e.message !== 'end loop') throw e;
    }
}

const firstNames = [null, '', 'a', 'aa', 'aaa'];
const lastNames = firstNames;
const genders = ['female', 'male', 'other'];
const loyaltyPrograms = ['none', 'card', 'mobile'];
const cardNumbers = [null, '', '1', 'a', '1111111111111111', '111111111111111a', '11111111111111111', '1111111111111111a'];

const getClients = (count, offset) => {
    const clients = [];

    combine(count, offset, (arr: [string, string, gender, loyaltyProgram, string]) => {
        clients[clients.length] = new Client({
            id: clients.length + offset,
            firstName: arr[0],
            lastName: arr[1],
            gender: arr[2],
            loyaltyProgram: arr[3],
            cardNumber: arr[4]
        });
    }, firstNames, lastNames, genders, loyaltyPrograms, cardNumbers);

    return clients;
}

export default (req, res) => {
    const count = +req.query.count;
    const offset = +req.query.offset;

    res.status(200)
        .json(getClients(count, offset));
}