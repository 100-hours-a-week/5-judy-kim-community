document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('postForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        fetch(`http://127.0.0.1:8000/api/posts/write`, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())  // 응답을 JSON으로 변환
        .then(data => {
            console.log(data.message);
            alert('게시글이 성공적으로 등록되었습니다!');
            window.location.href = '/posts';  // 성공 시 페이지 리디렉션
        })
        .catch(error => {
            // 네트워크 에러 또는 응답 처리 중 발생한 오류 처리
            console.error('Error during post submission:', error);
            alert(`게시글 등록에 실패했습니다. 에러: ${error.message}`);
        });
    });
});
