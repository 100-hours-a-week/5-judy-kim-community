document.addEventListener("DOMContentLoaded", function () {
    const postId = getPostIdFromUrl();

    // URL에서 포스트 ID를 추출하는 함수
    function getPostIdFromUrl() {
        const segments = window.location.pathname.split('/');
        return segments.pop() || segments.pop();
    }

    // 현재 페이지가 '/posts/'를 포함하는지 확인하고 수정 버튼을 설정
    if (window.location.pathname.includes('/posts/')) {
        setupEditButtons();
    }

    // 현재 페이지가 '/post-edit/'를 포함하는지 확인하고 포스트 데이터를 불러와서 폼을 설정
    if (window.location.pathname.includes('/post-edit/')) {
        fetchPost(postId);
        setupFileInput();
        setupEditForm();
    }

    // 수정 버튼을 설정하는 함수
    function setupEditButtons() {
        const editButtons = document.querySelectorAll('.button-edit');
        editButtons.forEach(button => {
            button.addEventListener('click', function () {
                window.location.href = `/post-edit/${postId}`;
            });
        });
    }

    // 포스트 데이터를 불러오는 함수
    function fetchPost(postId) {
        fetch(`http://127.0.0.1:8600/api/posts/${postId}`)
            .then(response => response.json())
            .then(post => {
                document.getElementById('inputTitle').value = post.title;
                document.getElementById('inputContent').value = post.content;
                document.getElementById('current-file-name').textContent = post.postImagePath ? post.postImagePath.split('/').pop() : 'No file uploaded';
            })
            .catch(error => console.error('Error loading post:', error));
    }

    // 파일 입력 요소를 설정하는 함수
    function setupFileInput() {
        const fileInput = document.getElementById('image-file');
        const fileNameDisplay = document.getElementById('current-file-name');
        fileInput.addEventListener('change', function() {
            fileNameDisplay.textContent = this.files[0] ? this.files[0].name : 'No file selected';
        });
    }

    // 수정 폼을 설정하는 함수
    function setupEditForm() {
        const editForm = document.getElementById('editForm');
        const submitButton = document.getElementById('postButton');

        editForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(this);

            // 버튼 비활성화
            submitButton.disabled = true;

            // 포스트 업데이트 API 호출
            fetch(`http://127.0.0.1:8600/api/posts/${postId}/update`, {
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
                    showToast('게시글이 수정되었습니다.');
                    setTimeout(() => {
                        window.location.href = `/posts/${postId}`;
                    }, 1000);
                } else {
                    throw new Error(data.message);
                }
            })
            .catch(error => {
                console.error('Error updating post:', error);
                showToast('게시글 수정에 실패하였습니다: ' + error.message);
            })
            .finally(() => {
                // 요청이 완료되면 버튼을 다시 활성화
                submitButton.disabled = false;
            });
        });
    }
});
