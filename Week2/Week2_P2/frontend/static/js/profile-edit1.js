
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('edit1Form').addEventListener('submit', function(e) {
        e.preventDefault();

        const nickname = document.getElementById('inputNickname').value;

        fetch('http://127.0.0.1:8000/api/users/update', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ nickname: nickname }) // 변경할 닉네임 데이터
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('닉네임이 성공적으로 업데이트되었습니다.');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('닉네임 업데이트 중 오류가 발생했습니다.');
        });
    });
})
