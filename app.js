
const BASE_URL =  "https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT";

function fetchSite(){
  const site = `${ BASE_URL}`;  
  fetch(site).then(response => response.json())
  .then(result => {
    console.log(result); 
  }).catch(console.error);
};

fetchSite();


