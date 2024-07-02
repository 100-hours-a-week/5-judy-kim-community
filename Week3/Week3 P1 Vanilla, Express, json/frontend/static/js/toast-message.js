function showToast(message) {
    var toast = document.getElementById("toast");
    toast.innerHTML = `<span class="toast-icon">🔔</span>${message}`;
    toast.className = "show";
    setTimeout(function() {
        toast.className = toast.className.replace("show", "");
    }, 3000);
}