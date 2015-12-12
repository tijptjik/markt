$(document).foundation();

var APPID = 'shining-fire-9795'
var ref = new Firebase("https://" + APPID + ".firebaseio.com/");
var data = {
	'email' : 'm@type.hk',
	'password' : 'guidance',
}
// db.set({
//   title: "Hello World!",
//   author: "Firebase",
//   location: {
//     city: "San Francisco",
//     state: "California",
//     zip: 94103
//   }
// });


// Create Accounts
ref.createUser({
  email    : data.email,
  password : data.password
}, function(error, userData) {
  if (error) {
    console.log("Error creating user:", error);
  } else {
    console.log("Successfully created user account with uid:", userData.uid);
  }
});

// Create a callback to handle the result of the authentication
function authHandler(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
}

// Login With an email/password combination
ref.authWithPassword({
  email    : 'bobtony@firebase.com',
  password : 'correcthorsebatterystaple'
}, authHandler);


// we would probably save a profile when we register new users on our site
// we could also read the profile to see if it's null
// here we will just simulate this with an isNewUser boolean
var isNewUser = true;

ref.onAuth(function(authData) {
  if (authData && isNewUser) {
    // save the user's profile into the database so we can list users,
    // use them in Security and Firebase Rules, and show profiles
    ref.child("users").child(authData.uid).set({
      provider: authData.provider,
      name: getName(authData)
    });
  }
});

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


$('log-in-form form').on('submit',funciton(e){
	e.preventDefault();
})