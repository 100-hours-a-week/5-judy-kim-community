document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('nicknameButton');

    document.getElementById('edit1Form').addEventListener('submit', function(e) {
        e.preventDefault();

        const nickname = document.getElementById('inputNickname').value;
        const profileImage2 = document.getElementById('uploadProfileImage2').files[0];

        const formData = new FormData();
        
        // 버튼 비활성화
        submitButton.disabled = true;

        if(nickname)
            formData.append('nickname', nickname);
        if(profileImage2)
            formData.append('profileImage', profileImage2);

        fetch('http://127.0.0.1:8200/api/users/update1', {
            method: 'PATCH', // HTTP 메소드 수정
            credentials: 'include',
            body: formData
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            showToast('유저 정보(닉네임, 사진)가 성공적으로 업데이트되었습니다.');
            setTimeout(() => {
                window.location.href = '/posts';
            }, 1000);
        })
        .catch((error) => {
            console.error('Error:', error);
            showToast('유저 정보 업데이트 중 오류가 발생했습니다.');
        })
        .finally(() => {
            // 요청이 완료되면 버튼을 다시 활성화
            // submitButton.disabled = false;
        });
    });
});
