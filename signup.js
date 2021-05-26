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

    const response = await fetch(`${BASE_URL}/users/register`,{    
        method: "POST", 
        headers: {
        'Content-Type': 'application/json',
    }, body: JSON.stringify({user})        
    })
const data = await response.json();
localStorage.setItem("authToken", data.data.token);
window.location.href= "/login.html";
}catch(error){
    console.log(error)
    ('.errors').text('Oops! Something went wrong, please try again!');
    setTimeout(() => {
    const userName = $('#userName').val('');
    const userPassword = $('#userPassword').val('');
    $('.errors').text('');
    }, 3000);
}

 
});