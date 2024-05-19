const signUpButton = document.getElementById('signUpButton');
const signInButton = document.getElementById('signInButton');
const container = document.getElementById('container');
const dashbutton = document.getElementById('dash-nav-item');
const userbutton = document.getElementById('user-nav-item');
const analyticsButton = document.getElementById('analytics-nav-item');
const logoutButton = document.getElementById('logout-nav-item');



signInButton.addEventListener('click', () => {
    $('.sign-in-form').css('display', 'none');
    $('.sign-up-form').css('display', 'none');
    $('#form-main').css('display', 'none');
    $('#section').css('display', 'block');
    $('.form-customer').css('display', 'none');
    $('.form-dashboard').css('display', 'block');
    $('#dash-nav-item').addClass('active');
    $('#logout-nav-item').removeClass('active');
    
});

userbutton.addEventListener('click', () => {
    $('.sign-in-form').css('display', 'none');
    $('.sign-up-form').css('display', 'none');
    $('#form-main').css('display', 'none');
    $('#section').css('display', 'block');
    $('.form-customer').css('display', 'block');
    $('.form-dashboard').css('display', 'none');
})

dashbutton.addEventListener('click', () => {
    $('.sign-in-form').css('display', 'none');
    $('.sign-up-form').css('display', 'none');
    $('#form-main').css('display', 'none');
    $('#section').css('display', 'block');
    $('.form-customer').css('display', 'none');
    $('.form-dashboard').css('display', 'block');
})

logoutButton.addEventListener('click', () => {
    $('.sign-in-form').css('display', 'block');
    $('.sign-up-form').css('display', 'block');
    $('#form-main').css('display', 'block');
    $('#section').css('display', 'none');
    $('.form-customer').css('display', 'none');
    $('.form-dashboard').css('display', 'none');
})

analyticsButton.addEventListener('click', () => {
    $('.sign-in-form').css('display', 'none');
    $('.sign-up-form').css('display', 'none');
    $('#form-main').css('display', 'none');
    $('#section').css('display', 'block');
    $('.form-customer').css('display', 'none');
    $('.form-dashboard').css('display', 'none');
})





document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('form-main').style.display = 'none';
});
// methna hadala iwr unata passe form main ek section kiyla wensn krnn ona







