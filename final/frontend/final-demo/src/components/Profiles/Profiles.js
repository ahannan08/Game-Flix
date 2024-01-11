import React from 'react';
import "./profiles.css"
import a from "../../assets/safwan.jpg"
import b from "../../assets/abrar.jpg"
import c from "../../assets/adnan.jpg"
import d from "../../assets/hannan.jpg"
import e from "../../assets/emaad.jpg"


import { Link } from 'react-router-dom';


const profileDetails = [
    {
        gamerName: "Spice Guy",
        image: a,
        achievements: "High-level achievements in FPS games",
        dob: "1/2/2002",
        trophies: "Winner of multiple esports tournaments",
        notableGames: "Gta 5",
    },
    {
        gamerName: "Jidane",
        image: b,
        achievements: "Top scorer in strategy games",
        dob: "2/2/2002",
        trophies: "Achieved Grandmaster rank in chess",
        notableGames: "Gta 4",
    },
    {
        gamerName: "Whitie Might",
        image: c,
        achievements: "Speedrun record holder",
        dob: "3/2/2002",
        trophies: "Completed all levels without taking damage",
        notableGames: "Gta 3",
    },
    {
        gamerName: "BlazeMaster",
        image: d, // Assuming you have an image for BlazeMaster (d)
        achievements: "Mastered various MOBA games",
        dob: "4/3/1998",
        trophies: "Champion of regional gaming league",
        notableGames: "League of Legends",
    },
    {
        gamerName: "ShadowNinja",
        image: e, // Assuming you have an image for ShadowNinja (e)
        achievements: "Stealth and strategy expert",
        dob: "5/5/2000",
        trophies: "Completed multiple games without being detected",
        notableGames: "Assassin's Creed series",
    },
];
  



const Profiles = ({ gamerName, image }) => {
    return (
        <div className="profile">
           <Link to={`/gamer/${gamerName}`}>
        <div className="image-container">
          <img src={image} alt="gamer" />
        </div>
      </Link>
            <div className='name'>{gamerName}</div>
        </div>
    );
};

export { Profiles, profileDetails };
