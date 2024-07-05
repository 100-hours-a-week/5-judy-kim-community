document.addEventListener('DOMContentLoaded', function() {
    // 게시글 작성 폼 요소 참조
    const form = document.getElementById('postForm');
    const submitButton = document.getElementById('postButton');

    // 폼 제출 이벤트 리스너 추가
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // 기본 폼 제출 동작 방지

        // 폼 데이터 객체 생성
        const formData = new FormData(form);

        // 제출 버튼 비활성화 (중복 제출 방지)
        submitButton.disabled = true;

        // 게시글 작성 API 호출
        fetch(`http://127.0.0.1:8600/api/posts/write`, {
            method: 'POST',
            credentials: 'include', // 쿠키를 포함한 요청
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // 응답을 JSON으로 변환
        })
        .then(data => {
            console.log(data.message); // 성공 메시지 로그
            showToast('게시글이 성공적으로 등록되었습니다!'); // 성공 토스트 메시지 표시
            setTimeout(() => {
                window.location.href = `/posts/${data.postId}`; // 1초 후 게시글 상세 페이지로 이동
            }, 1000);
        })
        .catch(error => {
            // 네트워크 에러 또는 응답 처리 중 발생한 오류 처리
            console.error('Error during post submission:', error); // 에러 메시지 로그
            showToast(`게시글 등록에 실패했습니다. 에러: ${error.message}`); // 에러 토스트 메시지 표시
        })
        .finally(() => {
            // 요청이 완료되면 버튼을 다시 활성화
            submitButton.disabled = false;
        });
    });
});

// 모든 검증을 통합하여 게시 버튼 활성화
function updatePostButtonStatus() {
    if (inputWriteValid) {
        activeButton(postButton);
    } else {
        disableButton(postButton);
    }
}

// 버튼 활성화 함수
function activeButton(buttonName){
    buttonName.classList.add("active");
    buttonName.disabled = false;
}

// 버튼 비활성화 함수
function disableButton(buttonName){
    buttonName.classList.remove("active");
    buttonName.disabled = true;
}

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.href.includes('/post-write') || window.location.href.includes('/post-edit')) {
        let inputTitle = document.querySelector('#inputTitle');
        let inputContent = document.querySelector('#inputContent');
        let helpPost = document.querySelector('.helptext.helpPost');

        const postButton = document.querySelector('#postButton');

        let inputWriteValid = false;

        // 모든 검증을 통합하여 게시 버튼 활성화
        function updatePostButtonStatus() {
            if (inputWriteValid) {
                activeButton(postButton);
            } else {
                disableButton(postButton);
            }
        }

        // 게시글 검증 함수
        function validatePost() {
            helpPost.classList.remove('hide');
            const forbiddenWhitespace = '\u3164';

            // 제목 길이 검증
            if (inputTitle.value.trim().length > 26) {
                helpPost.textContent = "* 제목은 26자 이하로 작성해주세요.";
                helpPost.style.color = "red";
                inputWriteValid = false;
            } else if (inputTitle.value.trim() === '' || inputContent.value.trim() === '' || inputTitle.value.includes(forbiddenWhitespace)) {
                helpPost.textContent = "* 제목과 내용을 모두 작성해주세요. (공백 특수문자는 제외됩니다.)";
                helpPost.style.color = "red";
                inputWriteValid = false;
            } else {
                helpPost.textContent = "제목과 내용이 모두 입력되었습니다.";
                helpPost.style.color = "green";
                inputWriteValid = true;
            }
            updatePostButtonStatus();
        }

        // 제목 입력 길이 제한
        inputTitle.addEventListener('input', function() {
            inputTitle.value = inputTitle.value.slice(0, 26);        
        });

        if (window.location.href.includes('/post-write') || window.location.href.includes('/post-edit')) {
            inputTitle.onkeyup = validatePost;
            inputContent.onkeyup = validatePost;
        }
    }
});
