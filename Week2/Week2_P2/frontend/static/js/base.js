/*document.addEventListener('DOMContentLoaded', () => {
    // 로컬 스토리지에서 쿠키를 불러옴
    const storedCookie = localStorage.getItem('cookie');

    // fetch 요청 헤더에 쿠키 포함
    const headers = {
        'Content-Type': 'application/json'
    };

    if (storedCookie) {
        headers['Cookie'] = storedCookie;
    }

    // 사용자 정보를 불러오는 fetch 요청
    fetch('http://127.0.0.1:8000/userinfo', {
        method: 'GET',
        credentials: 'include', // 쿠키를 전송하기 위해 필요한 옵션
        headers: headers // 저장된 쿠키를 요청 헤더에 포함
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();  // JSON 응답을 파싱합니다.
    })
    .then(data => {
        // 받아온 사용자 정보를 저장합니다.
        const userInfo = data;
        console.log(userInfo); // 예시: 서버에서 받아온 사용자 정보를 콘솔에 출력
        
        // 사용자 정보를 이용하여 필요한 작업을 수행합니다.
        // 예를 들어, 사용자 프로필 이미지를 변경하는 등의 작업을 수행할 수 있습니다.
        if (userInfo.profileImage) {
            const profileElement = document.querySelector('.overheader .profile');
            profileElement.style.backgroundImage = `url('${userInfo.profileImage}')`;
        }
    })
    .catch(error => {
        console.error('Error fetching user info:', error);
    });
});*/
