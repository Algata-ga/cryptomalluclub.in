$(document).ready(function(){
    $(".hamburger").click(function(){
      $(".nav-links").toggleClass("open");
    });
  });


  




const accordian = document.getElementsByClassName("contents");

for(i=0;i<accordian.length;i++){
    accordian[i].addEventListener('click',function(){
        this.classList.toggle('active')
    })
}


$(document).ready(function () {
  $("#submit-form").validate({
      rules: {
          name: {
              required: true,
          },
          email: {
              email: true,
          },
          message: {
              required: true,
              minlength: 10,
          },
      },

      submitHandler: function (form) {
          $.ajax({
              url: "https://script.google.com/macros/s/AKfycbznIGAyNRAIHVwpDmU6GGwm4k9uehMjJnJrZ5k9YMKoQwgquB3mpu1IiQPuqqwn5xJ_/exec",
              data: $("#submit-form").serialize(),
              method: "post",
              success: function (response) {
                  alert("Form submitted successfully");
                  window.location.reload();
                  //window.location.href="https://google.com"
              },
              error: function (err) {
                  alert("Something Error");
              },
          });
      },
  });
});
