import express from 'express';
import { isAdminRoute, protectRoute } from '../middlewares/authMiddleware.js';
import { activateUserProfile, changeUserPassword, deleteUserProfile, getNotificationList, getTeamList, loginUser, logoutUser, markNotificationsList, registerUser, updateUserProfile } from '../controllers/userController.js';

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/get-team", protectRoute, isAdminRoute, getTeamList);
router.get("/notifications", protectRoute, getNotificationList);

router.put("/profile", protectRoute, updateUserProfile);
router.put("/read-noti", protectRoute, markNotificationsList);
router.put("/change-password", protectRoute, changeUserPassword);

//For admin only Admin Routes
router
.route("/:id")
    .put(protectRoute, isAdminRoute, activateUserProfile)
    .delete(protectRoute, isAdminRoute, deleteUserProfile)


export default router;