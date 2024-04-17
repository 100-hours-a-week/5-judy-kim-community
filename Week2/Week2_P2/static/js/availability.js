document.addEventListener('DOMContentLoaded', (event) => {    

    // signup
    // 프로필 이미지 검증
    let inputProfileImage = document.querySelector('#inputProfileImage');   
    let helpProfileImage = document.querySelector('.helptext.profileImage');

    inputProfileImage.onchange = function () {
        helpProfileImage.classList.remove('hide');
        if (inputProfileImage.files.length > 0) {
            helpProfileImage.textContent = "* 프로필 사진이 업로드 되었습니다.";
            helpProfileImage.style.color = "green";
        } else {
            helpProfileImage.textContent = "* 프로필 사진을 추가해주세요.";
            helpProfileImage.style.color = "red";
        }
    };

    // signup
    // 이메일 검증
    let inputEmail = document.querySelector('#inputEmail');     
    let helpEmail = document.querySelector('.helptext.email');     

    // 중복 이메일 예시 데이터
    const existingEmails = ['example@example.com', 'test@test.com'];

    inputEmail.onkeyup = function () {
        helpEmail.classList.remove('hide');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(inputEmail.value)) {
            if (existingEmails.includes(inputEmail.value)) {
                helpEmail.textContent = "* 중복된 이메일입니다.";
                helpEmail.style.color = "red";
            } else {
                helpEmail.textContent = "* 사용할 수 있는 이메일 입니다.";
                helpEmail.style.color = "green";
            }
        } else {
            helpEmail.textContent = "* 올바른 이메일 형식을 입력해주세요.";
            helpEmail.style.color = "red";
        }
    };    

    // signup, profile-edit2
    // 비밀번호 검증
    let inputPassword = document.querySelector('#inputPassword');     
    let helpPassword = document.querySelector('.helptext.password');  

    inputPassword.onkeyup = function () {
        helpPassword.classList.remove('hide');
        if (inputPassword.value.length > 0) {
            if (inputPassword.value.length >= 8 && inputPassword.value.length <= 20) {
                helpPassword.textContent = "* 사용할 수 있는 비밀번호 입니다.";
                helpPassword.style.color = "green";
            } else {
                helpPassword.textContent = "* 비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수 문자를 각각 최소 1개 포함해야 합니다.";
                helpPassword.style.color = "red";
            }
        } else {
            helpPassword.textContent = "* 비밀번호를 입력해주세요.";
            helpPassword.style.color = "red";
        }
    };

    // signup, profile-edit2
    // 비밀번호 재입력 검증
    let inputRetypePassword = document.querySelector('#inputRetypePassword');
    let helpRetypePassword = document.querySelector('.helptext.retypePassword');

    inputRetypePassword.onkeyup = function () {
        helpRetypePassword.classList.remove('hide');
        if (inputRetypePassword.value.length !== 0) {
            if (inputRetypePassword.value === inputPassword.value) {
                helpRetypePassword.textContent = "* 비밀번호가 일치합니다.";
                helpRetypePassword.style.color = "green";
            } else {
                helpRetypePassword.textContent = "* 비밀번호가 다릅니다.";
                helpRetypePassword.style.color = "red";
            }
        } else {
            helpRetypePassword.textContent = "* 비밀번호를 한 번 더 입력해주세요.";
            helpRetypePassword.style.color = "red";
        }
    };


    // signup, profile-edit1
    // 닉네임 검증
    let inputNickname = document.querySelector('#inputNickname'); 
    let helpNickname = document.querySelector('.helptext.nickname');
    
    // 중복 닉네임 예시 데이터
    const existingNicknames = ['nickname1', 'nickname2'];

    inputNickname.onkeyup = function () {
        helpNickname.classList.remove('hide');
        if (inputNickname.value.length === 0) {
            helpNickname.textContent = "* 닉네임을 입력해 주세요.";
            helpNickname.style.color = "red";
        } else if (inputNickname.value.includes(' ')) {
            helpNickname.textContent = "* 띄어쓰기를 없애주세요.";
            helpNickname.style.color = "red";
        } else if (inputNickname.value.length > 10) {
            helpNickname.textContent = "* 닉네임은 최대 10글자까지 작성 가능합니다.";
            helpNickname.style.color = "red";
        } else {
            if (existingNicknames.includes(inputNickname.value)) {
                helpNickname.textContent = "* 중복된 닉네임입니다.";
                helpNickname.style.color = "red";
            } else {
                helpNickname.textContent = "* 사용할 수 있는 닉네임입니다.";
                helpNickname.style.color = "green";
            }
        }
    };

    
    // login
    // 로그인 검증
    let loginButton = document.querySelector('#button-login');
    let helpLogin = document.querySelector('.helptext.login');  

    loginButton.addEventListener('click', function() {
        // 서버 검증 후 실패 응답 가정
        helpLogin.classList.remove('hide');
        helpLogin.textContent = "* 입력하신 계정 정보가 정확하지 않습니다";
        helpLogin.style.color = "red";
    });
});

// post-write, post-edit
// 포스트 작성 검증
document.addEventListener('DOMContentLoaded', function() {
    let inputTitle = document.querySelector('#inputTitle');
    let inputContent = document.querySelector('#inputContent');
    let helpPost = document.querySelector('.helptext.helpPost');

    function validatePost() {
        helpPost.classList.remove('hide');
        if (inputTitle.value.trim() === '' || inputContent.value.trim() === '') {
            helpPost.textContent = "* 제목, 내용을 모두 작성해주세요.";
            helpPost.style.color = "red";
        } else {
            helpPost.textContent = "제목과 내용이 모두 입력되었습니다.";
            helpPost.style.color = "green";
        }
    }

    inputTitle.onkeyup = validatePost;
    inputContent.onkeyup = validatePost;
});
