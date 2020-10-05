/* 
This function go through all possible variations of array on i-th place of which is element of the i-th array
Usage:

combine(
    ([v1, v2, .., vN]) => {*code*},
    arr1,
    arr2,
    .. ,
    arrN
);

*/

const combine = (f, ...arrays) => {

    function loop(arr, f){
        arr.map(v => f(v));
    }

    let l = [f];
    let i = 0;
    arrays.map(arr => {
        const j = parseInt(i + 'v');
        i++;
        l[i] = (v) => loop(arr, val => l[j]([val, ...v]));
    });

    l[i]([]);
}

export default combine;