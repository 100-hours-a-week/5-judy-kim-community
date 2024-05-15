document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('edit2Form').addEventListener('submit', function(e) {
        e.preventDefault();

        const password = document.getElementById('inputPassword').value;
        
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
            alert('비밀번호가 성공적으로 업데이트되었습니다.');
            window.location.href = '/posts';
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('비밀번호 업데이트 중 오류가 발생했습니다.');
        });
    });
});
