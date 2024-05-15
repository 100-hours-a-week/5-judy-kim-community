document.addEventListener('DOMContentLoaded', (event) => {    

    // 요소 참조
    let uploadProfileImage1 = document.querySelector('#uploadProfileImage');
    let uploadProfileImage2 = document.querySelector('#uploadProfileImage2');  
    let helpProfileImage = document.querySelector('.helptext.profileImage');
    let profileImagePreview = document.querySelector('#profileImagePreview');
    let inputEmail = document.querySelector('#inputEmail');     
    let helpEmail = document.querySelector('.helptext.email');
    let inputPassword = document.querySelector('#inputPassword');     
    let helpPassword = document.querySelector('.helptext.password');  
    let inputRetypePassword = document.querySelector('#inputRetypePassword');
    let helpRetypePassword = document.querySelector('.helptext.retypePassword');
    let inputNickname = document.querySelector('#inputNickname'); 
    let helpNickname = document.querySelector('.helptext.nickname');

    const signupButton = document.querySelector('#signupButton');
    const nicknameButton = document.querySelector('#nicknameButton');
    const retypePasswordButton = document.querySelector('#retypePasswordButton');
    
    // 중복 이메일 예시 데이터
    // const existingEmails = ['example@example.com', 'test@test.com'];
    const existingNicknames = ['nickname1', 'nickname2'];

    let uploadProfileImageValid = false; 
    let inputEmailValid = false;
    let inputPasswordValid = false;
    let inputRetypePasswordValid = false;
    let inputNicknameValid = false;

    // 모든 검증을 통합하여 회원 가입 버튼 활성화
    function updateSignupButtonStatus() {

        // signup : 회원가입 제출 조건
        if (window.location.href.includes('/signup')){
            if (signupButton) {
                if (inputEmailValid && inputPasswordValid && inputRetypePasswordValid && inputNicknameValid && uploadProfileImageValid){
                    console.log(inputEmailValid, inputPasswordValid, inputRetypePasswordValid, inputNicknameValid, uploadProfileImageValid);
                    activeButton(signupButton);
                }
                else{
                    console.log(uploadProfileImageValid, inputEmailValid, inputPasswordValid, inputRetypePasswordValid, inputNicknameValid);
                    disableButton(signupButton);
                }
            }
        }
        // profile-edit1 : 닉네임 변경 조건
        if (window.location.href.includes('/profile-edit1')){
            if (nicknameButton && (uploadProfileImageValid || inputNicknameValid))
                activeButton(nicknameButton);
            else {
                console.log(uploadProfileImageValid, inputNicknameValid);
                disableButton(nicknameButton);
            }
        }
        // profile-edit2 : 비밀번호 변경 조건
        if (window.location.href.includes('/profile-edit2')){
            if (retypePasswordButton && inputRetypePasswordValid)
                activeButton(retypePasswordButton);
            else if (retypePasswordButton && !inputRetypePasswordValid)
                disableButton(retypePasswordButton);
        }
    }

    function activeButton(buttonName){
        buttonName.classList.add("active");
        buttonName.disabled = false;
    }

    function disableButton(buttonName){
        buttonName.classList.remove("active");
        buttonName.disabled = true;
    }

    window.fillSignupDevData = function() {
        inputEmail.value = 'test@example.com';
        inputPassword.value = 'Password123!';
        inputRetypePassword.value = 'Password123!';
        inputNickname.value = 'testUser';
        /*
        const profileImage = document.getElementById('profileImagePreview');
        if (profileImage) {
            profileImagePreview.style.backgroundImage = 'url(/image/profile.png)';
            const event = new Event('change', { bubbles: true, cancelable: true });
            profileImage.dispatchEvent(event); // 이벤트 발생
        }*/
        ['inputEmail', 'inputPassword', 'inputRetypePassword', 'inputNickname'].forEach(id => {
            const event = new Event('keyup', { bubbles: true, cancelable: true });
            document.getElementById(id).dispatchEvent(event);
        });
    };  

    window.fillLoginDevData = function() {
        let inputEmailLogin = document.querySelector('#inputEmailLogin');
        let inputPasswordLogin = document.querySelector('#inputPasswordLogin')
        inputEmailLogin.value = 'test@example.com';
        inputPasswordLogin.value = 'Password123!';
        ['inputEmailLogin', 'inputPasswordLogin'].forEach(id => {
            const event = new Event('keyup', { bubbles: true, cancelable: true });
            document.getElementById(id).dispatchEvent(event);
        }); 
    }; 

    // signup, profile-edit1
    function setupProfileImageHandlers(element) {
        if (!element) return;  // 요소가 없다면 함수를 종료합니다.
        console.log(element);
        console.log(profileImagePreview);
        element.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                uploadProfileImageValid = true;
                var reader = new FileReader();
                reader.onload = function(e) {
                    profileImagePreview.style.backgroundImage = 'url(' + e.target.result + ')';
                    if(helpProfileImage){
                        helpProfileImage.classList.remove('hide');
                        helpProfileImage.textContent = "* 프로필 사진이 업로드 되었습니다.";
                        helpProfileImage.style.color = "green";
                    } 
                };
                reader.readAsDataURL(this.files[0]);
            } else {
                profileImagePreview.style.backgroundImage = 'none';
                if(helpProfileImage){
                    helpProfileImage.textContent = "* 프로필 사진을 추가해주세요.";
                    helpProfileImage.style.color = "red";
                }
                uploadProfileImageValid = false;
            }
            updateSignupButtonStatus(); 
        });
    
        element.addEventListener('click', function() {
            console.log("클릭!");
            setTimeout(() => {
                if (element.files.length === 0) {
                    if(helpProfileImage){
                        helpProfileImage.classList.remove('hide');
                        helpProfileImage.textContent = "* 프로필 사진을 추가해주세요.";
                        helpProfileImage.style.color = "red";
                    }
                    profileImagePreview.style.backgroundImage = 'none';
                    uploadProfileImageValid = false;
                    updateSignupButtonStatus();
                }
            }, 100);
        });
    }
    
    if (window.location.href.includes('/signup') || window.location.href.includes('/profile-edit1')) {
        setupProfileImageHandlers(uploadProfileImage1);
        setupProfileImageHandlers(uploadProfileImage2);
    } 
 
    // signup
    if (window.location.href.includes('/signup')) {
        // 이메일 검증
        inputEmail.onkeyup = async function() {
            helpEmail.classList.remove('hide');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailValue = inputEmail.value;
            if (!emailRegex.test(emailValue)) {
                helpEmail.textContent = "* 올바른 이메일 형식을 입력해주세요.";
                helpEmail.style.color = "red";
                inputEmailValid = false;
            } else {
                const url = `http://127.0.0.1:8000/api/users/check-email?email=${encodeURIComponent(emailValue)}`;
                try {
                    const response = await fetch(url, {
                        method: 'GET',  
                        cache: 'no-cache', 
                        headers: {
                            'Content-Type': 'application/json' 
                        }
                    });
                    if (!response.ok) {
                        throw new Error(`Server responded with status: ${response.status}`);
                    }
                    const data = await response.json();
                    if (data.emailExists) {
                        helpEmail.textContent = "* 중복된 이메일입니다.";
                        helpEmail.style.color = "red";
                        inputEmailValid = false;
                    } else {
                        helpEmail.textContent = "* 사용할 수 있는 이메일 입니다.";
                        helpEmail.style.color = "green";
                        inputEmailValid = true;
                    }
                } catch (error) {
                    console.error('Error fetching:', error);
                    helpEmail.textContent = "* 이메일 검사 중 오류가 발생했습니다. 서버 응답 확인 필요.";
                    helpEmail.style.color = "red";
                    inputEmailValid = false;
                }
            }
            updateSignupButtonStatus();
        };        
    }


    // signup, profile-edit2
    if (window.location.href.includes('/signup') || window.location.href.includes('/profile-edit2')) {
        // 비밀번호 검증
        inputPassword.onkeyup = function () {
            helpPassword.classList.remove('hide');
            if (inputPassword.value.length > 0) {
                const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

                if (regex.test(inputPassword.value)) {
                    helpPassword.textContent = "* 사용할 수 있는 비밀번호 입니다.";
                    helpPassword.style.color = "green";
                    inputPasswordValid = true;
                } else if (inputPassword.value.includes(' ')) {
                    helpPassword.textContent = "* 띄어쓰기를 없애주세요."; 
                    helpPassword.style.color = "red";
                    inputPasswordValid = false;
                } else {
                    helpPassword.textContent = "* 비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수 문자를 각각 최소 1개 포함해야 합니다.";
                    helpPassword.style.color = "red";
                    inputPasswordValid = false;
                }
            } else {
                helpPassword.textContent = "* 비밀번호를 입력해주세요.";
                helpPassword.style.color = "red";
                inputPasswordValid = false;
            }

            if (inputRetypePassword.value.length !== 0) {
                if (inputRetypePassword.value === inputPassword.value) {
                    helpRetypePassword.textContent = "* 비밀번호가 일치합니다.";
                    helpRetypePassword.style.color = "green";
                    inputRetypePasswordValid = true;
                } else {
                    helpRetypePassword.textContent = "* 비밀번호가 다릅니다.";
                    helpRetypePassword.style.color = "red";
                    inputRetypePasswordValid = false;
                }
            } else {
                helpRetypePassword.textContent = "* 비밀번호를 한 번 더 입력해주세요.";
                helpRetypePassword.style.color = "red";
                inputRetypePasswordValid = false;
            }

            updateSignupButtonStatus();
        };

        // signup, profile-edit2
        // 비밀번호 재입력 검증
        inputRetypePassword.onkeyup = function () {
            helpRetypePassword.classList.remove('hide');
            if (inputRetypePassword.value.length !== 0) {
                if (inputRetypePassword.value === inputPassword.value) {
                    helpRetypePassword.textContent = "* 비밀번호가 일치합니다.";
                    helpRetypePassword.style.color = "green";
                    inputRetypePasswordValid = true;
                } else {
                    helpRetypePassword.textContent = "* 비밀번호가 다릅니다.";
                    helpRetypePassword.style.color = "red";
                    inputRetypePasswordValid = false;
                }
            } else {
                helpRetypePassword.textContent = "* 비밀번호를 한 번 더 입력해주세요.";
                helpRetypePassword.style.color = "red";
                inputRetypePasswordValid = false;
            }

            updateSignupButtonStatus();
        };
    }


    // signup, profile-edit1
    if (window.location.href.includes('/signup') || window.location.href.includes('/profile-edit1')) {
        let currentUserNickname = '';

        fetch('http://127.0.0.1:8000/api/users/userinfo', {
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            currentUserNickname = data.nickname;
        })
        .catch(error => {
            console.error('Error fetching current user nickname:', error);
        });

        console.log(currentUserNickname);
        
        // 닉네임 검증
        inputNickname.onkeyup = async function () {
            helpNickname.classList.remove('hide');
            if (inputNickname.value.length === 0) {
                helpNickname.textContent = "* 닉네임을 입력해 주세요.";
                helpNickname.style.color = "red";
                inputNicknameValid = false;
            } else if (inputNickname.value.includes(' ')) {
                helpNickname.textContent = "* 띄어쓰기를 없애주세요.";
                helpNickname.style.color = "red";
                inputNicknameValid = false;
            } else if (inputNickname.value.length > 10) {
                helpNickname.textContent = "* 닉네임은 최대 10글자까지 작성 가능합니다.";
                helpNickname.style.color = "red";
                inputNicknameValid = false;
            } else {
                // 닉네임 중복 검증
                const url = `http://127.0.0.1:8000/api/users/check-nickname?nickname=${encodeURIComponent(inputNickname.value)}`;
                try {
                    const response = await fetch(url, {
                        method: 'GET',  
                        cache: 'no-cache', 
                        headers: {
                            'Content-Type': 'application/json' 
                        }
                    });
                    if (!response.ok) {
                        throw new Error(`Server responded with status: ${response.status}`);
                    }
                    const data = await response.json();
                    if (data.nicknameExists) {
                        
                        if(window.location.href.includes('/profile-edit1') && currentUserNickname == inputNickname.value){
                            helpNickname.textContent = "* 현재 닉네임입니다.";
                            helpNickname.style.color = "green";
                            inputNicknameValid = true;
                        } else {
                            
                            helpNickname.textContent = "* 중복된 닉네임입니다.";
                            helpNickname.style.color = "red";
                            inputNicknameValid = false;
                        }
                    } else {
                        helpNickname.textContent = "* 사용할 수 있는 닉네임입니다.";
                        helpNickname.style.color = "green";
                        inputNicknameValid = true;
                    }
                } catch (error) {
                    console.error('Error fetching:', error);
                    helpNickname.textContent = "* 닉네임 검사 중 오류가 발생했습니다. 서버 응답 확인 필요.";
                    helpNickname.style.color = "red";
                    inputNicknameValid = false;
                }
            }

            updateSignupButtonStatus();
        };
    }
});

