document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('nicknameButton');

    // 폼 제출 이벤트 리스너 추가
    document.getElementById('edit1Form').addEventListener('submit', function(e) {
        e.preventDefault();  // 폼 제출 막기

        const nickname = document.getElementById('inputNickname').value;
        const profileImage2 = document.getElementById('uploadProfileImage2').files[0];

        const formData = new FormData();
        
        // 버튼 비활성화
        submitButton.disabled = true;

        // 닉네임과 프로필 이미지가 있는 경우 FormData에 추가
        if (nickname)
            formData.append('nickname', nickname);
        if (profileImage2)
            formData.append('profileImage', profileImage2);

        // 유저 정보 업데이트 요청
        fetch('http://127.0.0.1:8600/api/users/update1', {
            method: 'PATCH', // HTTP 메소드 수정
            credentials: 'include', // 쿠키를 포함하여 요청
            body: formData // FormData 전송
        })
        .then(response => response.json()) // 응답을 JSON으로 파싱
        .then(data => {
            console.log('Success:', data);
            showToast('유저 정보(닉네임, 사진)가 성공적으로 업데이트되었습니다.'); // 성공 메시지 표시
            setTimeout(() => {
                window.location.href = '/posts'; // 1초 후 게시글 페이지로 이동
            }, 1000);
        })
        .catch((error) => {
            console.error('Error:', error);
            showToast('유저 정보 업데이트 중 오류가 발생했습니다.'); // 오류 메시지 표시
        })
        .finally(() => {
            // 요청이 완료되면 버튼을 다시 활성화 (필요 시 주석 해제)
            // submitButton.disabled = false;
        });
    });
});
