// frontend/static/js/post-load.js

document.addEventListener('DOMContentLoaded', () => {

    if (window.location.pathname === '/posts') {
        fetch('http://127.0.0.1:8200/api/posts')
        .then(response => {
            return response.json();
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
        
        fetch(`http://127.0.0.1:8200/api/posts/${postId}`)
        .then(response => response.json())
        .then(post => { 
            
            // 조회수 업데이트
            // getPostById

            // 자신이 작성한 게시물만 수정/삭제할 수 있음
            fetch('http://127.0.0.1:8200/api/users/userinfo', {
                credentials: 'include'
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.id);
                if (data.id === post.authorId) {
                    const EditButtonElement = document.getElementById('edit-button-parent');
                    //EditButtonElement.innerHTML = ``;
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
                if (post.authorId === 1) {
                    userNameElement.innerHTML = `<h4 style="color: #95bfff;">${post.author} (개발자)</h4>`;
                }                
            }            
    
            // date and time
            const dateElement = document.getElementById('date');
            if (dateElement) {
                dateElement.innerHTML = `<p>${postDate}</p><p>${postTime}</p>`;
            }
            
            // post content
            const postImageElement = document.getElementById('post-image');
            const postImageSpace1 = document.getElementById('post-image-space1');
            const postImageSpace2 = document.getElementById('post-image-space2');
            console.log("postImage", post.postImagePath);
            if (postImageElement && post.postImagePath != null) {
                postImageElement.style.display = ""; 
                postImageSpace1.style.display = ""; 
                postImageSpace2.style.display = ""; 
                postImageElement.innerHTML = `<img src="${post.postImagePath}" alt="이미지가 없습니다.">`;
            }else {
                // 게시글에 이미지가 없으면 표시하지 않음
                postImageElement.style.display = "none";
                postImageSpace1.style.display = "none"; 
                postImageSpace2.style.display = "none"; 
            }
    
            // post content
            const contentElement = document.getElementById('content');
            if (contentElement) {
                const formattedContent = post.content.replace(/\n/g, '<br>');
                contentElement.innerHTML = `<p>${formattedContent}</p>`;
                // contentElement.innerHTML = `<p>${post.content}</p>`;
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
            // setupModalEventListeners();
            loadCurrentUser().then(() => {
                loadComments(postId);
            });
            // window.loadComments(postId);
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


    // 현재 사용자 정보 가져오기 (댓글이 내가 쓴건지 확인하기 위해서)
    let currentUser = {};
    function loadCurrentUser() {
        return fetch('http://127.0.0.1:8200/api/users/userinfo', {
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

    window.loadComments = function(postId) {
        fetch(`http://127.0.0.1:8200/api/comments/${postId}/comments`)
        .then(response => response.json())
        .then(comments => {

            // 댓글 수 업데이트
            const commentsElement = document.getElementById('comments');
            if (commentsElement) {
                commentsElement.innerHTML = comments.length;
            }

            console.log(comments);
            const commentsContainer = document.getElementById('comments-container');
            commentsContainer.innerHTML = ''; // Clear previous comments
            comments.forEach((comment) => {
                const commentDate = new Date(comment.createdAt).toLocaleDateString('ko-KR');
                const commentTime = new Date(comment.createdAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
                
                // 색상 변경 및 표시 조건 추가
                const isJudy = comment.authorId === 1; // 개발자 Judy
                const isCurrentUser = comment.authorId === currentUser.id; // 현재 사용자
                const authorClass = comment.authorIsPoster ? 'author-comment' : ''; // 글쓴이 또는 일반 사용자
                
                let colorStyle = '';
                if (isJudy) {
                    colorStyle = 'style="color: #95bfff;"'; // 주디!
                } else if (isCurrentUser) {
                    colorStyle = 'style="color: #cc99ff;"'; // 현재 사용자일 경우
                } else if (comment.authorIsPoster) {
                    colorStyle = 'style="color: #ff9595;"'; // 글쓴이일 경우
                } 

                const authorText = isJudy ? `${comment.author} (개발자)`
                    : isCurrentUser ? `${comment.author} (나)`
                    : comment.authorIsPoster ? `${comment.author} (글쓴이)` 
                    : comment.author;
                
                fetch('http://127.0.0.1:8200/api/users/userinfo', {
                    credentials: 'include'
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data.id);
                    if (data.id === comment.authorId) {
                        // 나에게만 이름이 닉네임 (나) 로 보이도록 설정
                    }
                })
                .catch(error => console.error('Error loading the post:', error));
            
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

                // 자신일 경우에만 수정 및 삭제 버튼 표시                
                
                fetch('http://127.0.0.1:8200/api/users/userinfo', {
                    credentials: 'include'
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data.id);
                    if (data.id === comment.authorId) {
                        const editDeleteButtonsHTML = `
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

    // 댓글 수정 기능
     function attachEditContentsEventListeners() {
        const commentsContainer = document.getElementById('comments-container');
        if (commentsContainer) {
            commentsContainer.addEventListener('click', function(event) {
                if (event.target.classList.contains('button-edit')) {
                    console.log("button-edit clicked");
                    const commentId = event.target.dataset.commentId;
                    console.log("commentId show clicked", commentId);

                    // 댓글 수정 : 강제로 입력 이벤트를 트리거
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

                    fetch(`http://127.0.0.1:8200/api/comments/${commentId}`, {
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

    // 모달 동작 리스너 추가
    function attachModalEventListeners() {
        const commentsContainer = document.getElementById('comments-container');
        if (commentsContainer) {
            commentsContainer.addEventListener('click', function(event) {
                if (event.target.classList.contains('button-delete')) {
                    console.log("button-delete clicked");
                    const commentId = event.target.dataset.modalId;
                    const modal = document.getElementById(`command-button-modal-${commentId}`);
                    console.log("Modal show clicked", modal);  // Debug log
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
    
    function deleteComments(commentId) {
        console.log(commentId);
        fetch(`http://127.0.0.1:8200/api/comments/${commentId}`, {
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

                // 댓글 수 업데이트
                const postId = window.location.pathname.split('/').pop(); // post id 가져오기
                loadCurrentUser().then(() => {
                    loadComments(postId);
                });
                // window.loadComments(postId);
            } else {
                console.log('댓글이 없습니다.');
            }
        })
        .catch(error => {
            console.error('댓글 삭제 실패:', error);
        });
    }
});

