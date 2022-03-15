import { useState, useEffect, Fragment, useContext } from "react";
import Skeleton from "react-loading-skeleton";
import UserContext from "../../context/User";
import useUser from "../../hooks/useUser";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";

function Header({
  photosCount,
  followerCount,
  setFollowerCount,

  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    following,
    followers,
    username: profileUsername,
  },
}) {
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.uid);
  const [isFollowingProfile, setIsFollowingProfile] = useState(null);
  const activeBtnFollow =
    user && user.username && user.username !== profileUsername;

  useEffect(() => {
    async function isLoggedInUserFollowingProfile() {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profileUserId
      );
      setIsFollowingProfile(!!isFollowing);
    }

    if (user?.username && profileUserId) isLoggedInUserFollowingProfile();
  }, [user?.username, profileUserId]);

  const handleToggleFollow = async () => {
    setIsFollowingProfile((prevVal) => !prevVal);

    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    });

    await toggleFollow(
      isFollowingProfile,
      user.docId,
      profileDocId,
      profileUserId,
      user.userId
    );
  };
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className=" container flex justify-center items-center">
        {profileUsername ? (
          <img
            src={`/images/avatars/${profileUsername}.jpg`}
            alt={`${profileUsername} profile avatar`}
            className=" rounded-full h-40 w-40 flex"
          />
        ) : (
          <img
            src={`/images/avatars/mahmoud.jpg`}
            alt={`mahmoud profile avatar`}
            className=" rounded-full h-40 w-40 flex"
          />
        )}
      </div>
      <div className=" flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className=" text-2xl mr-4">{profileUsername}</p>
          {activeBtnFollow && (
            <button
              type="button"
              className=" bg-blue-medium font-bold text-sm rounded w-20 h-8 text-white"
              onClick={handleToggleFollow}
            >
              {isFollowingProfile ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
        <div className=" container flex mt-4">
          {!followers || !following ? (
            <Skeleton count={1} height={24} width={677} />
          ) : (
            <Fragment>
              <p className=" mr-10">
                <span className=" font-bold">{photosCount}</span>
                photos
              </p>
              <p className=" mr-10">
                <span className=" font-bold">{followerCount}</span>
                followers
              </p>
              <p className=" mr-10">
                <span className=" font-bold">{following.length}</span>
                following
              </p>
            </Fragment>
          )}
        </div>
        <div className=" container mt-4">
          <p className=" font-bold">
            {!fullName ? (
              <Skeleton count={1} height={24} width={500} />
            ) : (
              fullName
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Header;
