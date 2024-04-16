// 비밀번호
document.addEventListener('DOMContentLoaded', (event) => {

// signup
    // 실패 : 프로필 사진을 추가해주세요.
    let messageProfileErr = document.querySelector('.profileErr'); 

// signup

    // 이메일 입력창 정보 가져오기
    let inputEmail = document.querySelector('#inputEmail');
    // 성공 : 사용할 수 있는 이메일 입니다.
    let messageEmailSucc = document.querySelector('.emailSucc'); 
    // 실패 : 올바른 이메일 형식을 입력해주세요.
    let messageEmailErr1 = document.querySelector('.emailErr1'); 
    // 실패 : 중복된 이메일입니다.
    let messageEmailErr2 = document.querySelector('.emailErr2'); 


// signup, profile-edit2

    // 비밀번호 입력창 정보 가져오기
    let inputPassword = document.querySelector('#inputPassword'); 
    // 성공 : 사용할 수 있는 비밀번호 입니다.
    let messagePasswordSucc = document.querySelector('.passwordSucc'); 
    // 실패 : 비밀번호를 입력해주세요.
    let messagePasswordErr1 = document.querySelector('.passwordErr1'); 
    // 실패 : 비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수 문자를 각각 최소 1개 포함해야 합니다.
    let messagePasswordErr2 = document.querySelector('.passwordErr2'); 
    

    function passwordLength(value) {
        return value.length >= 8 && value.length <= 20;
    }

    inputPassword.onkeyup = function () {
        if (inputPassword.value.length > 0) {
            if (passwordLength(inputPassword.value)) {
                messagePasswordSucc.classList.remove('hide');
                messagePasswordErr1.classList.add('hide');
                messagePasswordErr2.classList.add('hide');
            } else {
                messagePasswordSucc.classList.add('hide');
                messagePasswordErr2.classList.remove('hide');
            }
        } else {
            messagePasswordSucc.classList.add('hide');
            messagePasswordErr1.classList.remove('hide');
        }
    };

// signup, profile-edit2

    // 비밀번호 확인 입력창 정보 가져오기
    let inputRetypePassword = document.querySelector('#inputRetypePassword');
    // 성공 : 비밀번호가 일치합니다.
    let messageRetypeSucc = document.querySelector('.retypeSucc');
    // 실패 : 비밀번호를 한 번 더 입력해주세요.
    let messageRetypeErr1 = document.querySelector('.retypeErr1');
    // 실패 : 비밀번호가 다릅니다.
    let messageRetypeErr2 = document.querySelector('.retypeErr2');

    
    inputRetypePassword.onkeyup = function () {
        if (inputRetypePassword.value.length !== 0) {
            if (inputRetypePassword.value === inputPassword.value) {
                messageRetypeSucc.classList.remove('hide');
                messageRetypeErr2.classList.add('hide');
            } else {
                messageRetypeSucc.classList.add('hide');
                messageRetypeErr2.classList.remove('hide');
            }
        } else {
            messageRetypeErr1.classList.remove('hide');
        }
    };

// signup, profile-edit1

    // 닉네임 입력창 정보 가져오기
    let inputNickname = document.querySelector('#inputNickname');
    // 성공 : 사용할 수 있는 닉네임입니다.
    let messageNicknameSucc = document.querySelector('.nicknameSucc');
    // 실패 : 닉네임을 입력해 주세요.
    let messageNicknameErr1 = document.querySelector('.nicknameErr1');
    // 실패 : 닉네임은 띄어쓰기가 불가하고, 10글자 이내여야 합니다.
    let messageNicknameErr2 = document.querySelector('.nicknameErr2');
    // 실패 : 띄어쓰기를 없애주세요.
    let messageNicknameErr3 = document.querySelector('.nicknameErr3');
    // 실패 : 닉네임은 최대 10글자까지 작성 가능합니다.
    let messageNicknameErr4 = document.querySelector('.nicknameErr4');
    // 실패 : 중복된 닉네임입니다.
    let messageNicknameErr5 = document.querySelector('.nicknameErr5');
    
// login
    // 실패 : 입력하신 계정 정보가 정확하지 않습니다
    let messageLoginErr = document.querySelector('.loginErr');
    
// post-write, post-edit
    // 실패 : 제목, 내용을 모두 작성해주세요.
    let messageWriteErr = document.querySelector('.writeErr');


});
