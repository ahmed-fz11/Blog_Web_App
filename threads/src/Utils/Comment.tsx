import { CommentData, User } from "../Utils/types";
import { v4 as uuidv4 } from 'uuid'

export function submitComment(
  postId: string,
  currentUser: User | null,
  comments: CommentData[],
  values: { title: string; body: string }
) {
  const newComment = {
    postId: postId,
    email: currentUser?.email || "",
    id: (uuidv4()).toString(),
    name: values.title,
    body: values.body,
  };
  localStorage.setItem(
    `comments${postId}`,
    JSON.stringify([newComment, ...comments])
  );
  return newComment;
}

export function deleteComment(postId: string, commentId: string) {
  const storedComments = localStorage.getItem(`comments${postId}`);
  if (!storedComments) {
    return;
  }
  const CommentsArray: CommentData[] = JSON.parse(storedComments);
  const newCommentsArray = CommentsArray.filter(
    (comment) => comment.id !== commentId
  );
  localStorage.setItem(`comments${postId}`, JSON.stringify(newCommentsArray));
  return newCommentsArray;
}

export function updateComment(
  comments: CommentData[],
  commentIndex: number,
  updatedComment: Partial<CommentData>,
  postId: string
) {
  //creating a new updated comment object
  const updatedCommentObject = { ...comments[commentIndex],...updatedComment }; //partial updations also catered due to spread operator
  const updatedCommentsArray = [...comments]; //copying old posts array
  updatedCommentsArray[commentIndex] = updatedCommentObject; //at index of the post object, updated post object is overwrited
  //updating local storage
  localStorage.setItem(
    `comments${postId}`,
    JSON.stringify(updatedCommentsArray)
  );
  return updatedCommentsArray;
}
