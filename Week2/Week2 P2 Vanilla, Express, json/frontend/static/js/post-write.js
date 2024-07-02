document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('postForm');
    const submitButton = document.getElementById('postButton');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(form);

        // 버튼 비활성화
        submitButton.disabled = true;

        fetch(`http://127.0.0.1:8200/api/posts/write`, {
            method: 'POST',
            credentials: 'include',
            body: formData
        })
        .then(response => response.json())  // 응답을 JSON으로 변환
        .then(data => {
            console.log(data.message);
            showToast('게시글이 성공적으로 등록되었습니다!');
            setTimeout(() => {
                window.location.href = `/posts/${data.postId}`;
            }, 1000);
        })
        .catch(error => {
            // 네트워크 에러 또는 응답 처리 중 발생한 오류 처리
            console.error('Error during post submission:', error);
            showToast(`게시글 등록에 실패했습니다. 에러: ${error.message}`);
        })
        .finally(() => {
            // 요청이 완료되면 버튼을 다시 활성화
            // submitButton.disabled = false;
        });
    });
});
