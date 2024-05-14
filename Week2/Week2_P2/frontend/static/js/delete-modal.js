document.addEventListener("DOMContentLoaded", function () {
    // elements
    var modalBtn = document.getElementById("edit-button-delete");
    var modal = document.getElementById("edit-button-modal");
    var cancelBtn = document.getElementById("edit-cancel");
    var deleteBtn = document.getElementById("edit-delete");
    
    // functions
    function toggleModal(event) {
        event.preventDefault();
        modal.classList.toggle("show");
    }

    function deleteUser() {
        fetch(`http://127.0.0.1:8000/api/users`, {
            method: 'DELETE',
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('유저 삭제 실패: ' + response.status);
            }
            return response.json();
        })
        .then(() => {
            console.log('유저가 삭제되었습니다.');
            logoutUser(); // 로그아웃 함수 호출
        })
        .catch(error => {
            console.error('오류 발생:', error);
        });
    }

    function logoutUser() {
        fetch('http://127.0.0.1:8000/api/users/logout', {
            method: 'POST',
            credentials: 'include',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('로그아웃 실패: ' + response.status);
            }
            return response.json();
        })
        .then(() => {
            console.log('로그아웃 되었습니다.');
            window.location.href = '/login'; // 로그인 페이지로 리다이렉트
        })
        .catch(error => {
            console.error('로그아웃 처리 중 오류:', error);
        });
    }
  
    // events
    modalBtn.addEventListener("click", toggleModal);
    cancelBtn.addEventListener("click", toggleModal);
    deleteBtn.addEventListener("click", toggleModal);

    deleteBtn.addEventListener("click", function(event) {
        event.preventDefault();
        toggleModal();
        deleteUser(); // 회원 탈퇴 후 로그아웃
    });
    
});
