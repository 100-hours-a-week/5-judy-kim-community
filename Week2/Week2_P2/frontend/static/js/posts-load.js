// frontend/static/js/post-load.js

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname === '/posts') {
        fetch('http://127.0.0.1:8000/api/posts/')
        .then(response => {
            if (!response.ok) {
                throw new Error('서버에서 문제가 발생했습니다: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            const postsContainer = document.getElementById('posts-container');
            let postsHTML = '';
    
            // 각 게시물 데이터에 대한 HTML 생성
            data.forEach(post => {
                const postDate = new Date(post.createdAt).toLocaleDateString('ko-KR');
                const postTime = new Date(post.createdAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    
                postsHTML += `
                    <a href="/posts/${post.id}" class="post-link">
                    <article class="post-card">
                        <div class="title"><h3>${post.title}</h3></div>
                        <div class="subtitle">
                        <div class="subtitle-numbers">
                            <p>좋아요 ${post.likes}</p>
                            <p>댓글 ${post.comments}</p>
                            <p>조회수 ${post.views}</p>
                        </div>
                        <div class="subtitle-date">
                            <p>${postDate}</p>
                            <p>${postTime}</p>
                        </div>
                        </div>
                        <hr class="card-line">
                        <div class="profile">
                            <div class="user-image" style="background-image:url('${post.userImagePath}');" alt="Profile Image"></div>
                            <div class="user-name">
                            <h4>${post.author}</h4>
                        </div>
                    </article>
                    </a>`;
            });
            if (!postsContainer) {
                console.error('Cannot find the posts-container element');
            }
            postsContainer.innerHTML = postsHTML;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    
    
    if (window.location.href.includes('/posts')  && !isNaN(parseInt(window.location.pathname.split('/').pop()))) {
        const postId = window.location.pathname.split('/').pop(); // post id 가져오기
        console.log("Extracted postId:", postId);
        console.log("Current URL:", window.location.pathname);

        fetch(`http://127.0.0.1:8000/api/posts/${postId}`)
        .then(response => response.json())
        .then(post => {
            const postDate = new Date(post.createdAt).toLocaleDateString('ko-KR');
            const postTime = new Date(post.createdAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    
            // post title
            const titleElement = document.getElementById('title');
            if (titleElement) {
                titleElement.innerHTML = `<h3>${post.title}</h3>`;
            }
    
            // user profile image
            const userImageElement = document.getElementById('user-image');
            if (userImageElement) {
                userImageElement.style.backgroundImage = `url('${post.userImagePath}')`;
            }
    
            // user name
            const userNameElement = document.getElementById('user-name');
            if (userNameElement) {
                userNameElement.innerHTML = `<h4>${post.author}</h4>`;
            }
    
            // date and time
            const dateElement = document.getElementById('date');
            if (dateElement) {
                dateElement.innerHTML = `<p>${postDate}</p><p>${postTime}</p>`;
            }
            
            // post content
            const postImageElement = document.getElementById('post-image');
            if (postImageElement) {
                postImageElement.innerHTML = `<img src="${post.postImagePath}" alt="이미지가 없습니다.">`;
            }
    
            // post content
            const contentElement = document.getElementById('content');
            if (contentElement) {
                contentElement.innerHTML = `<p>${post.content}</p>`;
            }
    
            // Update likes and comments count
            const likesElement = document.getElementById('views');
            if (likesElement) {
                likesElement.innerHTML = `${post.views}`;
            }
    
            const commentsElement = document.getElementById('comments');
            if (commentsElement) {
                commentsElement.innerHTML = `${post.comments}`;
            }
    
            // Load comments for the post
            window.loadComments(postId);
        })
        .catch(error => {
            console.error('Error:', error);
        });
        
        // 모달을 클릭한 외부를 클릭했을 때 모달을 닫는 이벤트
        window.addEventListener("click", function(event) {
            document.querySelectorAll('.command-delete-modal').forEach(function(modal) {
                if (event.target === modal) {
                    modal.classList.remove("show");
                }
            });
        });      
    }

    /*  <p>
        무엇을 얘기할까요? 아무말이라면, 삶은 항상 놀라운 모험이라고 생각합니다. 우리는 매일 새 로운 경험을 하고 배우며 성장합니다. 때로는 어려움과 도전이 있지만, 그것들이 우리를 더 강 하고 지혜롭게 만듭니다. 또한 우리는 주변의 사람들과 연결되며 사랑과 지지를 받습니다. 그래 서 우리의 삶은 소중하고 의미가 있습니다.
        자연도 아름다운 이야기입니다. 우리 주변의 자연은 끝없는 아름다움과 신비로움을 담고 있습 니다. 산, 바다, 숲, 하늘 등 모든 것이 우리를 놀라게 만들고 감동시킵니다. 자연은 우리의 생명 과 안정을 지키며 우리에게 힘을 주는 곳입니다.
        마지막으로, 지식을 향한 탐구는 항상 흥미로운 여정입니다. 우리는 끝없는 지식의 바다에서 배 우고 발견할 수 있으며, 이것이 우리를 더 깊이 이해하고 세상을 더 넓게 보게 해줍니다.
        그런 의미에서, 삶은 놀라움과 경이로움으로 가득 차 있습니다. 새로운 경험을 즐기고 항상 앞 으로 나아가는 것이 중요하다고 생각합니다.
        </p>
    */

        window.loadComments = function(postId) {
        fetch(`http://127.0.0.1:8000/api/comments/${postId}/comments`)
        .then(response => response.json())
        .then(comments => {
            const commentsContainer = document.getElementById('comments-container');
            commentsContainer.innerHTML = ''; // Clear previous comments
            comments.forEach((comment) => {
                const commentDate = new Date(comment.createdAt).toLocaleDateString('ko-KR');
                const commentTime = new Date(comment.createdAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
                const commentHTML = `
                    <article id="comment-${comment.id}" class="command-parent">
                        <div class="command-set">
                            <div class="command-subtitle">
                                <div class="command-profile">
                                    <div class="user-image" style="background-image: url('${comment.imagePath}');"></div>
                                    <div class="subtitle">
                                        <div class="user-name">
                                            <h4>${comment.author}</h4>
                                        </div>
                                        <div class="date">
                                            <p>${commentDate}</p>
                                            <p>${commentTime}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="command-button-parent">
                                    <!-- 댓글 수정 컨텐츠 -->
                                    <button class="button-edit" data-comment-id="${comment.id}">수정</button>
                                    <!-- 댓글 삭제 컨텐츠, 모달 -->
                                    <div id="command-button-modal-${comment.id}" class="delete-modal command-delete-modal">
                                        <div class="modal-content">
                                            <p class="text1">댓글을 삭제하시겠습니까?</p>
                                            <p class="text2">삭제한 내용은 복구 할 수 없습니다.</p>
                                            <div class="space"></div>
                                            <div class="modal-actions">
                                                <button id="command-cancel" class="modal-button command-cancel">취소</button>
                                                <button id="command-delete" class="modal-button command-delete">확인</button>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 모달 열기 버튼 -->
                                    <button id="command-button-delete-${comment.id}" class="button-delete command-button-delete" data-modal-id="${comment.id}">삭제</button>
                                </div>
                            </div>
                            <div class="edit-form" style="display: none;">
                                <textarea class="edit-input">${comment.content}</textarea>
                                <button class="button-save" data-comment-id="${comment.id}">저장</button>
                            </div>
                            <div class="comment-content command-text"><p>${comment.content}</p></div>
                        </div>
                    </article>
                `;
                commentsContainer.innerHTML += commentHTML;
            });

            attachEditContentsEventListeners();
            attachModalEventListeners();
        })
        .catch(error => console.error('Error loading comments:', error));
    }     

    // 댓글 수정 기능
    function attachEditContentsEventListeners() {
        document.querySelectorAll('.button-edit').forEach(button => {
            button.addEventListener('click', function() {
                const commentId = button.dataset.commentId;
                const commentElement = document.getElementById(`comment-${commentId}`);
                commentElement.querySelector('.edit-form').style.display = 'flex';
                commentElement.querySelector('.button-edit').style.display = 'none';
                commentElement.querySelector('.comment-content').style.display = 'none';
            });
        });
    
        document.querySelectorAll('.button-save').forEach(button => {
            button.addEventListener('click', function() {
                const commentId = button.dataset.commentId;
                const commentElement = document.getElementById(`comment-${commentId}`);
                const newText = commentElement.querySelector('.edit-input').value;

                fetch(`http://127.0.0.1:8000/api/comments/${commentId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ content: newText })
                })
                .then(response => response.json())
                .then(data => {
                    commentElement.querySelector('.comment-content p').innerText = newText;
                    commentElement.querySelector('.edit-form').style.display = 'none';
                    commentElement.querySelector('.button-edit').style.display = 'block';
                    commentElement.querySelector('.comment-content').style.display = 'flex';
                })
                .catch(error => console.error('Error updating comment:', error));
            });
        });
    }

    
    // 모달 동작 리스너 추가
    function attachModalEventListeners() {
        let commentId;
        document.querySelectorAll('.button-delete').forEach(button => {
            button.addEventListener('click', function() {
                commentId = button.dataset.modalId;
                console.log(commentId);
                const modal = document.getElementById(`command-button-modal-${commentId}`);
                modal.classList.add('show');
            });
        });
    
        document.querySelectorAll('.command-cancel').forEach(button => {
            button.addEventListener('click', function() {
                const modal = button.closest('.delete-modal');
                modal.classList.remove('show');
            });
        });
    
        document.querySelectorAll('.command-delete').forEach(button => {
            button.addEventListener('click', function() {
                console.log(commentId);
                deleteComments(commentId);
                const modal = button.closest('.delete-modal');
                modal.classList.remove('show');
            });
        });
    }
    
    function deleteComments(commentId) {
        console.log(commentId);
        fetch(`http://127.0.0.1:8000/api/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('서버에서 문제가 발생했습니다: ' + response.status);
            }
            return response.json();
        })
        .then(() => {
            const deletedComment = document.getElementById(`comment-${commentId}`);
            if (deletedComment) {
                deletedComment.remove();
                console.log('댓글이 삭제되었습니다.');
            } else {
                console.log('댓글이 없습니다.');
            }
        })
        .catch(error => {
            console.error('댓글 삭제 실패:', error);
        });
    }
});

