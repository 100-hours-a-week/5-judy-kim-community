document.addEventListener('DOMContentLoaded', () => {
    // 게시글 목록 페이지인 경우
    if (window.location.pathname === '/posts') {
        // 모든 게시글을 가져오기 위한 API 호출
        fetch('http://127.0.0.1:8600/api/posts')
        .then(response => {
            return response.json(); // JSON 형식으로 변환
        })
        .then(data => {
            const postsContainer = document.getElementById('posts-container');
            let postsHTML = '';

            // 각 게시물 데이터에 대한 HTML 생성
            data.forEach(post => {
                const postDate = new Date(post.createdAt).toLocaleDateString('ko-KR');
                const postTime = new Date(post.createdAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });

                let authorNameHTML = `<h4>${post.author}</h4>`;
                if (post.authorId === 1) {
                    authorNameHTML = `<h4 style="color: #95bfff;">${post.author} (개발자)</h4>`;
                }
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
                        <div class="user-name">${authorNameHTML}</div>
                    </div>
                </article>
                </a>`;
            });

            if (!postsContainer) {
                console.error('Cannot find the posts-container element');
            }

            // 생성된 HTML을 게시글 컨테이너에 추가
            postsContainer.innerHTML = postsHTML;
        })
        .catch(error => {
            console.error('Error:', error); // 에러 처리
        });
    }
    
    // 특정 게시글 페이지인 경우
    if (window.location.href.includes('/posts') && !isNaN(parseInt(window.location.pathname.split('/').pop()))) {
        const postId = window.location.pathname.split('/').pop(); // URL에서 post ID를 추출
        console.log("Extracted postId:", postId);
        console.log("Current URL:", window.location.pathname);
        
        // 특정 게시글 정보를 가져오기 위한 API 호출
        fetch(`http://127.0.0.1:8600/api/posts/${postId}`)
        .then(response => response.json())
        .then(post => { 
            // 현재 로그인한 사용자의 정보를 가져오기 위한 API 호출
            fetch('http://127.0.0.1:8600/api/users/userinfo', {
                credentials: 'include'
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.id);
                if (data.id === post.authorId) {
                    // 현재 사용자가 게시글 작성자인 경우 수정 버튼을 표시
                    const EditButtonElement = document.getElementById('edit-button-parent');
                    if (EditButtonElement) {
                        EditButtonElement.style.display = "";
                    }
                } else {
                    console.log("작성자가 아니어서 게시글을 수정할 수 없습니다.");
                }
            })
            .catch(error => console.error('Error loading the post:', error));

            const postDate = new Date(post.createdAt).toLocaleDateString('ko-KR');
            const postTime = new Date(post.createdAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
            
            // 게시글 제목 설정
            const titleElement = document.getElementById('title');
            if (titleElement) {
                titleElement.innerHTML = `<h3>${post.title}</h3>`;
            }

            // 사용자 프로필 이미지 설정
            const userImageElement = document.getElementById('user-image');
            if (userImageElement) {
                userImageElement.style.backgroundImage = `url('${post.userImagePath}')`;
            }

            // 사용자 이름 설정
            const userNameElement = document.getElementById('user-name');
            if (userNameElement) {
                userNameElement.innerHTML = `<h4>${post.author}</h4>`;
                if (post.authorId === 1) {
                    userNameElement.innerHTML = `<h4 style="color: #95bfff;">${post.author} (개발자)</h4>`;
                }                
            }            

            // 게시 날짜 설정
            const dateElement = document.getElementById('date');
            if (dateElement) {
                dateElement.innerHTML = `<p>${postDate}</p><p>${postTime}</p>`;
            }

            // 게시글 이미지 설정
            const postImageElement = document.getElementById('post-image');
            const postImageSpace1 = document.getElementById('post-image-space1');
            const postImageSpace2 = document.getElementById('post-image-space2');
            console.log("postImage", post.postImagePath);
            if (postImageElement && post.postImagePath != null) {
                postImageElement.style.display = ""; 
                postImageSpace1.style.display = ""; 
                postImageSpace2.style.display = ""; 
                postImageElement.innerHTML = `<img src="${post.postImagePath}" alt="이미지가 없습니다.">`;
            } else {
                postImageElement.style.display = "none";
                postImageSpace1.style.display = "none"; 
                postImageSpace2.style.display = "none"; 
            }

            // 게시글 내용 설정
            const contentElement = document.getElementById('content');
            if (contentElement) {
                const formattedContent = post.content.replace(/\n/g, '<br>');
                contentElement.innerHTML = `<p>${formattedContent}</p>`;
            }

            // 조회수 설정
            const likesElement = document.getElementById('views');
            if (likesElement) {
                likesElement.innerHTML = `${post.views}`;
            }

            // 댓글 수 설정
            const commentsElement = document.getElementById('comments');
            if (commentsElement) {
                commentsElement.innerHTML = `${post.comments}`;
            }

            // 현재 사용자 정보를 로드하고 댓글을 로드
            loadCurrentUser().then(() => {
                loadComments(postId);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });

        // 모달 외부 클릭 시 모달 닫기
        window.addEventListener("click", function(event) {
            document.querySelectorAll('.command-delete-modal').forEach(function(modal) {
                if (event.target === modal) {
                    modal.classList.remove("show");
                }
            });
        });
    }

    // 현재 사용자 정보 로드
    let currentUser = {};
    function loadCurrentUser() {
        return fetch('http://127.0.0.1:8600/api/users/userinfo', {
            method: 'GET',
            credentials: 'include' // 세션 쿠키를 포함하여 요청
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch current user info: ' + response.status);
            }
            return response.json();
        })
        .then(user => {
            currentUser = user;
            console.log('Current user:', currentUser);
        })
        .catch(error => {
            console.error('Error fetching current user info:', error);
        });
    }

    // 댓글 로드
    window.loadComments = function(postId) {
        fetch(`http://127.0.0.1:8600/api/comments/${postId}/comments`)
        .then(response => response.json())
        .then(comments => {
            const commentsElement = document.getElementById('comments');
            if (commentsElement) {
                commentsElement.innerHTML = comments.length;
            }

            console.log(comments);
            const commentsContainer = document.getElementById('comments-container');
            commentsContainer.innerHTML = '';
            comments.forEach((comment) => {
                const commentDate = new Date(comment.createdAt).toLocaleDateString('ko-KR');
                const commentTime = new Date(comment.createdAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
                
                const isJudy = comment.authorId === 1;
                const isCurrentUser = comment.authorId === currentUser.id;
                const authorClass = comment.authorIsPoster ? 'author-comment' : '';
                
                let colorStyle = '';
                if (isJudy) {
                    colorStyle = 'style="color: #95bfff;"';
                } else if (isCurrentUser) {
                    colorStyle = 'style="color: #cc99ff;"';
                } else if (comment.authorIsPoster) {
                    colorStyle = 'style="color: #ff9595;"';
                }

                const authorText = isJudy ? `${comment.author} (개발자)`
                    : isCurrentUser ? `${comment.author} (나)`
                    : comment.authorIsPoster ? `${comment.author} (글쓴이)`
                    : comment.author;

                const formattedContent = comment.content.replace(/\n/g, '<br>');
                const commentHTML = `
                    <article id="comment-${comment.id}" class="command-parent ${authorClass}">
                        <div class="command-set">
                            <div class="command-subtitle">
                                <div class="command-profile">
                                    <div class="user-image" style="background-image: url('${comment.imagePath}');"></div>
                                    <div class="subtitle">
                                        <div class="user-name" ${colorStyle}>
                                            <h4>${authorText}</h4>
                                        </div>
                                        <div class="date">
                                            <p>${commentDate}</p>
                                            <p>${commentTime}</p>
                                        </div>
                                    </div>
                                </div>
                                <div id="command-button-parent-${comment.id}" class="command-button-parent"></div>                                
                            </div>
                            <div id="edit-form-${comment.id}" class="edit-form" style="display: none;"></div>                       
                            <div class="comment-content command-text"><p>${formattedContent}</p></div>
                        </div>
                    </article>
                `;
                commentsContainer.innerHTML += commentHTML;

                // 현재 로그인한 사용자가 댓글 작성자인 경우 수정 및 삭제 버튼 표시
                fetch('http://127.0.0.1:8600/api/users/userinfo', {
                    credentials: 'include'
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data.id);
                    if (data.id === comment.authorId) {
                        const editDeleteButtonsHTML = `
                            <button class="button-edit" data-comment-id="${comment.id}">수정</button>
                            <div id="command-button-modal-${comment.id}" class="delete-modal command-delete-modal">
                                <div class="modal-content">
                                    <p class="text1">댓글을 삭제하시겠습니까?</p>
                                    <p class="text2">삭제한 내용은 복구할 수 없습니다.</p>
                                    <div class="space"></div>
                                    <div class="modal-actions">
                                        <button id="command-cancel" class="modal-button command-cancel">취소</button>
                                        <button id="command-delete" class="modal-button command-delete">확인</button>
                                    </div>
                                </div>
                            </div>
                            <button id="command-button-delete-${comment.id}" class="button-delete command-button-delete" data-modal-id="${comment.id}">삭제</button>                   
                        `;
                        document.getElementById(`command-button-parent-${comment.id}`).innerHTML = editDeleteButtonsHTML;
                        
                        const formattedContent = comment.content.replace('<br>', '');
                        const editFormHTML = `
                            <textarea class="edit-input" id="commentEdit">${formattedContent}</textarea>
                            <p class="helptext editHelpText hide">* helptext</p>
                            <button id="commentEditButton" class="button-save" data-comment-id="${comment.id}">저장</button>
                        `;
                        document.getElementById(`edit-form-${comment.id}`).innerHTML = editFormHTML;
                        
                    } else {
                        console.log("작성자가 아니어서 댓글을 수정할 수 없습니다.");
                    }
                })
                .catch(error => console.error('Error loading the post:', error));
            });
            
            attachEditContentsEventListeners();
            attachModalEventListeners();
        })
        .catch(error => console.error('Error loading comments:', error));
    }     

    // 댓글 수정 기능 추가
    function attachEditContentsEventListeners() {
        const commentsContainer = document.getElementById('comments-container');
        if (commentsContainer) {
            commentsContainer.addEventListener('click', function(event) {
                if (event.target.classList.contains('button-edit')) {
                    console.log("button-edit clicked");
                    const commentId = event.target.dataset.commentId;
                    console.log("commentId show clicked", commentId);

                    const inputCommentEdits = document.querySelectorAll('.edit-input');
                    inputCommentEdits.forEach(input => {
                        input.dispatchEvent(new Event('input', { bubbles: true }));
                    });
                    
                    const commentElement = document.getElementById(`comment-${commentId}`);
                    commentElement.querySelector('.edit-form').style.display = 'flex';
                    commentElement.querySelector('.button-edit').style.display = 'none';
                    commentElement.querySelector('.comment-content').style.display = 'none';
                }

                if (event.target.classList.contains('button-save')) {
                    console.log("button-save clicked");
                    const commentId = event.target.dataset.commentId;
                    const commentElement = document.getElementById(`comment-${commentId}`);
                    const newText = commentElement.querySelector('.edit-input').value;

                    fetch(`http://127.0.0.1:8600/api/comments/${commentId}`, {
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
                }
            });
        }
    }

    // 모달 이벤트 리스너 추가
    function attachModalEventListeners() {
        const commentsContainer = document.getElementById('comments-container');
        if (commentsContainer) {
            commentsContainer.addEventListener('click', function(event) {
                if (event.target.classList.contains('button-delete')) {
                    console.log("button-delete clicked");
                    const commentId = event.target.dataset.modalId;
                    const modal = document.getElementById(`command-button-modal-${commentId}`);
                    console.log("Modal show clicked", modal);
                    if (modal) {
                        modal.classList.add('show');
                    }
                }

                if (event.target.classList.contains('command-cancel')) {
                    console.log("command-cancel clicked");
                    const modal = event.target.closest('.delete-modal');
                    if (modal) {
                        modal.classList.remove('show');
                    }
                }

                if (event.target.classList.contains('command-delete')) {
                    console.log("command-delete clicked");
                    const commentId = event.target.closest('.delete-modal').id.split('-')[3];
                    deleteComments(commentId);
                    const modal = event.target.closest('.delete-modal');
                    if (modal) {
                        modal.classList.remove('show');
                    }
                }
            });
        }
    }
    
    // 댓글 삭제
    function deleteComments(commentId) {
        console.log(commentId);
        fetch(`http://127.0.0.1:8600/api/comments/${commentId}`, {
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

                const postId = window.location.pathname.split('/').pop();
                loadCurrentUser().then(() => {
                    loadComments(postId);
                });
            } else {
                console.log('댓글이 없습니다.');
            }
        })
        .catch(error => {
            console.error('댓글 삭제 실패:', error);
        });
    }
});
