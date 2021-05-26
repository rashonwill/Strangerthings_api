$(document).ready(function() {
  $('.slider').slick({
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
     
    
  })
  });
  
  $('.fa-caret-down').click(function() {
    console.log('hello')
    let login = $('.hidden')
    login.toggleClass('active');
  })
  

  $('.logout').click(function(){
    localStorage.removeItem("authToken");


  });