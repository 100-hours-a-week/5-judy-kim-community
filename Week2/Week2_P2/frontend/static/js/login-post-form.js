document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    let helpLogin = document.querySelector('.helptext.login'); // 로그인 실패 메시지를 표시할 요소

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const formObject = Object.fromEntries(formData);

        // FormData 내용 로깅
        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });
        console.log([...formData]);

        fetch('http://127.0.0.1:8000/login', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObject)
        })
        .then(response => response.json().then(data => ({ status: response.status, body: data })))
        .then(obj => {
            if (obj.status === 200) {
                console.log('로그인 성공!');
                helpLogin.classList.add('hide');
                window.location.href = '/posts-dashboard';
            } else {
                throw new Error(obj.body.message || 'Server error');
            }
        })
        .catch(error => {
            console.error('Error fetching:', error);
            console.error(`Login failed: ${error.message}`);
            helpLogin.classList.remove('hide');
            helpLogin.textContent = `* ${error.message || "입력하신 계정 정보가 정확하지 않습니다"}`;
            helpLogin.style.color = "red";
        });
    });
});
