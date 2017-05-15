$(function() {
    const api = "http://localhost:8000";
    $('.account-form').submit(function(){
       event.preventDefault();
       var firstName = $('#firstName').val();
       var lastName = $('#lastName').val();
       var email = $('#email').val();
       var phoneCode = $('#phoneCode').val();
       var phoneNumber = $('#phoneNumber').val();
       var password = $('#password').val();
       var validationMessage = $('#validationMessage');
       var submitBtn = $('#submitBtn');

       function validateEmail(email) {
           var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
           return re.test(email);
       }
       function validatePassword(password){
           var re = /^(?=.*?[A-Z])(?=.*?[0-9]).{6,}$/;
           return re.test(password);
       }
       if (firstName && lastName && email && phoneCode && phoneNumber && password) {
           if (validateEmail(email)) {
               if (validatePassword(password)){
                   var account = {
                       'firstName': firstName,
                       'lastName': lastName,
                       'email': email,
                       'phone': phoneCode + phoneNumber,
                       'password': password
                   };
                   $.ajax({
                       type: "POST",
                       url: api + "/create-account",
                       data: account,
                       success: function(data){
                           console.log(data);
                           alert('done');
                           $('#firstName').val('');
                           $('#lastName').val('');
                           $('#email').val('');
                           $('#phoneCode').val('');
                           $('#phoneNumber').val('');
                           $('#password').val('');
                           submitBtn.removeClass('not-valid');
                           validationMessage.text('');
                       }
                   });
               } else {
                   validationMessage.text('Please input correct password with minimum 6 chars and at least 1 number and 1 Capital letter!');
                   submitBtn.addClass('not-valid');
               }
           } else {
               validationMessage.text('Please input correct email!');
               submitBtn.addClass('not-valid');
           }
       } else{
           validationMessage.text('Please fill in all fields!');
           submitBtn.addClass('not-valid');
       }
    });
});
