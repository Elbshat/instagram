import { useState, useEffect } from "react";

import { getPhotos } from "../services/firebase";

function usePhotos(user) {
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    async function getTimelinePhotos() {
      if (user?.following?.length > 0) {
        const followedUserPhotos = await getPhotos(user.userId, user.following);

        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
        setPhotos(followedUserPhotos);
      } else {
        setPhotos([]);
      }
    }
    getTimelinePhotos();
  }, [user]);

  return { photos };
}

export default usePhotos;
