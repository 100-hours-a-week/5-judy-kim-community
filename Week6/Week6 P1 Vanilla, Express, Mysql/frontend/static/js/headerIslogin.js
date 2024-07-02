document.addEventListener('DOMContentLoaded', function() {
    const buttonWrite = document.querySelector('.button-write-parent .button-write'); // 글쓰기 버튼 요소
    const commentWrite = document.getElementById('commentWriteButton'); // 댓글 작성 버튼 요소
    const commentInput = document.getElementById('comment'); // 댓글 입력 필드 요소

    // 서버에서 로그인 상태를 확인하는 함수 호출
    checkLoginStatus()
        .then(isLoggedIn => {
            updateDropdownMenu(isLoggedIn); // 로그인 상태에 따라 드롭다운 메뉴 업데이트
            if (!isLoggedIn) {
                // 로그인되지 않은 상태인 경우
                if (buttonWrite) buttonWrite.classList.add('disabled'); // 글쓰기 버튼 비활성화
                if (commentWrite) {
                    commentWrite.classList.add('disabled'); // 댓글 작성 버튼 비활성화
                    commentInput.placeholder = "로그인 후 댓글 등록이 가능합니다."; // 댓글 입력 필드에 안내 메시지 설정
                    commentInput.disabled = true; // 댓글 입력 필드 비활성화
                }
            }
        });
});

// 로그인 상태를 확인하는 함수
function checkLoginStatus() {
    return fetch('http://127.0.0.1:8600/api/users/userinfo', {
        method: 'GET',
        credentials: 'include' // 세션 쿠키를 포함하여 요청
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Unauthorized'); // 응답이 실패하면 에러 발생
        }
        return response.json();
    })
    .then(data => true) // 로그인된 상태면 true 반환
    .catch(error => false); // 로그인되지 않은 상태면 false 반환
}

// 드롭다운 메뉴를 업데이트하는 함수
function updateDropdownMenu(isLoggedIn) {
    const dropdownMenu = document.getElementById('dropdownMenu'); // 드롭다운 메뉴 요소
    if (isLoggedIn) {
        // 로그인된 상태
        dropdownMenu.innerHTML = `
            <a href="/profile-edit1">회원정보 수정</a>
            <a href="/profile-edit2">비밀번호 수정</a>
            <a id="logoutLink">로그아웃</a>
        `;
        setupLogoutLink(); // 로그아웃 링크 설정
    } else {
        // 로그인되지 않은 상태
        dropdownMenu.innerHTML = `
            <a href="/login">로그인</a>
        `;
    }
}

// 로그아웃 링크를 설정하는 함수
function setupLogoutLink() {
    const logoutLink = document.getElementById('logoutLink'); // 로그아웃 링크 요소
    if (logoutLink) {
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault(); // 기본 링크 동작을 막음
            fetch('http://127.0.0.1:8600/api/users/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include' // 세션 쿠키를 포함하여 요청
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === '로그아웃 성공') {
                    showToast('로그아웃 되었습니다.'); // 성공 메시지 표시
                    setTimeout(() => {
                        window.location.href = '/login'; // 일정 시간 후에 로그인 페이지로 이동
                    }, 1000);
                }
            })
            .catch(error => {
                console.error('로그아웃 중 에러 발생:', error); // 에러 로그 출력
            });
        });
    }
}
