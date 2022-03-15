import { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import LoggedInUserContext from "../context/LoggedInUser";
import usePhotos from "../hooks/usePhotos";
import Post from "./Post/Post";

function TimeLine() {
  const { user } = useContext(LoggedInUserContext);
  const { photos } = usePhotos(user);

  return (
    <div className=" container sm:col-span-2 order-2 sm:order-1">
      {!photos ? (
        <Skeleton count={4} width={640} height={400} className=" mb-5" />
      ) : (
        photos.map((content) => <Post key={content.docId} content={content} />)
      )}
      {photos?.length === 0 && (
        <p className="flex justify-center font-bold">
          Follow other people to see Photos
        </p>
      )}
    </div>
  );
}

export default TimeLine;
