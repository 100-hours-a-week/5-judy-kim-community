document.addEventListener("DOMContentLoaded", function () {
    // 요소들
    const modalBtn = document.getElementById("edit-button-delete"); // 삭제 버튼
    const modal = document.getElementById("edit-button-modal"); // 모달 창
    const cancelBtn = document.getElementById("edit-cancel"); // 취소 버튼
    const deleteBtn = document.getElementById("edit-delete"); // 확인(삭제) 버튼
    
    // 함수들
    // 모달 창 토글 함수
    function toggleModal(event) {
        event.preventDefault();
        modal.classList.toggle("show");
    }

    // 에러 처리 함수
    function handleError(response, errorMessage) {
        if (!response.ok) {
            throw new Error(`${errorMessage}: ${response.status}`);
        }
        return response.json();
    }

    // 사용자 삭제 함수
    function deleteUser() {
        fetch(`http://127.0.0.1:8600/api/users`, {
            method: 'DELETE',
            credentials: 'include'
        })
        .then(response => handleError(response, '유저 삭제 실패')) // 에러 처리
        .then(() => {
            console.log('유저가 삭제되었습니다.');
            logoutUser(); // 로그아웃 함수 호출
        })
        .catch(error => {
            console.error('오류 발생:', error); // 오류 메시지 출력
        });
    }

    // 로그아웃 함수
    function logoutUser() {
        fetch('http://127.0.0.1:8600/api/users/logout', {
            method: 'POST',
            credentials: 'include',
        })
        .then(response => handleError(response, '로그아웃 실패')) // 에러 처리
        .then(() => {
            console.log('로그아웃 되었습니다.');
            showToast('회원 탈퇴가 완료되었습니다.'); // 알림 메시지 표시
            setTimeout(() => {
                window.location.href = '/login'; // 로그인 페이지로 리디렉션
            }, 1000);
        })
        .catch(error => {
            console.error('로그아웃 처리 중 오류:', error); // 오류 메시지 출력
        });
    }
  
    // 이벤트 리스너들
    modalBtn.addEventListener("click", toggleModal); // 삭제 버튼 클릭 시 모달 창 토글
    cancelBtn.addEventListener("click", toggleModal); // 취소 버튼 클릭 시 모달 창 닫기
    deleteBtn.addEventListener("click", function(event) {
        event.preventDefault();
        toggleModal(event); // 모달 창 닫기
        deleteUser(); // 사용자 삭제
    });
});
