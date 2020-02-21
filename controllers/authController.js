const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');
const mail = require('../handlers/mail');

//Sending email
const postmark = require('postmark');
const client = new postmark.ServerClient("e64bad85-384d-4c23-9f54-e04afd3e2ad6");

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

// exports.forgot= (req, res) =>{

// };

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
	const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
	await mail.send({
		user,
		subject: 'Password Reset',
		resetURL,
		filename: 'password-reset'
	});
	// await mail.send({
	//   from: 'ian@specri.com',
	//   to: user,
	//   subject: 'Reset Password Request',
	//   text: 'Click here to reset your password: '
	// });
	req.flash('success', 'Email reset sent. Please check your email for the reset code.');
	// Redirect to login page
	res.redirect('/login');
};

exports.reset = async (req, res) => {
	const user = await User.findOne({
		resetPasswordToken: req.params.token,
		resetPasswordExpires: { $gt: Date.now() }
	});
	if(!user){
		req.flash('error', 'Password reset is invalid or has expired');
		return res.redirect('/login');
	}
	//If there is a user, show reset password form
	res.render('reset', { title: 'Reset your Password'});
};

exports.confirmedPasswords = (req, res, next) => {
	if(req.body.password === req.body['password-confirm']){
		next();
		return;
	}
	req.flash('error', 'Passwords do not match.');
	res.redirect('back');
};

exports.update = async (req, res) => {
	const user = await User.findOne({
		resetPasswordToken: req.params.token,
		resetPasswordExpires: { $gt: Date.now() }
	});

	if(!user){
		req.flash('error', 'Password reset is invalid or has expired');
		return res.redirect('/login');
	}

	const setPassword = promisify(user.setPassword, user);
	await setPassword(req.body.password);
	user.resetPasswordToken = undefined;
	user.resetPasswordExpires = undefined;
	const updatedUser = await user.save();
	await req.login(updatedUser);
	req.flash('success', 'Password has been reset. You are now logged in.');
	res.redirect('/');
};