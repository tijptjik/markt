
// Firebase

var APPID = 'shining-fire-9795'
var ref = new Firebase("https://" + APPID + ".firebaseio.com/");


/* Event Listeners */

// LOGGING IN

$('.log-in-form form .submit').on('click', function(e){
	e.preventDefault();
	submitHandler(this);	
});

// Upon Authentication

ref.onAuth(authDataCallback);
	

/* EVENT HANDLERS  */

// Form Submit

function submitHandler(that){
	var $callout = $('.callout');
	$callout.fadeOut();

	post = formData(that);
	// Create Accounts
	ref.createUser(post, function(error, userData) {

	  if (error) {	
	    switch (error.code) {
	      case "EMAIL_TAKEN":
	      	// Login With an email/password combination
			loginFlash($callout, post, authHandler);
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
	  	loginFlash($callout, post, authHandler);
	  }
	});
};


// Logging in

function loginFlash(callout, formData, authHandler){
	callout.fadeIn().removeClass('alert').addClass('success');
  	callout.find('h5').text('Successfully opened account')
  	callout.find('.msg').text("Logging you in ...")
    ref.authWithPassword(formData, authHandler);
}

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
    // save the user's profile into the database so we can list users,
    // use them in Security and Firebase Rules, and show profiles
    ref.child("users").child(authData.uid).set({
      provider: authData.provider,
      name: getName(authData)
    });

    // Redirect to 1st App View
    window.location.href = "./dashboard.html";
  };
};

/* UTILITY FUNCTIONS */

// find a suitable name based on the meta info given by each provider
function getName(authData) {
  switch(authData.provider) {
     case 'password':
       return authData.password.email.replace(/@.*/, '');
     case 'twitter':
       return authData.twitter.displayName;
     case 'facebook':
       return authData.facebook.displayName;
  }
}


// Gather the form data
function formData(that){
	
	var formData = $(that).parent('form').serializeArray()
		.reduce(function(obj, item) {
		    obj[item.name] = item.value;
		    return obj;
		},{});
	
	return formData;
}