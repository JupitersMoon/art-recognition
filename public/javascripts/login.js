$(document).ready(() => {

  $('.carousel').carousel();

  $('.carousel-slider').slider()

  $('.modal').modal();
  $('.trigger-modal').modal();

  //signupForm
  $('#signupForm').submit((event) => {
    event.preventDefeault()

    var signupUsername = $('#signupUsername').val().trim();
    var signupPassword = $('#signupPassword').val().trim();

    console.log(signupUsername);
    console.log(signupPassword);

    // if (!signupUsername) {
    //   return Materialize.toast('Username must not be blank', 3000);
    // }
    //
    // if (!signupPassword) {
    //   return Materialize.toast('Password must not be blank', 3000);
    // }
    //
    // var options = {
    //   contentType: 'application/json',
    //   data: JSON.stringify({
    //     signupUsername,
    //     signupPassword
    //   }),
    //   dataType: 'json',
    //   type: 'POST',
    //   url: '/login/signup'
    // };
    //
    // $.ajax(options)
    //   .done(() => {
    //     window.location.href = '/index.html';
    //   })
    //   .fail(($xhr) => {
    //     Materialize.toast($xhr.responseText, 3000);
    //   });
  })



  $('#loginForm').submit((event) => {
    event.preventDefault();

    var email = $('#email').val().trim();
    var password = $('#password').val().trim();

    if (!email) {
      return Materialize.toast('Username must not be blank', 3000);
    }

    if (!password) {
      return Materialize.toast('Password must not be blank', 3000);
    }

    var options = {
      contentType: 'application/json',
      data: JSON.stringify({
        email,
        password
      }),
      dataType: 'json',
      type: 'POST',
      url: '/login/token'
    };

    $.ajax(options)
      .done(() => {
        window.location.href = '/camera.html';
      })
      .fail(($xhr) => {
        Materialize.toast($xhr.responseText, 3000);
      });
  });
})
