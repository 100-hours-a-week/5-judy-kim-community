document.addEventListener('DOMContentLoaded', () => {
    fetch('http://127.0.0.1:8000/api/users/userinfo', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch user info');
        }
        return response.json();
    })
    .then(userInfo => {
        // 프로필 이미지 업데이트
        const profileDiv = document.querySelector('.profile');
        if (profileDiv && userInfo.profileImage) {
            profileDiv.style.backgroundImage = `url(${userInfo.profileImage})`;
        }

        // 이메일 정보 업데이트
        if (window.location.pathname.includes('/profile-edit1')) {    
            const emailP = document.querySelector('.email');
            if (emailP && userInfo.email) {
                emailP.textContent = userInfo.email;
            }

            const nicknameInput = document.querySelector('.inputNickname');
            if (nicknameInput && userInfo.nickname) {
                nicknameInput.value = userInfo.nickname;
            }
        }
    })
    .catch(error => {
        console.error('Failed to fetch user info:', error);
    });
});