const hour = 5;

// 시간에 따라 식사 시간인지, 아닌지 출력 
if(7<=hour &&  hour<=9){
    console.log("아침 식사 시간");
}
else if(12<=hour &&  hour<=14){
    console.log("점심 시간");
}
else if(18<=hour &&  hour<=20){
    console.log("저녁 식사 시간");
}
else {
    console.log("식사 금지");
}

const operator = '*';
// 어떤 연산자인지 출력
switch(operator){
    case '+' :
        console.log("더하기");
        break
    case '-' :
        console.log("빼기");
        break
    case '*' :
        console.log("곱하기");
        break
    case '/' :
        console.log("나누기");
        break
    default :
        console.log("연산자가 아님");
        break
}