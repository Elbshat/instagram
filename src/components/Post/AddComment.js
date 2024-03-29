import { useState, useContext } from "react";
import PropTypes from "prop-types";
import UserContext from "../../context/User";
import FirebaseContext from "../../context/firebase";

function AddComment({ docId, commentInput, setComments, comments }) {
  const [comment, setComment] = useState("");
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const {
    user: { displayName },
  } = useContext(UserContext);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    setComments([...comments, { displayName, comment }]);
    setComment("");
    firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ displayName, comment }),
      });
  };

  return (
    <div className=" border-t border-gray-primary">
      <form
        className=" flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={(e) =>
          comment.length >= 1 ? handleSubmitComment(e) : e.preventDefault()
        }
      >
        <input
          aria-label="Add a comment"
          autoComplete="off"
          className=" text-sm text-gray-base w-full mr-3 py-5 px-4"
          type="text"
          name="add-comment"
          placeholder="Add a comment... "
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          ref={commentInput}
        />
        <button
          className={` text-sm font-bold text-blue-medium ${
            !comment && "opacity-25"
          }`}
          type="button"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default AddComment;
AddComment.propTypes = {
  docId: PropTypes.string.isRequired,
  commentInput: PropTypes.object.isRequired,
  setComments: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired,
};
