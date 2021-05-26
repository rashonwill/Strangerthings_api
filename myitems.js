const BASE_URL =  "https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT";
const myToken = localStorage.getItem('authToken')
let postData;


async function fetchPost() {
  try {
    const response = await fetch(`${BASE_URL}/users/me`,{
      method: 'GET',  
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${myToken}`
      }
    })
    const data = await response.json();
    // console.log(data)
    return data.data.posts;
  } catch (error) {
    console.log('Oops Something Went Wrong! Try again!');
  }


}

async function postComms(){
  try{
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${myToken}`
      }
    })
const data = await response.json();
    return data.data.messages;
  }catch(error){
    console.log(error);
  }

}

function renderComments(messages){
  let userComments = (`
  <div class="comments">
  <div class="useravi">
  <img id="avi" src="https://images.squarespace-cdn.com/content/54b7b93ce4b0a3e130d5d232/1519987165674-QZAGZHQWHWV8OXFW6KRT/icon.png?content-type=image%2Fpng"/> 
  ${messages.fromUser.username}
  </div>
  <h3>${messages.content}</h3>
  </div></div>`)

$('.comments-section').append(userComments);


}


function renderPost(posts){
let myPost = $(`
  <div class="post-card">
  <div class="title">
    <div class="useravi">
      <img id ="avi"src ="https://user-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/60063/467371_21871.png"/>
    </div>
    <div id ="edits"> 
   
      <ul class="edit-options">
          <li><i class="fa fa-pencil-square" aria-hidden="true"></i>Edit</li> 
          <li><i class="fa fa-trash" aria-hidden="true"></i> Delete</li>
        </ul>
            <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
      </div>
    </div>

      <div class="item-info">
       <h4>${posts.title} - ${posts.price}</h4>
       </div>
       <div class="item-description">
        ${posts.description}
      </div>
     
     <ul class="interact">
       <ol>
     <li>  <i class="fa fa-comment" aria-hidden="true"></i> </li>

       </ol>
     </ul>
     
     <div class="comments-section">
  
     </div>
     </div>
   `).data('posts', posts);



   $(myPost).on('click', '.fa-ellipsis-h', function() {
  let options = $('.edit-options')
   options.fadeToggle('active');

   $(document).ready(function(){

    $(myPost).on('click','.fa-comment', async function() {
      let postCom = $(this).closest('.post-card').data('posts');
      try{
        const result = await postComms(postCom._id); 
      }catch(error){
        console.log('Oops! Something Went Wrong, Please try Again.')
      }
     let postComments = $('.comments-section')
      postComments.toggleClass('active')
  
     })
  
   })
    

  })

  
  $(myPost).on('click', '.fa-trash', async function() {
    let delPost = $(this).closest('.post-card').data('posts');
    $('.content .post').remove(delPost);
    try{
      const result = await deletePost(delPost._id);
      console.log(result) 
      window.location.reload();
     
    }catch(error){
      console.log('Oops! Something Went Wrong, Please try Again.')
    }

  })

  $(myPost).on('click', '.fa-pencil-square', function() {
    let editForm = $('.edit-post-form')
    editForm.toggleClass('active');

    const editCard = $(this).closest('.post-card').data('posts')
    postData = editCard._id;

    $('.edit-post-form #title').append(editCard.title)
    $('.edit-post-form #price').append(editCard.price)
    $('.edit-post-form #details').append(editCard.description)

    })


  $(myPost).on('click','.fa-comment', function() {
  let postComments = $('.comments-section')
  postComments.toggleClass('active').siblings().removeClass('active');
   
 });

$('.post').prepend(myPost);

}


function renderPostList(postList){
  $('.content .post').empty();
  postList.forEach(function(posts){
  $('.content .post').append(renderPost(posts)) ; 
    
  })
};

function renderCommentList(commentsList){
  $('.comments-section').empty();
  commentsList.forEach(function(messages){
    $('.comments-section').append(renderComments(messages))
  })
}

async function deletePost(post_id){
  let myToken = localStorage.getItem('authToken')
  try{
    const response = await fetch(`${BASE_URL}/posts/${post_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${myToken}`
      }
    })
    const data = await response.json();
    return data;
  }catch(error){
    console.log(error);
  }
  // console.log(deletePost)
}

function bootstrap(){
  fetchPost().then(renderPostList)
  postComms().then(renderCommentList)
  }
  
bootstrap();



