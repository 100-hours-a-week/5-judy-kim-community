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
        if (event.target === modal) {
            toggleModal();
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.command-button-delete').forEach(function (modalBtn, index) {
        var modal = document.getElementById(`command-button-modal-${index + 1}`);
        
        modalBtn.addEventListener("click", function () {
            modal.classList.toggle("show");
        });

        modal.querySelector('.command-cancel').addEventListener("click", function () {
            modal.classList.remove("show");
        });

        modal.querySelector('.command-delete').addEventListener("click", function () {
            modal.classList.remove("show");
        });
    });

    window.addEventListener("click", function (event) {
        document.querySelectorAll('.command-delete-modal').forEach(function (modal) {
            if (event.target === modal) {
                modal.classList.remove("show");
            }
        });
    });
});


