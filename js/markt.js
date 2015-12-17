
// Firebase

var APPID = 'shining-fire-9795'
var ref = new Firebase("https://" + APPID + ".firebaseio.com/");

/* Set Timestamps */

function timestamp(obj){
	if (!obj.hasOwnProperty('created_at')){
		obj['created_at'] = Firebase.ServerValue.TIMESTAMP;
	}

	obj['updated_at'] = Firebase.ServerValue.TIMESTAMP;
	return obj;
}

/* Post New Prediction */

function withUserName(options, e, callback){
	getUsername(options, e, callback);
}

function postPrediction(options, e, callback){

	var $form = $(e.target).parents('.predict');
	var pred = {};
	var bet = {};

	pred['prediction'] = $form.find('textarea[name=prediction]').val();
	pred['condition'] = $form.find('textarea[name=condition]').val();
	pred['user_id'] = options.user.uid;
	pred['user_name'] = options.user.name;
	pred = timestamp(pred)
	
	var newPredictionRef = ref.child("predictions").push(pred);
	var predictionID = newPredictionRef.key();
	
	bet['amount'] = parseInt($form.find('.slider-handle').attr('aria-valuenow'));
	bet['yes'] = true;
	bet['prediction'] = predictionID;
	bet['user_id'] = options.user.uid;
	bet['user_name'] = options.user.name;
	bet = timestamp(bet);

	var newBetRef = ref.child("bets").push(bet);

	var betID = newBetRef.key();

	ref.child('users/' + options.user.uid + '/bets/' + betID).set(bet);

	callback();
}


/* Event Listeners */

$(function(){

	// Post New Prediction
	$('.predict .button.submit').on('click', function(e){
		e.preventDefault();

		withUserName({}, e, function(options){
			postPrediction(options, e,
				function(){
					window.location.href = "./dashboard.html";
			});
		});
	});


	// Logging out.
	$('.button.logout').on('click', logOut);

});

/* Event Handlers */

function logOut(e){
	e.preventDefault();
	ref.unauth();
	window.location.href = './'
}


// UTILITY FUNCTIONS

function getUserID(){
	authData = ref.getAuth();
	return authData.uid;
}

function getUsername(obj, e, callback){
	authData = ref.getAuth();
	ref.child('users/' + authData.uid + '/name').once("value", function(snapshot) {
		  var user = {}
		  user['name'] = snapshot.val()
		  user['uid'] = authData.uid 
		  
		  obj['user'] = user;
		  callback(obj);

		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		});

}