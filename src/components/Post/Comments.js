import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import AddComment from "./AddComment";

function Comments({ docId, commentInput, posted, comments: allComments }) {
  const [comments, setComments] = useState(allComments);
  return (
    <Fragment>
      <div className=" p-4 pt-1">
        {comments.length >= 3 && (
          <p className=" text-sm text-gray-base mb-1 cursor-pointer">
            View all comments
          </p>
        )}
        {comments.slice(0, 3).map((item) => (
          <p key={`${item.comment}-${item.displayName}`} className=" mb-1">
            <Link to={`/p/${item.displayName}`}>
              <span className=" mr-1 font-bold">{item.displayName}</span>
            </Link>
            <span>{item.comment}</span>
          </p>
        ))}
        <p className=" text-gray-base uppercase text-sm mt-2">
          {formatDistance(posted, new Date())} ago
        </p>
      </div>
      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </Fragment>
  );
}

export default Comments;
Comments.propTypes = {
  docId: PropTypes.string.isRequired,
  commentInput: PropTypes.object.isRequired,
  posted: PropTypes.number.isRequired,
  comments: PropTypes.array.isRequired,
};
