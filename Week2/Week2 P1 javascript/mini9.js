const applyDiscount = (age) => {
    if (age > 0) {  
        if (age < 20) {
            return '20% 미성년자 할인이 적용됩니다.';
        } else {
            return '할인이 적용되지 않습니다.';
        }
    } else {
        return '올바른 나이를 입력해주세요.';
    }
};

console.log(applyDiscount(20));
console.log(applyDiscount(16));