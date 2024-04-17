document.addEventListener('DOMContentLoaded', function() {
    const uploadProfileImage = document.getElementById('uploadProfileImage');
    if (uploadProfileImage) {
        uploadProfileImage.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    var profileImageDiv = document.getElementById('inputProfileImage');
                    profileImageDiv.style.backgroundImage = 'url(' + e.target.result + ')';
                };
                reader.readAsDataURL(this.files[0]);
            }
        });
    } else {
        console.error("이미지 파일을 찾을 수 없습니다.");
    }
});
