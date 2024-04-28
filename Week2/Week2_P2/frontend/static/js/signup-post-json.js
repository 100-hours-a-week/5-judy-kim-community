/*function submitForm(event) {
    event.preventDefault();  // 이 부분이 폼의 기본 제출 동작을 중단합니다.

    const form = document.getElementById('signupForm');
    const formData = new FormData(form);

    // 폼 데이터 로깅
    formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
    });

    window.alert('알림알림!');  // 서버 응답 메시지를 alert로 보여줍니다.
}*/


document.addEventListener('DOMContentLoaded', (event) => {    
    const form = document.getElementById('signupForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();  // 폼 제출 막깅..

        const formData = new FormData(form);

        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });
        console.log([...formData]);

        fetch('http://127.0.0.1:8000/api/users/signup', {
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
            alert(data.message);  
            window.location.href = '/login';     // front
        })
        .catch(error => {
            console.error('Error fetching:', error);
            alert(`Signup failed: ${error.message || 'Server error'}`);
        });
    });
});