$('.fa-caret-down').click(function() {
    console.log('hello')
    let login = $('.hidden')
    login.toggleClass('active');
  })
  
  $('.postMe').click( async function(event){
    event.preventDefault();
  let title = $('#Title').val();
   let price = $('#Price').val();
   let details =  $('#Details').val();
   let myToken = localStorage.getItem('authToken');
    try {
       const postBody = {
      title: title, 
      price: price,
      description: details, 
    }
    const response = await fetch(`${BASE_URL}/posts`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${myToken}`
     }, body: JSON.stringify({post:postBody}) 
    })
    window.location.reload();
    }catch(error){
      console.log(error);
    }
  
    
    
    let myPost = $(`
    <div class="post-card">
    <div class="title">
      <div class="useravi">
        <img id ="avi"src ="https://user-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/60063/467371_21871.png"/>
      </div>
      <h3 id=username></h3>
      <div id ="edits"> 
     <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
        <ul class="edit-options">
            <li><i class="fa fa-pencil-square" aria-hidden="true"></i>Edit</li>
          <li><i class="fa fa-trash" aria-hidden="true"></i> Delete</li>
      </ul>
      </div>
        </div>
  
        <div class="item-info">
         <h4>${title} - ${price}</h4>
         </div>
         <div class="item-description">
          ${details}
        </div>
       
       <ul class="interact">
         <ol>
       <li>  <i class="fa fa-comment" aria-hidden="true"></i> </li>
                 <li> <i class="fa fa-heart" aria-hidden="true"></i></li>
  
         </ol>
       </ul>
       
        <div class="comments-section">
      <input class="twocents" type="text" placeholder="Comment"> 
       </div>
       
            </div>
     `);
    
    $('.post').prepend(myPost);
    
    
  
    $('#Title').val('');
    $('#Price').val('');
    $('#Details').val('');
    $('.post-form').removeClass('active')


    $(mypost).on('click', '.fa-ellipsis-h', function() {
      let options = $(this).closest('.edit-options')
      options.fadeToggle('active')
    })
    


    return myPost;
    
  });


  $('.editMe').click( async function(event){
    event.preventDefault();
  let title = $('#title').val();
   let price = $('#price').val();
   let details =  $('#details').val();
   let myToken = localStorage.getItem('authToken');

    try {
       const postBody = {
      title: title, 
      price: price,
      description: details, 
    }
    const response = await fetch(`${BASE_URL}/posts/${postData}`, {
     method: 'PATCH',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${myToken}`
     }, body: JSON.stringify({post:postBody}) 
    })
    window.location.reload();
    }catch(error){
      console.log(error);
    }
  
    
    
    let myPost = $(`
    <div class="post-card">
    <div class="title">
      <div class="useravi">
        <img id ="avi"src ="https://assets.codepen.io/5175761/internal/avatars/users/default.png?fit=crop&format=auto&height=80&version=1614347471&width=80"/>
      </div>
      <h3 id=username> RashonWill</h3>
      <div id ="edits"> 
        <ul class="edit-options">
            <li><i class="fa fa-pencil-square" aria-hidden="true"></i>Edit</li>
          <li><i class="fa fa-trash" aria-hidden="true"></i> Delete</li>
      </ul>
      <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
      </div>
        </div>
  
        <div class="item-info">
         <h4>${title} - ${price}</h4>
         </div>
         <div class="item-description">
          ${details}
        </div>
       
       <ul class="interact">
         <ol>
       <li>  <i class="fa fa-comment" aria-hidden="true"></i> </li>
                 <li> <i class="fa fa-heart" aria-hidden="true"></i></li>
  
         </ol>
       </ul>
       
        <div class="comments-section">
      <input class="twocents" type="text" placeholder="Comment"> 
       </div>
       
            </div>
     `)
    
  
    $('#title').val('');
    $('#price').val('');
    $('#details').val('');
    $('.edit-post-form').removeClass('active')

    return myPost;
    
  });
  
  
  
  $('.new-post').click(function() {
      $('.post-form').addClass('active')
  });
  
  $('.cancel').click(function() {
      $('.post-form').removeClass('active')
  });
  
  $('.cancelTwo').click(function() {
  
   $('#title').val('');
   $('#price').val('');
   $('#details').val('');
   $('.edit-post-form').removeClass('active')
   $('.edit-options').fadeToggle('active')
   window.location.reload();
  
});

  
  $('.post-card').on('click', 'fa-pencil-square', async function() {
  $('.edit-post-form').toggleClass('active')
  })


  $('.logout').click(function(){
    localStorage.removeItem("authToken");


  });