import readlineSyncModule from 'readline-sync';

const hello = readlineSyncModule.question();
console.log(`나: ${hello}`);
console.log(`앵무새: ${hello}`);


let isCorrect = false;
let sentence = "열심히 배워서 최고의 개발자가 되어보자!";
console.log(sentence);
const mysen = readlineSyncModule.question("문장 입력: ");
isCorrect = "열심히 배워서 최고의 개발자가 되어보자!" === mysen
if (isCorrect){
    console.log("정답입니다.");
}
else {
    console.log("정답이 아님..");
}