// In your backend route file (e.g., adminRoutes.js)
import express from 'express';
import { getAllLoggedInUsers } from './adminController.js';
import User from '../model/userSchema.js';

const adminRouter = express.Router();

const checkAdmin = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
  
      if (user && user.isAdmin) {
        next();
      } else {
        res.status(403).json({ message: 'Permission denied' });
        console.log(user)
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
// API endpoint to get all logged-in users and their favorite games
adminRouter.get('/admin/users', checkAdmin, getAllLoggedInUsers);

export default adminRouter;
