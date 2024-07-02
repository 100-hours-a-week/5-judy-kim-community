// function setupModalEventListeners() {
document.addEventListener('DOMContentLoaded', () => {
    // elements
    var modalBtn = document.getElementById("edit-button-delete");
    var modal = document.getElementById("edit-button-modal");
    var cancelBtn = document.getElementById("edit-cancel");
    var deleteBtn = document.getElementById("edit-delete");
  
    // functions
    function toggleModal() {
        modal.classList.toggle("show");
    }

    function deletePost() {
        const postId = window.location.pathname.split('/').pop(); // post id 가져오기
        fetch(`http://127.0.0.1:8200/api/posts/${postId}`, {
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
        .then(data => {
            console.log('게시글이 삭제되었습니다.');
            showToast('게시글이 삭제되었습니다.');  
            setTimeout(() => {
                window.location.href = '/posts';
            }, 1000);
        })
        .catch(error => {
            console.error('게시글 삭제 실패:', error);
        });
    }

    function deleteComments() {
        const postId = window.location.pathname.split('/').pop(); // post id 가져오기
        fetch(`http://127.0.0.1:8200/api/comments/${postId}/comments`, {
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
        .then(data => {
            console.log('모든 댓글이 삭제되었습니다.');
        })
        .catch(error => {
            console.error('댓글 삭제 실패:', error);
        });
    }
  
    // events
    modalBtn.addEventListener("click", toggleModal);
    cancelBtn.addEventListener("click", toggleModal);
    deleteBtn.addEventListener("click", toggleModal);
    
    deleteBtn.addEventListener("click", function() {
        toggleModal();
        deletePost();
        deleteComments();
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            toggleModal();
        }
    });
});

// Call the function when DOM is fully loaded
/*
document.addEventListener("DOMContentLoaded", function () {
    setupModalEventListeners();
});*/