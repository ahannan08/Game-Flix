import React from 'react';
import ProfileList from '../components/Profiles/ProfileList';
import Games from '../components/Games/Games';
import { useParams } from 'react-router';  // Change this line

const Home = () => {
  const { genreSlug } = useParams();
  console.log('GenreSlug:', genreSlug);  // Add this line to log the genreSlug

  return (
    <div>
      <h2>Games</h2>
    </div>
  );
};

export default Home;
