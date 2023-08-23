import React from "react";
import { useState } from "react";
import { CommentProps } from "../../Utils/types";

const Comment = ({
  currentUser,
  comment,
  handleCommentDelete,
  handleCommentUpdate,
}: CommentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(comment.name);
  const [editedBody, setEditedBody] = useState(comment.body);

  const handleEditingClick = () => {
    setIsEditing(true);
    setEditedTitle(comment.name);
    setEditedBody(comment.body);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    handleCommentUpdate(comment.postId, comment.id, comment.email, {
      name: editedTitle,
      body: editedBody,
    });
  };

  return (
    <>
      <div className="card text-center text-bg-dark">
        <div className="card-header">
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="form-control"
            />
          ) : (
            <h5 className="card-title">{comment.name}</h5>
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
            <p className="card-text">{comment.body}</p>
          )}
        </div>

        <div className="card-footer">
          {comment.email === currentUser?.email && (
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
                onClick={() => handleCommentDelete(comment.id)}
              >
                Delete
              </button>
            </>
          )}
          <p>{comment.email}</p>
        </div>
      </div>
    </>
  );
};

export default Comment;
