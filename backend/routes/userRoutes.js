// import express from 'express';
// import { protect } from '../middleware/authMiddleware.js';
// import {
//     register,
//     login,
//     updateProfile,
//     resetPassword,
//     getCurrentUser
// } from '../controllers/userControllers/authController.js';

// const router = express.Router();

// // Public routes
// router.post('/register', register);
// router.post('/login', login);
// router.post('/reset-password', resetPassword);

// // Protected routes
// router.use(protect); // Middleware to protect routes below
// router.get('/me', getCurrentUser);
// router.put('/update-profile', updateProfile);

// export default router;
import express from 'express';
import { loginUser, newUser } from '../controllers/userControllers/authController.js';
import { getCurrentUserProfile, getProfileById, updateProfile } from '../controllers/userControllers/profileController.js';
import { checkTokenExpiration, testmiddleware } from '../middleware/authMiddleware.js';
const userRoutes = express.Router();

// Register a new user
userRoutes.post('/register/newuser', newUser)
userRoutes.post('/login', loginUser);


userRoutes.use(testmiddleware)
userRoutes.use(checkTokenExpiration)

userRoutes.get('/:uid/profile', getProfileById);
userRoutes.put('/:uid/profile/update', updateProfile);
userRoutes.get('/:uid/profile/me', getCurrentUserProfile);


export default userRoutes;