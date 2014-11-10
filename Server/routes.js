// app/routes.js
module.exports = function(app, passport) {
	// =====================================
	// LOGIN ===============================
	// =====================================

	app.get('/', isUserLogged);
	

	app.get('/login', isUserLogged);


	// =====================================
	// PROFILE SECTION =====================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});


		app.get('/test', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('testMenu.ejs', { message: req.flash('loginMessage') }); 
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/login');
	});
// 	app.get('/loginFailure', function(req, res, next) {
//   	res.send('Failed to authenticate');
// 	});
//  
// 	app.get('/loginSuccess', function(req, res, next) {
//   	res.send('Successfully authenticated');
// 	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/login' // redirect back to the signup page if there is an error
		//failureFlash : true // allow flash messages
	}));
	console.log("Hi!3");

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
console.log("Redirected?")
	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home/login page
	res.redirect('/');
}
function isUserLogged(req, res){
  if(req.user){
    // already logged in
    res.redirect('/profile');
  } else {
    // not logged in, show the login form, remember to pass the message
    // for displaying when error happens
   // render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') }); 
  }
}