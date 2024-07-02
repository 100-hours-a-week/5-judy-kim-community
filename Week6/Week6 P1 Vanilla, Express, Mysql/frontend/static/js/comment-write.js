document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('commentForm');
    const submitButton = document.getElementById('commentWriteButton');
    const commentTextarea = document.getElementById('comment');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const postId = window.location.pathname.split('/').pop(); 

        console.log(formData.get('content'));

        // 버튼 비활성화
        submitButton.disabled = true;

        fetch(`http://127.0.0.1:8600/api/comments/${postId}/comments`, {
            method: 'POST',
            credentials: 'include',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Comment posted successfully:", data);
            commentTextarea.value = '';
            window.loadComments(postId);
        })
        .catch(error => {
            console.error("Error posting comment:", error);
        })
        .finally(() => {
            // 요청이 완료되면 버튼을 다시 활성화
            submitButton.disabled = false;
        });
    });
});
