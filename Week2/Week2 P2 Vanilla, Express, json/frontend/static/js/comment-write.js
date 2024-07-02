document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('commentForm');
    const submitButton = document.getElementById('commentWriteButton');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const postId = window.location.pathname.split('/').pop(); 
        const commentTextarea = document.getElementById('comment');

        console.log(formData.get('content'));

        // 버튼 비활성화
        submitButton.disabled = true;
        
        /* console.log("Form Data:", formData);
        for(let key of formData.keys()) {
            console.log(key, formData.get(key));
        }*/

        fetch(`http://127.0.0.1:8200/api/comments/${postId}/comments`, {
            method: 'POST',
            credentials: 'include',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
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
            // submitButton.disabled = false;
        });
    });
});
