function makeBread(첫번째재료, 두번째재료) {
    console.log(`${첫번째재료}과 ${두번째재료}로 빵을 만드는 중입니다.`);
    console.log('굽습니다.');
    console.log('빵이 완성되었습니다!');
    return '빵';
}

const bread = makeBread('밀가루', '우유');
console.log(bread);