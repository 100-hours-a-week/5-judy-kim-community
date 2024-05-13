document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('commentForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const postId = window.location.pathname.split('/').pop(); 
        console.log("Extracted postId:", postId);
        console.log("Current URL:", window.location.pathname);

        console.log(formData.get('content'));
        
        /* console.log("Form Data:", formData);
        for(let key of formData.keys()) {
            console.log(key, formData.get(key));
        }*/

        fetch(`http://127.0.0.1:8000/api/comments/${postId}/comments`, {
            method: 'POST',
            credentials: 'include',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("Comment posted successfully:", data);
            window.loadComments(postId);
        })
        .catch(error => {
            console.error("Error posting comment:", error);
        });


    });
});
