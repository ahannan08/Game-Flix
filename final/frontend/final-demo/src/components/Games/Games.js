// Games.js

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './styles/games.css';


const apiKey = 'f74303b6dcd14ddb855d20cc09168aed';
const apiUrl = 'https://api.rawg.io/api';

const genreButtons = [
  { name: 'Action', slug: 'action' },
  { name: 'Adventure', slug: 'adventure' },
  { name: 'Arcade', slug: 'arcade' },
  { name: 'Puzzle', slug: 'puzzle' },
  { name: 'Racing', slug: 'racing' },
  { name: 'Sports', slug: 'sports' },
];

const pageSize = 8;

const isFavorite = (game, favoriteGames) => favoriteGames.some(favorite => favorite.gameId === game.id);

const Games = ({ genreSlug, favoriteGames, setFavoriteGames }) => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const cardContainerRef = React.createRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (!genreSlug) {
      // If genreSlug is undefined, default to 'action'
      fetch(`${apiUrl}/games?key=${apiKey}&genres=action`)
        .then(response => response.json())
        .then(data => {
          setGames(data.results);
        })
        .catch(error => console.error('Error fetching games:', error));
    } else {
      // Fetch games for the specified genre
      fetch(`${apiUrl}/games?key=${apiKey}&genres=${genreSlug}`)
        .then(response => response.json())
        .then(data => {
          setGames(data.results);
        })
        .catch(error => console.error('Error fetching games:', error));
    }
  }, [genreSlug]);

  const scrollLeft = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const scrollRight = () => {
    setPage(prevPage => prevPage + 1);
  };

  
  const toggleFavorite = async (game) => {
    try {
      const userId = localStorage.getItem('userId');
  
      if (!userId) {
        console.error('User ID not available');
        return;
      }
  
      const isAlreadyFavorite = isFavorite(game, favoriteGames);
  
      if (isAlreadyFavorite) {
        console.log('Game is already in favorites. Skipping toggle.');
        return;
      }
  
      // Create a new set with unique games
      const uniqueFavoriteGames = new Set([...favoriteGames, { id: game.id, gameId: game.id, image: game.background_image, name: game.name }]);
  
      // Convert the set back to an array
      const uniqueFavoriteGamesArray = Array.from(uniqueFavoriteGames);
  
      // Update the state with unique games
      setFavoriteGames(uniqueFavoriteGamesArray);
  
      const { id: gameId, background_image: image, name } = game;
  
      const response = await fetch(`http://localhost:3004/auth/user/${userId}/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ gameId, image, name }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Favorite toggled successfully. New favorite games:', data.favoriteGames);
      } else {
        console.error('Error toggling favorite:', data.message);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };
  



  
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const displayedGames = games.slice(startIndex, endIndex);

  return (
    <div className="TwoColumnLayout">
      {/* Left column with genre buttons */}
      <div className="GenreButtons">
        {genreButtons.map((genreButton, index) => (
          <button key={index} onClick={() => navigate(`/${genreButton.slug}`)}>
            {genreButton.name}
          </button>
        ))}
      </div>

      {/* Right column with game cards */}
      <div className="GameCardsContainer">
        <h1>List of {genreSlug ? `${genreSlug.charAt(0).toUpperCase()}${genreSlug.slice(1)} Games` : 'Games'}</h1>

        {/* Game cards */}
        <div className="GameCards" ref={cardContainerRef}>
          {displayedGames.map(game => (
            <div key={game.id} className="Card">
              <img
                src={`${game.background_image}?width=100&height=100&fit=crop`}
                alt={`${game.name} Cover`}
              />
              <h2>{game.name}</h2>
              <p>Release Date: {game.released}</p>
              <p>Rating: {getStarRating(game.rating)}</p>
              {/* Heart icon */}
              <div className="FavoriteIcon" onClick={() => toggleFavorite(game)}>
  <FavoriteBorderIcon style={{ color: isFavorite(game, favoriteGames) ? 'red' : 'black' }} />
</div>

              {/* "See More" button linking to GameDetails */}
              <div className="CardFooter">
                <Link to={`/game/${game.id}`} state={{ game }}>
                  <button className='seemore'> See More</button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll buttons */}
        <button className="ScrollButton LeftScrollButton" onClick={scrollLeft}>
          {'<'}
        </button>
        <button className="ScrollButton RightScrollButton" onClick={scrollRight}>
          {'>'}
        </button>
      </div>
    </div>
  );
};

// Function to convert a rating to a star representation
const getStarRating = rating => {
  const starCount = Math.round(rating);
  return '★'.repeat(starCount) + '☆'.repeat(5 - starCount);
};

export default Games;
