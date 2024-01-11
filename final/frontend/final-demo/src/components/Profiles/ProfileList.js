import React from 'react'
import { Profiles, profileDetails} from "./Profiles"
const ProfileList = () => {
  return (
    <div  className="profile-list">
    {profileDetails.map((profile, index) => (
        <Profiles
            key={index}
            gamerName={profile.gamerName}
            image={profile.image}
        />
    ))}
</div>
    )
}

export default ProfileList