document.addEventListener('DOMContentLoaded', function() {
    var logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault();
            fetch('http://127.0.0.1:8000/api/users/logout', {
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
                    window.location.href = '/login';
                }
            }).catch(error => {
                console.error('로그아웃 중 에러 발생:', error);
            });
        });
    } else {
        console.error('로그아웃 링크가 존재하지 않습니다.');
    }
});
