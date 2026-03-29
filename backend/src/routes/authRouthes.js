const { Router } = require("express");
const {
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
} = require("../controllers/authContorllers");

const router = Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/logout", logout);
router.post("/auth/refresh", refreshToken);
router.get("/auth/me", getMe);

router.post("/auth/forgot-password", forgotPassword);
router.post("/auth/reset-password", resetPassword);
router.post("/auth/change-password", changePassword);

router.post("/auth/verify-email/send", sendEmailVerification);
router.post("/auth/verify-email/confirm", confirmEmailVerification);
router.post("/auth/verify-phone/send", sendPhoneVerification);
router.post("/auth/verify-phone/confirm", confirmPhoneVerification);

router.get("/users/:id", getUserById);
router.patch("/users/me", updateMyProfile);// required authentication or auth user
router.delete("/users/me", deleteMyAccount);// required authentication or auth user

router.get("/users/me/addresses", listMyAddresses); // required authentication or auth user
router.post("/users/me/addresses", addMyAddress); // required authentication or auth user
router.patch("/users/me/addresses/:addressId", updateMyAddress); // required authentication or auth user
router.delete("/users/me/addresses/:addressId", deleteMyAddress); // required authentication or auth user
router.patch("/users/me/addresses/:addressId/default", setDefaultMyAddress); // required authentication or auth user

router.get("/admin/users", listAdminUsers); // required admin user
router.patch("/admin/users/:id", updateAdminUser); // required admin user
router.delete("/admin/users/:id", deleteAdminUser); // required admin user

router.get("/auth/google", authGoogle);
router.get("/auth/google/callback", authGoogleCallback);

router.post("/auth/2fa/setup", setup2FA);
router.post("/auth/2fa/verify", verify2FA);
router.post("/auth/2fa/disable", disable2FA);

module.exports = router;
