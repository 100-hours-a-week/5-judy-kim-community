document.addEventListener('DOMContentLoaded', () => {
    fetchUserInfo()
        .then(userInfo => {
            updateProfileImage(userInfo); // 프로필 이미지 업데이트
            if (window.location.pathname.includes('/profile-edit1')) {
                updateEmailAndNickname(userInfo); // 이메일 및 닉네임 업데이트
            }
        })
        .catch(error => {
            console.error('Failed to fetch user info:', error); // 사용자 정보 가져오기 실패 시 에러 출력
        });
});

// 사용자 정보를 가져오는 함수
function fetchUserInfo() {
    return fetch('http://127.0.0.1:8600/api/users/userinfo', {
        method: 'GET',
        credentials: 'include' // 세션 쿠키를 포함하여 요청
    })
    .then(response => {
        if (!response.ok) {
            console.log("로그인되지않음"); // 응답이 실패하면 로그인되지 않음 출력
            throw new Error('Failed to fetch user info'); // 에러 발생
        }
        return response.json(); // 사용자 정보 반환
    });
}

// 프로필 이미지를 업데이트하는 함수
function updateProfileImage(userInfo) {
    const profileDiv = document.querySelector('.profile'); // 프로필 이미지 요소
    if (profileDiv && userInfo.profileImage) {
        profileDiv.style.backgroundImage = `url(${userInfo.profileImage})`; // 프로필 이미지 설정
    }
}

// 이메일과 닉네임을 업데이트하는 함수
function updateEmailAndNickname(userInfo) {
    const emailP = document.querySelector('.email'); // 이메일 표시 요소
    if (emailP && userInfo.email) {
        emailP.textContent = userInfo.email; // 이메일 설정
    }

    const nicknameInput = document.querySelector('.inputNickname'); // 닉네임 입력 필드
    if (nicknameInput && userInfo.nickname) {
        nicknameInput.value = userInfo.nickname; // 닉네임 설정
    }

    // 닉네임 입력 필드의 키업 이벤트 트리거
    const event = new Event('keyup', { bubbles: true, cancelable: true });
    document.getElementById('inputNickname').dispatchEvent(event);

    const profileImage = document.querySelector('.profile-image'); // 프로필 이미지 요소
    if (profileImage && userInfo.profileImage) {
        profileImage.style.backgroundImage = `url(${userInfo.profileImage})`; // 프로필 이미지 설정
    }
}
