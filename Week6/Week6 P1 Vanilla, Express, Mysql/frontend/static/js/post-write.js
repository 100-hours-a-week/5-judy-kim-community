document.addEventListener('DOMContentLoaded', function() {
    // 게시글 작성 폼 요소 참조
    const form = document.getElementById('postForm');
    const submitButton = document.getElementById('postButton');

    // 폼 제출 이벤트 리스너 추가
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // 기본 폼 제출 동작 방지

        // 폼 데이터 객체 생성
        const formData = new FormData(form);

        // 제출 버튼 비활성화 (중복 제출 방지)
        submitButton.disabled = true;

        // 게시글 작성 API 호출
        fetch(`http://127.0.0.1:8600/api/posts/write`, {
            method: 'POST',
            credentials: 'include', // 쿠키를 포함한 요청
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // 응답을 JSON으로 변환
        })
        .then(data => {
            console.log(data.message); // 성공 메시지 로그
            showToast('게시글이 성공적으로 등록되었습니다!'); // 성공 토스트 메시지 표시
            setTimeout(() => {
                window.location.href = `/posts/${data.postId}`; // 1초 후 게시글 상세 페이지로 이동
            }, 1000);
        })
        .catch(error => {
            // 네트워크 에러 또는 응답 처리 중 발생한 오류 처리
            console.error('Error during post submission:', error); // 에러 메시지 로그
            showToast(`게시글 등록에 실패했습니다. 에러: ${error.message}`); // 에러 토스트 메시지 표시
        })
        .finally(() => {
            // 요청이 완료되면 버튼을 다시 활성화
            submitButton.disabled = false;
        });
    });
});
