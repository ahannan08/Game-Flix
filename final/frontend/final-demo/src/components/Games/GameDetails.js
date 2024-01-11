  // GameDetails.js

  import React from 'react';
  import { useLocation } from 'react-router-dom';
  import './styles/gamedetails.css'; // Import the CSS file

  const GameDetails = () => {
    const location = useLocation();
    const game = location.state?.game;

    if (!game) {
      // Handle the case where game is undefined
      console.error('GameDetails - Game is undefined');
      return <div>Loading...</div>;
    }

    return (
      <div className="GameDetailsContainer">
        <img className="GameDetailsImage" src={game.background_image} alt={`${game.name} Cover`} />
        <div className="GameDetailsDetails">
          <h1>{game.name}</h1>
          <p>Release Date: {game.released}</p>
          <p>Platforms: {game.platforms?.map(platform => platform.platform.name).join(', ')}</p>
          <p>Developers: {game.developers?.map(developer => developer.name).join(', ')}</p>
          <p>Genre: {game.genres?.map(genre => genre.name).join(', ')}</p>
          <p>Publisher: {game.publishers?.map(publisher => publisher.name).join(', ')}</p>
          <p>Description: {game.description_raw}</p>
        </div>
      </div>
    );
  };

  export default GameDetails;
