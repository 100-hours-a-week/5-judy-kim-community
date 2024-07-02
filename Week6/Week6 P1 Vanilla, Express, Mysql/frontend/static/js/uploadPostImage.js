document.addEventListener('DOMContentLoaded', (event) => {    

    document.getElementById('image-file').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            // 파일 이름을 p 태그에 표시
            const pTag = document.querySelector('.image-file-parents p');
            pTag.textContent = file.name;
        }
    });
});