// post-write, post-edit
// 포스트 작성 검증
document.addEventListener('DOMContentLoaded', function() {

    if (window.location.href.includes('/post-write') || window.location.href.includes('/post-edit')) {
        let inputTitle = document.querySelector('#inputTitle');
        let inputContent = document.querySelector('#inputContent');
        let helpPost = document.querySelector('.helptext.helpPost');

        const postButton = document.querySelector('#postButton');

        let inputWriteValid = false;

        // 모든 검증을 통합하여 게시 버튼 활성화
        function updatePostButtonStatus() {
            if (inputWriteValid) {
                postButton.classList.add("active");
                postButton.disabled = false;
            } else {
                postButton.classList.remove("active");
                postButton.disabled = true;
            }
        }

        function validatePost() {
            helpPost.classList.remove('hide');
            // 제목 길이 검증
            if (inputTitle.value.trim().length > 26) {
                helpPost.textContent = "* 제목은 26자 이하로 작성해주세요.";
                helpPost.style.color = "red";
                inputWriteValid = false;
            } else if (inputTitle.value.trim() === '' || inputContent.value.trim() === '') {
                helpPost.textContent = "* 제목과 내용을 모두 작성해주세요.";
                helpPost.style.color = "red";
                inputWriteValid = false;
            } else {
                helpPost.textContent = "제목과 내용이 모두 입력되었습니다.";
                helpPost.style.color = "green";
                inputWriteValid = true;
            }
            updatePostButtonStatus();
        }

        // 제목 입력 길이 제한
        inputTitle.addEventListener('input', function() {
            inputTitle.value = inputTitle.value.slice(0, 26);        
        });

        if (window.location.href.includes('/post-write') || window.location.href.includes('/post-edit')) {
            inputTitle.onkeyup = validatePost;
            inputContent.onkeyup = validatePost;
        }
    }
});
