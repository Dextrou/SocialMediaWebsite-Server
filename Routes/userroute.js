import express from 'express';
import { deleteUser, followerUser, getUser, unfollowUser, updateUser } from '../Controllers/UserControllers.js';

const userRoute = express.Router();

userRoute.get('/:id',getUser)
userRoute.put('/:id',updateUser)
userRoute.delete('/:id',deleteUser)
userRoute.put('/:id/follow',followerUser)
userRoute.put('/:id/unfollow',unfollowUser)
export default userRoute;