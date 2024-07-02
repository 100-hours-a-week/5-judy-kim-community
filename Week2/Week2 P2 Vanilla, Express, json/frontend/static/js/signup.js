document.addEventListener('DOMContentLoaded', (event) => {    
    const form = document.getElementById('signupForm');
    const submitButton = document.getElementById('signupButton');

    form.addEventListener('submit', function(e) {
        e.preventDefault();  // 폼 제출 막깅..

        const formData = new FormData(form);

        // 버튼 비활성화
        submitButton.disabled = true;

        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });
        console.log([...formData]);

        fetch('http://127.0.0.1:8200/api/users/signup', {
            method: 'POST',
            cache: 'no-cache',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();  // json 파싱
        })
        .then(data => {
            console.log(data.message);
            showToast('회원가입이 완료되었습니다!');
            setTimeout(() => {
                window.location.href = '/login';
            }, 1000);
        })
        .catch(error => {
            console.error('Error fetching:', error);
            showToast(`Signup failed: ${error.message || 'Server error'}`);
        })
        .finally(() => {
            // 요청이 완료되면 버튼을 다시 활성화
            // submitButton.disabled = false;
        });
    });
});
