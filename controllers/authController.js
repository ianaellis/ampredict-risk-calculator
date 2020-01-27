const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.login = passport.authenticate('local', {
	failureRedirect: '/login',
	failureFlash: "Failed Login!",
	successRedirect: '/',
	successFlash: 'You are now logged in.'
});

exports.logout = (req, res) => {
	req.logout();
	req.flash('success', 'Successfully logged out')
	res.redirect('/');
};

exports.isLoggedIn = (req, res, next) => {
	//Check if user is authenticated
	if(req.isAuthenticated()) {
		next();
		return;
	}
	req.flash('error', 'You must be logged in to view this page.');
	res.redirect('/login');
};

exports.forgot = async (req, res) => {
	// See if user exists
	const user = await User.findOne({ email: req.body.email });
	if(!user) {
		req.flash('error', 'A password reset has been mailed to you if your account exists');
		return res.redirect('/login');
	}
	// Reset tokens and expire on their account
	user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
	user.resetPasswordExpires = Date.now() + 3600000;
	await user.save();
	// Send them an email with token
	const resetURL = `http://${req.headers.host}.account/reset/${user.resetPasswordToken}`;
	// Redirect to login page
	req.flash('success', 'Email reset sent. Please check your email for the reset code.');

};