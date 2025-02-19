import express from 'express';
import { loginUser, newUser } from '../controllers/userControllers/authController.js';
import { getCurrentUserProfile, getProfileById, updateProfile } from '../controllers/userControllers/profileController.js';
import { addNewFollowing, followUser, removeFollowing, unfollowUser } from '../controllers/userControllers/connectivityController.js';
import { checkTokenExpiration } from '../middleware/authMiddleware.js';

const userRoutes = express.Router();

// Register a new user
userRoutes.post('/register/newuser', newUser)
userRoutes.post('/login', loginUser);

userRoutes.use(checkTokenExpiration)

userRoutes.get('/:uid/profile', getProfileById);
userRoutes.put('/:uid/profile/update', updateProfile);
userRoutes.get('/:uid/profile/me', getCurrentUserProfile);

// Connectivity routes
userRoutes.post('/:uid/follow/:fid', followUser);
userRoutes.post('/:uid/unfollow/:fid', unfollowUser);
userRoutes.post('/:uid/add-new-following/:fid', addNewFollowing);
userRoutes.post('/:uid/remove-following/:fid', removeFollowing);



export default userRoutes;