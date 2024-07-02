document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('retypePasswordButton');
    
    // 폼 제출 이벤트 리스너 추가
    document.getElementById('edit2Form').addEventListener('submit', function(e) {
        e.preventDefault();  // 폼 제출 막기

        const password = document.getElementById('inputPassword').value;
        
        // 버튼 비활성화
        submitButton.disabled = true;

        // 비밀번호 업데이트 요청
        fetch('http://127.0.0.1:8600/api/users/update2', {
            method: 'PATCH', // HTTP 메소드 수정
            credentials: 'include', // 쿠키를 포함하여 요청
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ password: password }) // 비밀번호를 JSON 형식으로 전송
        })
        .then(response => response.json()) // 응답을 JSON으로 파싱
        .then(data => {
            console.log('Success:', data);
            showToast('비밀번호가 성공적으로 업데이트되었습니다.'); // 성공 메시지 표시
            setTimeout(() => {
                window.location.href = '/posts'; // 1초 후 게시글 페이지로 이동
            }, 1000);
        })
        .catch((error) => {
            console.error('Error:', error);
            showToast('비밀번호 업데이트 중 오류가 발생했습니다.'); // 오류 메시지 표시
        })
        .finally(() => {
            // 요청이 완료되면 버튼을 다시 활성화 (필요 시 주석 해제)
            // submitButton.disabled = false;
        });
    });
});
