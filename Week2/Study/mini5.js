import readlineSyncModule from 'readline-sync';

const number = parseInt(readlineSyncModule.question("숫자 입력 :"), 10);
for (let i = 1; i < 10; i++){
    console.log(`${number}*${i}=${number*i}`)
}

for (let i = 1; i < 10; i += 2) {
    let spaces = ' '.repeat(parseInt((10 - i) / 2));
    let stars = '*'.repeat(i);
    console.log(spaces + stars + spaces);
}