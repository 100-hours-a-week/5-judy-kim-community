/*
    <div class="dropdown-content">
        <a href="/profile-edit1">회원정보 수정</a>
        <a href="/profile-edit2">비밀번호 수정</a>
        <a id="logoutLink">로그아웃</a>
    </div>
*/


document.addEventListener('DOMContentLoaded', function() {
    const buttonWrite = document.querySelector('.button-write-parent .button-write');
    const commentWrite = document.getElementById('commentWriteButton');
    const commentInput = document.getElementById('comment');

    // 서버에서 로그인 상태를 확인하는 함수
    fetch('http://127.0.0.1:8200/api/users/userinfo', {
        method: 'GET',
        credentials: 'include' // 세션 쿠키를 포함하여 요청
    })
    .then(response => {
        if (!response.ok) {
            console.log("로그인되지않음");
            throw new Error('Unauthorized');
        }
        return response.json();
    })
    .then(data => {
        updateDropdownMenu(true);
    })
    .catch(error => {
        updateDropdownMenu(false);
        if(buttonWrite)
            buttonWrite.classList.add('disabled');
        if(commentWrite){
            commentWrite.classList.add('disabled');
            commentInput.placeholder = "로그인 후 댓글 등록이 가능합니다."
            commentInput.disabled = true;
        }
    });
});

function updateDropdownMenu(isLoggedIn) {
    const dropdownMenu = document.getElementById('dropdownMenu');
    if (isLoggedIn) {
        // 로그인된 상태
        dropdownMenu.innerHTML = `
            <a href="/profile-edit1">회원정보 수정</a>
            <a href="/profile-edit2">비밀번호 수정</a>
            <a id="logoutLink">로그아웃</a>
        `;
        document.getElementById('logoutLink').addEventListener('click', function(event) {
            // 로그아웃 처리
            event.preventDefault();
            fetch('http://127.0.0.1:8200/api/users/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }).then(response => {
                return response.json();
            }).then(data => {
                console.log(data);
                if (data.message === '로그아웃 성공') {
                    showToast('로그아웃 되었습니다.');
                    setTimeout(() => {
                        window.location.href = '/login';
                    }, 1000);
                }
            }).catch(error => {
                console.error('로그아웃 중 에러 발생:', error);
            });
        });
    } else {
        // 로그인되지 않은 상태
        dropdownMenu.innerHTML = `
            <a href="/login">로그인</a>
        `;
    }
}