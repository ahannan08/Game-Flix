// ProfileDets.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { profileDetails } from './Profiles';
import "./profiledets.css"

const ProfileDets = () => {
  const { gamerName } = useParams();
  const profile = profileDetails.find(profile => profile.gamerName === gamerName);

  if (!profile) {
    return <div>Profile not found</div>;
  }

  const { image, achievements, trophies, dob, notableGames } = profile;

  return (
    <div className="profiledets">
      <div className="image">
        <img src={image} alt="gamer" />
      </div>

      <div className="name">{gamerName}</div>

      <div className="achieve">{achievements}</div>

      <div className="trophies">{trophies}</div>

      <div className="dob">{dob}</div>

      <div className="games">{notableGames}</div>
    </div>
  );
};

export default ProfileDets;
