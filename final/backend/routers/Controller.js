import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/userSchema.js';
import mongoose from 'mongoose';

// Register route
const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Check if this is the first user
    const isFirstUser = (await User.countDocuments({})) === 0;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword, isAdmin: isFirstUser });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Login route
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'b', { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      user: {
        name: user.name,
        email: user.email,
        token,
        userId: user._id,
        favoriteGames: user.favoriteGames || [],
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Fetch user's favorite games
const getUserFavorites = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select('favoriteGames');
    res.json({ favoriteGames: user.favoriteGames || [] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const addFavorite = async (req, res) => {
  try {
    const { userId } = req.params;
    const { gameId, image, name } = req.body;

    console.log('Received request to add favorite:', { userId, gameId, image, name });

   // Check if the gameId is a valid ObjectId or has a different format
const isGameIdValid = mongoose.Types.ObjectId.isValid(gameId);

if (!isGameIdValid) {
  console.log('Received gameId with a different format:', gameId);
  // Handle accordingly
}


    // Find the user
    const user = await User.findById(userId);

    if (!user) {
      console.error('User not found:', userId);
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the game is already in favorites (using both gameId and name)
    const isGameInFavorites = user.favoriteGames.some((favorite) => {
      console.log('Checking game in favorites:');
      
      // Convert gameId to string for consistent comparison
      const gameIdAsString = gameId.toString();
      
      return favorite.gameId === gameIdAsString && favorite.name === name;
    });
    
    if (isGameInFavorites) {
      console.log('Game is already in favorites. Skipping addition.');
      return res.status(400).json({ message: 'Game already in favorites' });
    }
    
    // Add the game to favorites only if it doesn't already exist
    user.favoriteGames.push({ gameId, image, name });
    await user.save();
    
    console.log('Game added to favorites successfully. New favorite games:', user.favoriteGames);
    
    res.json({ favoriteGames: user.favoriteGames || [] });
    
  } catch (error) {
    console.error('Add Favorite Controller Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




// Remove a game from user's favorites
const removeFavorite = async (req, res) => {
  try {
    const { userId, gameId } = req.params;

    // Find the user and update their favorite games
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { favoriteGames: gameId } },
      { new: true }
    );

    res.json({ favoriteGames: user.favoriteGames || [] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { Login, Register, getUserFavorites, addFavorite, removeFavorite };
