import { useReducer, useEffect, Fragment } from "react";
import { getPhotosByUsername } from "../../services/firebase";
import Header from "./Header";
import Photos from "./Photos";

const reducer = (state, newState) => {
  return { ...state, ...newState };
};
const initialState = {
  profile: {},
  photoCollection: [],
  followerCount: 0,
};

function UserProfile({ user }) {
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getPhotosByUsername(user.username);

      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length,
      });
    }
    if (user) getProfileInfoAndPhotos();
  }, [user]);
  return (
    <Fragment>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <Photos photos={photosCollection} />
    </Fragment>
  );
}

export default UserProfile;
