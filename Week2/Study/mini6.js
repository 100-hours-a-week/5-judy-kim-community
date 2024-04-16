const numbers = [1, 2, 3, 4, 5];

let sum = 0;
for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
    console.log(`현재 합계: ${sum} (${numbers[i]}를 더함)`);
}
console.log(`최종 합계: ${sum}`);

let new_sum = 0;
const lists = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
for (let i = 0; i < lists.length; i++) {
    if(lists[i]%2==0){
        new_sum += lists[i];
        console.log(`짝수 발견: ${lists[i]}`);
    }
}
console.log(`짝수 합계: ${new_sum}`);


