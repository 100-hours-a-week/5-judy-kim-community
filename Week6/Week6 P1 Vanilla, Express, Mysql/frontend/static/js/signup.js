document.addEventListener('DOMContentLoaded', (event) => {    
    const form = document.getElementById('signupForm');
    const submitButton = document.getElementById('signupButton');

    form.addEventListener('submit', function(e) {
        e.preventDefault();  // 폼 제출 막기

        const formData = new FormData(form);  // 폼 데이터 생성

        // 버튼 비활성화
        submitButton.disabled = true;

        // 폼 데이터 로깅
        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });
        console.log([...formData]);

        // 서버에 회원가입 요청
        fetch('http://127.0.0.1:8600/api/users/signup', {
            method: 'POST',
            cache: 'no-cache',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');  // 응답이 실패하면 에러 발생
            }
            return response.json();  // 응답을 JSON으로 파싱
        })
        .then(data => {
            console.log(data.message);
            showToast('회원가입이 완료되었습니다!');  // 성공 메시지 표시
            setTimeout(() => {
                window.location.href = '/login';  // 1초 후 로그인 페이지로 이동
            }, 1000);
        })
        .catch(error => {
            console.error('Error fetching:', error);
            showToast(`회원가입 실패: ${error.message || '서버 오류'}`);  // 에러 메시지 표시
        })
        .finally(() => {
            // 요청이 완료되면 버튼을 다시 활성화 (필요 시 주석 해제)
            // submitButton.disabled = false;
        });
    });
});
