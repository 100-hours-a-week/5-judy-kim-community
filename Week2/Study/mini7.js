import readlineSyncModule from 'readline-sync';

function gogo(number){
    for (let i = 1; i < 10; i++){
        console.log(`${number}*${i}=${number*i}`)
    }
}

gogo(parseInt(readlineSyncModule.question("숫자 입력 :"), 10))


const firstNumber = parseInt(readlineSyncModule.question("첫 번째 숫자 :"), 10);
const operator = readlineSyncModule.question("연산자 :");
const secondNumber = parseInt(readlineSyncModule.question("두 번째 숫자 :"), 10);

function calc(fn, op, sec){
    let result;

    switch (op) {
        case '+':
            result = firstNumber + secondNumber; // 더하기 연산
            break;
        case '-':
            result = firstNumber - secondNumber; // 빼기 연산
            break;
        case '*':
            result = firstNumber * secondNumber; // 곱하기 연산
            break;
        case '/':
            result = firstNumber / secondNumber; // 나누기 연산
            break;
        default:
            result = '유효하지 않은 연산자입니다.'; // 입력 오류 예외 처리
    }    
    console.log(`${fn} ${op} ${sec} = ${result}`); // 결과 출력
    return;
}
calc(firstNumber, operator, secondNumber);
