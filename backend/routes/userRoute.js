const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotUserPassword,
  resetUserPassword,
  getUserDetails,
  updateUserPassword,
  updateUserProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const router = express.Router();
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(logoutUser);

router.route("/password/forgot").post(forgotUserPassword);

router.route("/password/reset/:token").put(resetUserPassword);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, updateUserPassword);

router.route("/me/update").put(isAuthenticatedUser, updateUserProfile);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getAllUsers);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteUser);


module.exports = router;
