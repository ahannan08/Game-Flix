// App.js

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/Navbar/Navbar';
import ProfileDets from './components/Profiles/ProfileDets';
import GameDetails from './components/Games/GameDetails';
import ProfileList from './components/Profiles/ProfileList';
import Games from './components/Games/Games';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Registration/Register';
import FavoriteGames from './components/Games/FavoriteGames'; // Import the new component
import Footer from './components/Footer/Footer';
import AdminDashboard from './pages/AdminDashboard';

const genreSlugs = ['action', 'adventure', 'arcade', 'puzzle', 'racing', 'sports'];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favoriteGames, setFavoriteGames] = useState([]);


  return (
    <div className="App">
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <ProfileList/>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/gamer/:gamerName" element={<ProfileDets />} />
        <Route path="/game/:id" element={<GameDetails />} />
        <Route path='/login'  element={<Login setIsLoggedIn={setIsLoggedIn} />}/>

        <Route path='/register' element={<Register/>}/>

        {/* Routes for each genre */}
        {genreSlugs.map((genreSlug, index) => (
          <Route key={index} path={`/${genreSlug}`} element={<Games genreSlug={genreSlug} favoriteGames={favoriteGames} setFavoriteGames={setFavoriteGames} />} />
        ))}

        {/* Default route */}
        <Route path="/" element={<Games genreSlug="action" favoriteGames={favoriteGames} setFavoriteGames={setFavoriteGames} />} />

        {/* Route for the "/favgames" page */}
<Route path="/favgames" element={<FavoriteGames favoriteGames={favoriteGames} setFavoriteGames={setFavoriteGames} />} />

      {/* Route for the admin dashboard */}
      <Route path="/admin" element={<AdminDashboard/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
