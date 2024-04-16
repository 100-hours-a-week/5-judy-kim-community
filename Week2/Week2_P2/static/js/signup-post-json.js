function validateForm(event) {
    const passwordInput = document.getElementsByName('password')[0];
    const password = passwordInput.value;
    if (password.length > 10) {
        // 폼 제출 방지
        event.preventDefault();
        // 사용자에게 알림 표시
        alert('비밀번호는 10자 이내로 입력해주세요.');
        // 비밀번호 입력 필드에 포커스
        passwordInput.focus();
    }
}