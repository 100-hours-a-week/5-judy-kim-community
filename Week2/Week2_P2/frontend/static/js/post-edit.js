document.addEventListener("DOMContentLoaded", function () {
    const postId = getPostIdFromUrl();

    function getPostIdFromUrl() {
        const segments = window.location.pathname.split('/');
        return segments.pop() || segments.pop();
    }

    if (window.location.pathname.includes('/posts/')) {
        const editButtons = document.querySelectorAll('.button-edit');
        editButtons.forEach(button => {
            button.addEventListener('click', function () {
                window.location.href = `/post-edit/${postId}`;
            });
        });
    }

    function fetchPost(postId) {
        fetch(`http://127.0.0.1:8000/api/posts/${postId}`)
        .then(response => response.json())
        .then(post => {
            document.getElementById('inputTitle').value = post.title;
            document.getElementById('inputContent').value = post.content;
            document.getElementById('current-file-name').textContent = post.postImagePath ? post.postImagePath.split('/').pop() : 'No file uploaded';
        })
        .catch(error => console.error('Error loading post:', error));
    }

    if (window.location.pathname.includes('/post-edit/')) {
        fetchPost(postId);

        const fileInput = document.getElementById('image-file');
        const fileNameDisplay = document.getElementById('current-file-name');
        fileInput.addEventListener('change', function() {
            fileNameDisplay.textContent = this.files[0] ? this.files[0].name : 'No file selected';
        });

        const editForm = document.getElementById('editForm');
        editForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(this);
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }
            fetch(`http://127.0.0.1:8000/api/posts/${postId}/update`, {
                method: 'PUT',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    alert('게시글이 수정되었습니다.');
                    window.location.href = `/posts/${postId}`;
                } else {
                    throw new Error(data.message);
                }
            })
            .catch(error => {
                console.error('Error updating post:', error);
                alert('게시글 수정에 실패하였습니다: ' + error.message);
            });

        });
    }
});