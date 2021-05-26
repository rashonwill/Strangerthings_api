const BASE_URL =  "https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT";

$('form').on('submit', async (e) => {
e.preventDefault();
const userName = $('#userName').val();
const userPassword = $('#userPassword').val();
const user = {
username: userName,
password: userPassword
}
try {
    const response = await fetch (`${ BASE_URL }/users/login`,{    
        method: "POST", 
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({user})
    })
const data = await response.json();
localStorage.setItem("authToken", data.data.token);
window.location.href= "/homepage.html";
}catch(err){
    console.log(err);
    $('.errors').text('Invalid Username or Password');
    setTimeout(() => {
    const userName = $('#userName').val('');
    const userPassword = $('#userPassword').val('');
    $('.errors').text('');
    }, 3000);
}

 
});