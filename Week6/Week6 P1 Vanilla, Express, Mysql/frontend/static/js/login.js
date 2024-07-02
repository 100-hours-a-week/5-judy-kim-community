document.addEventListener('DOMContentLoaded', () => {
    // 현재 페이지가 로그인 페이지인지 확인
    if (window.location.pathname.includes('/login')) {
        const form = document.getElementById('loginForm'); // 로그인 폼 요소
        const submitButton = document.getElementById('button-login'); // 로그인 버튼 요소
        const helpLogin = document.querySelector('.helptext.login'); // 로그인 실패 메시지를 표시할 요소

        // 폼 제출 시 호출되는 함수
        function handleFormSubmit(e) {
            e.preventDefault(); // 폼의 기본 제출 동작을 막음
            const formData = new FormData(form); // 폼 데이터를 FormData 객체로 변환
            const formObject = Object.fromEntries(formData); // FormData 객체를 일반 객체로 변환

            submitButton.disabled = true; // 로그인 버튼 비활성화

            // 로그인 요청을 서버로 보냄
            fetch('http://127.0.0.1:8600/api/users/login', {
                method: 'POST',
                credentials: 'include', // 쿠키를 포함하여 요청
                headers: {
                    'Content-Type': 'application/json' // 요청 헤더 설정
                },
                body: JSON.stringify(formObject) // 폼 데이터를 JSON 문자열로 변환하여 요청 본문에 포함
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => {
                        throw new Error(err.message || '사용자 정보가 올바르지 않습니다.');
                    });
                }
                return response.json(); // 응답을 JSON으로 변환
            })
            .then(data => {
                console.log('로그인 성공!');
                helpLogin.classList.add('hide'); // 로그인 실패 메시지 숨김
                showToast('로그인 되었습니다.'); // 성공 메시지 표시
                setTimeout(() => {
                    window.location.href = '/posts'; // 일정 시간 후에 게시글 페이지로 이동
                }, 1000);
            })
            .catch(error => {
                console.error('Login failed:', error); // 에러 로그 출력
                helpLogin.classList.remove('hide'); // 로그인 실패 메시지 표시
                helpLogin.textContent = `* ${error.message || "입력하신 계정 정보가 정확하지 않습니다"}`; // 에러 메시지 설정
                helpLogin.style.color = "red"; // 에러 메시지 색상 설정
            })
            .finally(() => {
                submitButton.disabled = false; // 로그인 버튼 다시 활성화
            });
        }

        // 폼 제출 이벤트 리스너 등록
        form.addEventListener('submit', handleFormSubmit);
    }
});
