// In your backend controller file (e.g., adminController.js)
import User from "../model/userSchema.js";

// Controller function to get all logged-in users and their favorite games
const getAllLoggedInUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Log the number of users
    console.log('Number of logged-in users:', users.length);

    // Extract relevant information (e.g., email and favorite games) and send it to the client
    const userData = users.map(user => ({
      email: user.email,
      favoriteGames: user.favoriteGames, // Assuming favoriteGames is an array of game objects
    }));

    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { getAllLoggedInUsers };
