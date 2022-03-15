import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  updateLoggedInUserFollowing,
  updateFollowedUserFollowers,
} from "../../services/firebase";

function SuggestedProfile({
  username,
  profileDocId,
  profileId,
  userId,
  loggedInUserDocId,
}) {
  const [followed, setFollowed] = useState(false);

  const handleFollowUser = async () => {
    setFollowed(true);
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
    await updateFollowedUserFollowers(profileDocId, loggedInUserDocId, false);
  };

  return !followed ? (
    <div className="flex flex-row items-center justify-between">
      <div className="flex items-center justify-between">
        <img
          src={`/images/avatars/${username}.jpg`}
          alt=""
          className=" rounded-full w-8 flex mr-3"
        />

        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>

      <button
        type="button"
        className=" text-xs font-bold text-blue-medium"
        onClick={handleFollowUser}
      >
        Follow
      </button>
    </div>
  ) : null;
}

export default SuggestedProfile;
SuggestedProfile.propType = {
  username: PropTypes.string.isRequired,
  profileDocId: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string.isRequired,
};
