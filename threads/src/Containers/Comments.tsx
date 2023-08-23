import React from "react";
import { useState, useEffect } from "react";
import FormCreatePost from "../Components/Posts/FormCreatePost";
import Comment from "../Components/Comments/Comment";
import { FormikHelpers } from "formik";
import { fetchComments } from "../Services/comment";
import { CommentData, CommentsProps } from "../Utils/types";
import { deleteComment, submitComment, updateComment } from "../Utils/Comment";
import { v4 as uuidv4 } from 'uuid'

const Comments = ({ currentUser, postId }: CommentsProps) => {
  const [comments, setComments] = useState<CommentData[]>([]);

  //if local storage has comments, load from local storage
  //else load posts from api if local storage was empty
  useEffect(() => {
    const storedComments = localStorage.getItem(`comments${postId}`);
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    } else {
      fetchData();
    }
  }, []);

  //fetching posts and saving them in local storage
  const fetchData = async () => {
    try {
      const response = await fetchComments(postId);
      setComments(response.data);
      localStorage.setItem(`comments${postId}`, JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleCommentSubmit = (
    values: { title: string; body: string },
    { resetForm }: FormikHelpers<{ title: string; body: string }>
  ) => {
    const newComment = submitComment(postId,currentUser,comments,values);
    setComments((prevComments) => [newComment, ...prevComments]);
    // Clearing after successful commenting
    resetForm();
  };

  const handleCommentDelete = (commentId: string) => {
    const newCommentsArray = deleteComment(postId,commentId) || [];
    setComments([...newCommentsArray]);
  };

  const handleCommentUpdate = (
    postId: string,id: string,email: string, updatedComment: Partial<CommentData>) => {
    //getting index of comment which is to be updated
    const commentIndex = comments.findIndex((comment) => comment.id === id);
    if (commentIndex !== -1) {
        const updatedCommentsArray = updateComment(comments,commentIndex,updatedComment,postId);
        //updating the state
        setComments(updatedCommentsArray);
    }
  };

  return (
    <>
      <div className="mx-3 p-2 mt-2">
        <FormCreatePost name="Comment" handlePostSubmit={handleCommentSubmit} />
        <ul className="list-unstyled">
          {comments.map((comment) => (
            <li className="mt-2" key={uuidv4()}>
              <Comment
                handleCommentDelete={handleCommentDelete}
                handleCommentUpdate={handleCommentUpdate}
                comment={comment}
                currentUser={currentUser}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Comments;
