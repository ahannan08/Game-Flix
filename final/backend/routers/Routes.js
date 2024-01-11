import { Login, Register , getUserFavorites, addFavorite, removeFavorite } from "./Controller.js";
import express from "express";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);

export default router;  // Use 'default' to export the router
// In your backend Routes.js file or equivalent



// Fetch user's favorite games
router.get('/user/:userId/favorites', getUserFavorites);

// Add a game to user's favorites
router.post('/user/:userId/favorites', addFavorite);

// Remove a game from user's favorites
router.delete('/user/:userId/favorites/:gameId', removeFavorite);

