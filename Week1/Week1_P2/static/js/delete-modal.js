document.addEventListener("DOMContentLoaded", function () {
    // elements
    var modalBtn = document.getElementById("edit-button-delete");
    var modal = document.getElementById("edit-button-modal");
    var cancelBtn = document.getElementById("edit-cancel");
    var deleteBtn = document.getElementById("edit-delete");
  
    // functions
    function toggleModal() {
        modal.classList.toggle("show");
    }
  
    // events
    modalBtn.addEventListener("click", toggleModal);
    cancelBtn.addEventListener("click", toggleModal);
    deleteBtn.addEventListener("click", toggleModal);
  
    window.addEventListener("click", function (event) {
        // 모달의 검은색 배경 부분이 클릭된 경우 닫히도록 하는 코드
        if (event.target === modal) {
            toggleModal();
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    // elements
    var modalBtn = document.getElementById("command-button-delete");
    var modal = document.getElementById("command-button-modal");
    var cancelBtn = document.getElementById("command-cancel");
    var deleteBtn = document.getElementById("command-delete");
  
    // functions
    function toggleModal() {
      modal.classList.toggle("show");
    }
  
    // events
    modalBtn.addEventListener("click", toggleModal);
    cancelBtn.addEventListener("click", toggleModal);
    deleteBtn.addEventListener("click", toggleModal);
  
    window.addEventListener("click", function (event) {
        // 모달의 검은색 배경 부분이 클릭된 경우 닫히도록 하는 코드
        if (event.target === modal) {
            toggleModal();
        }
    });
});