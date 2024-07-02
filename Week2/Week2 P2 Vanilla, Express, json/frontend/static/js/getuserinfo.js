document.addEventListener('DOMContentLoaded', () => {

    //if (window.location.pathname.includes('/profile-edit1') || window.location.pathname.includes('/profile-edit2')) {    
        fetch('http://127.0.0.1:8200/api/users/userinfo', {
            method: 'GET',
            credentials: 'include' 
        })
        .then(response => { 
            if (!response.ok) {
                console.log("로그인되지않음");
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
                const event = new Event('keyup', { bubbles: true, cancelable: true });
                document.getElementById('inputNickname').dispatchEvent(event);
            
                const profileImage = document.querySelector('.profile-image');
                if (profileImage && userInfo.profileImage) {
                    profileImage.style.backgroundImage = `url(${userInfo.profileImage})`;
                }
            }
        })
        .catch(error => {
            console.error('Failed to fetch user info:', error);
        });
    //}
});