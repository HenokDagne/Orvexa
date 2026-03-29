const { registerHandler } = require("../middleware/auth/authMiddleware");
const { loginHandler } = require("../middleware/auth/loginMiddleware");
const { logoutHandler } = require("../middleware/auth/logoutMiddleware");
const { refreshTokenHandler } = require("../middleware/auth/refreshTokenMiddleware");
const { getMeHandler } = require("../middleware/auth/authUserMiddleware");
const { getUserByIdHandler } = require("../middleware/user/getUserById");
const { updateMyProfileHandler } = require("../middleware/user/updateMyProfile");
const { deleteMyAccountHandler } = require("../middleware/user/deleteMyAccount");
const {
	forgotPasswordHandler,
	resetPasswordHandler,
	changePasswordHandler,
} = require("../middleware/auth/passwordMiddleware");
const {
	sendEmailVerificationHandler,
	confirmEmailVerificationHandler,
} = require("../middleware/auth/EmailMiddleware");
const {
	sendPhoneVerificationHandler,
	confirmPhoneVerificationHandler,
} = require("../middleware/auth/phoneMiddleware");

function notImplemented(name) {
	return (req, res) => {
		res.status(501).json({
			ok: false,
			endpoint: name,
			message: "Handler mapped. Implement business logic in authContorllers.js.",
		});
	};
}

const register = registerHandler;
const login = loginHandler;
const logout = logoutHandler;
const refreshToken = refreshTokenHandler;
const getMe = getMeHandler; 

const forgotPassword = forgotPasswordHandler;
const resetPassword = resetPasswordHandler;
const changePassword = changePasswordHandler;

const sendEmailVerification = sendEmailVerificationHandler;
const confirmEmailVerification = confirmEmailVerificationHandler;

// not finishing this endpoint
const sendPhoneVerification = sendPhoneVerificationHandler;
const confirmPhoneVerification = confirmPhoneVerificationHandler;


const getUserById = getUserByIdHandler;
const updateMyProfile = updateMyProfileHandler;
const deleteMyAccount = deleteMyAccountHandler;

const listMyAddresses = notImplemented("listMyAddresses");
const addMyAddress = notImplemented("addMyAddress");
const updateMyAddress = notImplemented("updateMyAddress");
const deleteMyAddress = notImplemented("deleteMyAddress");
const setDefaultMyAddress = notImplemented("setDefaultMyAddress");

const listAdminUsers = notImplemented("listAdminUsers");
const updateAdminUser = notImplemented("updateAdminUser");
const deleteAdminUser = notImplemented("deleteAdminUser");

const authGoogle = notImplemented("authGoogle");
const authGoogleCallback = notImplemented("authGoogleCallback");

const setup2FA = notImplemented("setup2FA");
const verify2FA = notImplemented("verify2FA");
const disable2FA = notImplemented("disable2FA");

module.exports = {
	register,
	login,
	logout,
	refreshToken,
	getMe,
	forgotPassword,
	resetPassword,
	changePassword,
	sendEmailVerification,
	confirmEmailVerification,
	sendPhoneVerification,
	confirmPhoneVerification,
	getUserById,
	updateMyProfile,
	deleteMyAccount,
	listMyAddresses,
	addMyAddress,
	updateMyAddress,
	deleteMyAddress,
	setDefaultMyAddress,
	listAdminUsers,
	updateAdminUser,
	deleteAdminUser,
	authGoogle,
	authGoogleCallback,
	setup2FA,
	verify2FA,
	disable2FA,
};
