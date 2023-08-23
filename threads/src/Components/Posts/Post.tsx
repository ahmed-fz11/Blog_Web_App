import React from "react";
import { useState } from "react";
import Comments from "../../Containers/Comments";
import { PostProps } from "../../Utils/types";

const Post = ({
  post,
  handlePostDelete,
  currentUser,
  handlePostUpdate,
}: PostProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedBody, setEditedBody] = useState(post.body);
  const [isCommenting, setIsCommenting] = useState(false);

  const handleCommentClick = () => {
    setIsCommenting(!isCommenting);
  };

  const handleEditingClick = () => {
    setIsEditing(true);
  };
  const handleSaveClick = () => {
    setIsEditing(false);
    handlePostUpdate(post.id, { title: editedTitle, body: editedBody });
  };

  return (
    <>
      <div className="card text-center">
        <div className="card-header">
          <div>
            <h5>User id: {post.userId}</h5>
          </div>
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="form-control"
            />
          ) : (
            <h5 className="card-title">{post.title}</h5>
          )}
        </div>

        <div className="card-body">
          {isEditing ? (
            <textarea
              value={editedBody}
              onChange={(e) => setEditedBody(e.target.value)}
              className="form-control"
            />
          ) : (
            <p className="card-text">{post.body}</p>
          )}
        </div>

        <div className="card-footer">
          {post.userId === currentUser?.id && (
            <>
              {isEditing ? (
                <button
                  className="btn btn-outline-primary mx-2"
                  onClick={handleSaveClick}
                >
                  Save
                </button>
              ) : (
                <button
                  className="btn btn-outline-secondary mx-2"
                  onClick={handleEditingClick}
                >
                  Edit
                </button>
              )}
              <button
                className="btn btn-outline-danger"
                onClick={() => handlePostDelete(post.id)}
              >
                Delete
              </button>
            </>
          )}
          <button
            className="btn btn-outline-success mx-2"
            onClick={handleCommentClick}
          >
            Comment
          </button>
          {currentUser?.username && isCommenting && (
            <Comments currentUser={currentUser} postId={post.id}></Comments>
          )}
        </div>
      </div>
    </>
  );
};

export default Post;
