const BASE_URL =  "https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT";
const myToken = localStorage.getItem('authToken')



async function fetchPost() {
  try {
    const response = await fetch(`${BASE_URL}/posts`,{
      method: 'GET',
    })
    const data = await response.json();
    
    // console.log(data)
    return data.data.posts;
   
  } catch (error) {
    console.error('Oops Something Went Wrong! Try again!');
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
  </div>
  `)

$('.comments-section').append(userComments);


}


function renderPost(posts){
  const userPost = $(`
  <div class="post-card">
  <div class="title">
    <div class="useravi"><img id="avi" src ="https://images.squarespace-cdn.com/content/54b7b93ce4b0a3e130d5d232/1519987165674-QZAGZHQWHWV8OXFW6KRT/icon.png?content-type=image%2Fpng"/>
      </div><h3 id=username>${posts.author.username}</h3>
        </div>    
   
   <div class="item-info">
        <h4>${posts.title} - ${posts.price} </h4>
        </div>
   
     <div class="item-description">
        ${posts.description}  
        </div>
  
  <ul class="interact">
     <ol>
   <li><i class="fa fa-comment" aria-hidden="true"></i></li>
   <li><i class="fa fa-heart" aria-hidden="true"></i></li>
  </ol>  
</ul>

<div class="comments-section">

<textarea class="twocents" type="text" placeholder="Comment"></textarea>
</div> 


    
`).data('posts', posts);

  
  $(userPost).on('click', '.fa-heart', function() {
    let likedPost = $(this).closest('.fa-heart')
    likedPost.toggleClass('active'); 
  
  });

 $(document).ready(function(){

  $(userPost).on('click','.fa-comment', async function() {
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


  
 
  $(userPost).on('keypress', '.twocents', function(e){
      if(e.which == 13){
      createMessages();
    }
   })
   return userPost;
  };

 
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

async function createMessages(){
  let newComment = $('.twocents').val();

 try {

  const theMessage = {
    content: newComment,
  
  }
  const response = await fetch(`${BASE_URL}/users/me`,{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${myToken}`
  }, body: JSON.stringify({messages:theMessage}),
 
})
 }
 catch (error) {
  console.error('Oops Something Went Wrong! Try again!');
        }

let myComment = (`<br> <div class="comments"> 
        <div class="user-comment">
       <img  id ="avi"src ="https://user-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/60063/467371_21871.png"/>
        <h3>${newComment}</h3> 
        </div></div> </br>`)

     $('.comments-section').append(myComment);
     $('.twocents').val('');
    
     return myComment;
     
}


function bootstrap(){
fetchPost().then(renderPostList);
postComms().then(renderCommentList)
}

bootstrap();

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
  
}

//Click Handlers

$('.postMe').click( async function(event){
event.preventDefault();
let title = $('#Title').val();
 let price = $('#Price').val();
 let details =  $('#Details').val();
 let myToken = localStorage.getItem('authToken')

 const postBody = {
  title: title, 
  price: price,
  description: details, 
}
  try {
  const response = await fetch (`${BASE_URL}/posts`, {
    
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${myToken}`
   }, body: JSON.stringify({post:postBody}) 
  })
  console.log(response)
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
    <h3 id=username> RashonWill</h3>
    <div id ="edits"> 
   <button class="iconbtn2"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></button>
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
     <li> <button class="iconbtn"> <i class="fa fa-comment" aria-hidden="true"></i></button> </li>
               <li><button class="iconbtn"> <i class="fa fa-heart" aria-hidden="true"></i></button> </li>

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
  // return myPost;
  
});


$('.new-post').click(function() {
    $('.post-form').addClass('active')
});

$('.cancel').click(function() {
    $('.post-form').removeClass('active')
});


$('.logout').click(function(){
  localStorage.removeItem("authToken");


});

$('.fa-caret-down').click(function() {
  console.log('hello')
  let login = $('.hidden')
  login.toggleClass('active');
})

  $("#searchbar").on("keypress", function(event) {
    if(event.which==13){
      let keywords = $(this).val().toLowerCase();
      $(".post-card").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(keywords) > -1);
      });
    };

    });




