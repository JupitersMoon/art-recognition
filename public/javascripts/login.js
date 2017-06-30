$(document).ready(() => {
  // 'use strict';
  // console.log('Huuuurrrreeeee ALLLRricaaa');

  // $('.button-collapse').sideNav();

  $('#loginForm').submit((event) => {
    event.preventDefault();

    const email = $('#email').val().trim();
    const password = $('#password').val().trim();

    console.log('email: ', email);
    console.log('password: ', password);

    if (!email) {
      return Materialize.toast('Email must not be blank', 3000);
    }

    if (!password) {
      return Materialize.toast('Password must not be blank', 3000);
    }

    const options = {
      contentType: 'application/json',
      data: JSON.stringify({ email, password }),
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