document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('retypePasswordButton');
    
    document.getElementById('edit2Form').addEventListener('submit', function(e) {
        e.preventDefault();

        const password = document.getElementById('inputPassword').value;
        
        // 버튼 비활성화
        submitButton.disabled = true;

        fetch('http://127.0.0.1:8000/api/users/update2', {
            method: 'PATCH', // HTTP 메소드 수정
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ password: password })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            showToast('비밀번호가 성공적으로 업데이트되었습니다.');
            setTimeout(() => {
                window.location.href = '/posts';
            }, 1000);
        })
        .catch((error) => {
            console.error('Error:', error);
            showToast('비밀번호 업데이트 중 오류가 발생했습니다.');
        })
        .finally(() => {
            // 요청이 완료되면 버튼을 다시 활성화
            // submitButton.disabled = false;
        });
    });
});
