import React from 'react';
import './styles/favgames.css'; // Import the favgames.css file

const FavoriteGames = ({ favoriteGames }) => {
  console.log('All favorite games:', favoriteGames);

  return (
    <div className="FavGameCardsContainer">
      {favoriteGames.map(game => {
        // Filter out games without a valid id or other necessary properties
        const isValidFavoriteGame = game.gameId && game.image && game.name;

        if (!isValidFavoriteGame) {
          console.warn('Invalid favorite game:', game);
          return null; // Skip rendering if the game is invalid
        }

        return (
          <div key={game.id} className="FavGameCard">
            <img
              src={`${game.image}?width=100&height=100&fit=crop`}
              alt={`${game.name} Cover`}
            />
            <div className="FavGameCardInfo">
              <h3>{game.name}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FavoriteGames;
