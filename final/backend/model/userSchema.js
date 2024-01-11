import mongoose from "mongoose";

// Define user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  
  favoriteGames: [{ 
    gameId: String,
    image: String,
    name: String,
   }],
});

// Create a user model using the schema
const User = mongoose.model("User", userSchema);

export default User; // Export the User model
