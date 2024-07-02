import readlineSync from 'readline-sync';
import fileSystem from 'fs';

// 사용자 입력 받기
const userName = readlineSync.question('이름: ');
const userAge = readlineSync.question('나이: ');
const userEmail = readlineSync.question('이메일: ');
const userCall = readlineSync.question('전화번호: ');

let message = {
    userName: userName,
    userAge: userAge,
    userEmail: userEmail,
    userCall, userCall       
}
// 파일에 저장
fileSystem.writeFileSync(
    'myInfo.json',
    JSON.stringify({ message: message }),
    'utf8',
);
console.log('myInfo.json 파일이 생성되었습니다.');


// 파일 읽기
const fileContent = fileSystem.readFileSync('myInfo.json', 'utf8');
const jsonData = JSON.parse(fileContent);
console.log('파일에 저장된 문장:', jsonData.message);

const yesorno = readlineSync.question('myInfo.json 파일을 삭제하시겠습니까? (y/n): ');
if(yesorno == 'y'){
    fileSystem.unlinkSync('myInfo.json');
    console.log('myInfo.json 파일이 삭제되었습니다.');
}
else {
    console.log('myInfo.json 파일이 삭제되지 않았습니다.');
}

