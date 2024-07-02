document.addEventListener('DOMContentLoaded', () => {
    // 요소 참조
    const modalBtn = document.getElementById("edit-button-delete"); // 모달 버튼
    const modal = document.getElementById("edit-button-modal"); // 모달 창
    const cancelBtn = document.getElementById("edit-cancel"); // 모달 취소 버튼
    const deleteBtn = document.getElementById("edit-delete"); // 모달 삭제 버튼

    // 모달 창을 토글하는 함수
    function toggleModal() {
        modal.classList.toggle("show");
    }

    // URL에서 포스트 ID를 가져오는 함수
    function getPostIdFromUrl() {
        return window.location.pathname.split('/').pop();
    }

    // 포스트를 삭제하는 함수
    function deletePost() {
        const postId = getPostIdFromUrl();
        fetch(`http://127.0.0.1:8000/api/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('서버에서 문제가 발생했습니다: ' + response.status);
            }
            return response.json();
        })
        .then(() => {
            console.log('게시글이 삭제되었습니다.');
            showToast('게시글이 삭제되었습니다.');
            setTimeout(() => {
                window.location.href = '/posts';
            }, 1000);
        })
        .catch(error => {
            console.error('게시글 삭제 실패:', error);
            showToast('게시글 삭제에 실패했습니다. 에러: ' + error.message);
        });
    }

    // 댓글을 삭제하는 함수
    function deleteComments() {
        const postId = getPostIdFromUrl();
        fetch(`http://127.0.0.1:8000/api/comments/${postId}/comments`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('서버에서 문제가 발생했습니다: ' + response.status);
            }
            return response.json();
        })
        .then(() => {
            console.log('모든 댓글이 삭제되었습니다.');
        })
        .catch(error => {
            console.error('댓글 삭제 실패:', error);
        });
    }

    // 삭제 핸들러 함수, 포스트와 댓글을 삭제
    function handleDelete() {
        toggleModal(); // 모달 창 닫기
        deletePost(); // 포스트 삭제
        deleteComments(); // 댓글 삭제
    }

    // 이벤트 리스너 등록
    modalBtn.addEventListener("click", toggleModal); // 모달 버튼 클릭 시 모달 창 토글
    cancelBtn.addEventListener("click", toggleModal); // 취소 버튼 클릭 시 모달 창 토글
    deleteBtn.addEventListener("click", handleDelete); // 삭제 버튼 클릭 시 삭제 핸들러 호출

    // 모달 외부를 클릭했을 때 모달 창을 닫는 이벤트
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            toggleModal();
        }
    });
});
