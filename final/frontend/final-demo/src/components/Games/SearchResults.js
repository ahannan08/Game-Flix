// SearchResults.js

import React from 'react';

const SearchResults = ({ results, navigate }) => {
  const handleResultClick = (gameId) => {
    navigate(`/game/${gameId}`);
  };

  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {results.map((result) => (
          <li key={result.id} onClick={() => handleResultClick(result.id)}>
            <img src={`${result.background_image}?width=100&height=100&fit=crop`} alt={`${result.name} Cover`} />
            <p>{result.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
