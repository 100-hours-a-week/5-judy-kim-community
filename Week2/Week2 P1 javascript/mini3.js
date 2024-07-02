const firstNumber = 10; // 연산을 위한 첫 번째 수
const secondNumber = 5; // 연산을 위한 두 번째 수
const operator = '+'; // 연산자

let result;

switch (operator) {
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

console.log(`결과: ${result}`); // 결과 출력