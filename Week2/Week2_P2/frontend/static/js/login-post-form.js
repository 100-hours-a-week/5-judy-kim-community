document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    let helpLogin = document.querySelector('.helptext.login'); // 로그인 실패 메시지를 표시할 요소

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const formObject = Object.fromEntries(formData);
        
        // FormData 내용 로깅
        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });
        console.log([...formData]);

        fetch('http://127.0.0.1:8000/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObject)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // 응답에서 쿠키 추출
        })
        .then(data => {
            // 서버에서 받아온 쿠키 저장
            const cookie = data.cookie;
            // 쿠키를 로컬 스토리지에 저장
            localStorage.setItem('cookie', cookie);
            
            console.log('로그인 성공!');
            helpLogin.classList.add('hide');
            // 사용자 정보 엔드포인트 호출하여 프로필 이미지 설정
            fetch('http://127.0.0.1:8000/userinfo', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': cookie // 저장된 쿠키를 헤더에 포함
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(userInfo => {
                // 받아온 사용자 정보를 이용하여 프로필 이미지 설정
                const profileElement = document.querySelector('.overheader .profile');
                if (userInfo.profileImage) {
                    profileElement.style.backgroundImage = `url('${userInfo.profileImage}')`;
                }
            })
            .catch(error => {
                console.error('Error fetching user info:', error);
            });

            window.location.href = '/posts';
        })
        .catch(error => {
            console.error('Error fetching:', error);
            console.error(`Login failed: ${error.message}`);
            helpLogin.classList.remove('hide');
            helpLogin.textContent = `* ${error.message || "입력하신 계정 정보가 정확하지 않습니다"}`;
            helpLogin.style.color = "red";
        });
    });
});
