$(document).foundation();

var APPID = 'shining-fire-9795'
var ref = new Firebase("https://" + APPID + ".firebaseio.com/");

$(".button-modal").animatedModal({
	"animatedIn" : 'fadeInDownBig',
	"animatedOut" : 'fadeOutUp',
	});

// Handle Logins
function authHandler(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
}

// Create a callback which logs the current auth state
function authDataCallback(authData) {
  if (authData) {
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
  } else {
    console.log("User is logged out");
  }
}

function loadApp(){
	$main = $('main')
	$main.removeClass('align-middle');
	$main.find('.log-in-form').remove();
	$main.find('#markt').toggle();
}

// Trigger Logins
function loginFlash(callout, formData, authHandler){
	callout.fadeIn().removeClass('alert').addClass('success');
  	callout.find('h5').text('Successfully opened account')
  	callout.find('.msg').text("Logging you in ...")
    ref.authWithPassword(formData, authHandler);
}

$('.log-in-form form .submit').on('click', function(e){
	e.preventDefault();

	var $callout = $('.callout');
	$callout.fadeOut();
	
	var formData = $(this).parent('form').serializeArray()
		.reduce(function(obj, item) {
		    obj[item.name] = item.value;
		    return obj;
		},{});

	// Create Accounts
	ref.createUser(formData, function(error, userData) {

	  if (error) {	
	    switch (error.code) {
	      case "EMAIL_TAKEN":
	      	// Login With an email/password combination
			loginFlash($callout,formData,authHandler);
	        break;
	      case "INVALID_EMAIL":
	      	$callout.fadeIn();
	        $callout.find('.msg').text("The specified email is not a valid email.");
	        break;
	      default:
	      	$callout.fadeIn();
	        $callout.find('.msg').text("Error creating user:", error);
	    }
	  } else {
	  	// Login With an email/password combination
	  	loginFlash($callout,formData,authHandler);
	  }
	});
});

// Check if login is persisted.
ref.onAuth(authDataCallback);
	
