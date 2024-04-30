document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('postForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        fetch(`http://127.0.0.1:8000/api/posts/write`, {
            method: 'POST',
            body: formData,
            credentials: 'same-origin'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('서버에서 문제가 발생했습니다. 상태 코드: ' + response.status);
            }
            return response.json();  // 상태 코드가 200-299인 경우에만 JSON 파싱 시도
        })
        .then(data => {
            if (data.success) {
                alert('게시글이 성공적으로 등록되었습니다!');
                window.location.href = '/posts';
            } else {
                throw new Error(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('게시글 등록에 실패했습니다. 에러: ' + error);
        });

    });
});
