// base.js

document.addEventListener('DOMContentLoaded', () => {
    // 사용자 정보를 불러오는 코드 작성
    // 예를 들어, fetch를 사용하여 서버로부터 사용자 정보를 가져오는 코드를 작성할 수 있습니다.
    // 이 부분은 로그인 성공 후에 서버에서 사용자 정보를 받아와야 합니다.
    
    // 서버에서 사용자 정보를 받아오는 예시
    fetch('http://127.0.0.1:8000/userinfo', {
        method: 'GET',
        credentials: 'include', // 쿠키를 전송하기 위해 필요한 옵션
        headers: {
            'Content-Type': 'application/json'
        }
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
    })
    .catch(error => {
        console.error('Error fetching user info:', error);
    });
});
