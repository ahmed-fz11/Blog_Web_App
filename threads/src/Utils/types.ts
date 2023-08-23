import { FormikHelpers } from "formik";

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

export interface PostType {
  userId: string;
  id: string;
  title: string;
  body: string;
}

export interface CommentData {
  postId: string;
  id: string;
  name: string;
  email: string;
  body: string;
}

export interface PostData {
  userId: string;
  id: string;
  title: string;
  body: string;
}

export interface PostProps {
  post: PostData;
  handlePostDelete: (id: string) => void;
  currentUser: User | null;
  handlePostUpdate: (postId: string, updatedPost: Partial<PostData>) => void;
}

export interface CommentProps {
  currentUser: User | null;
  comment: CommentData;
  handleCommentDelete: (id: string) => void;
  handleCommentUpdate: (
    postId: string,
    id: string,
    email: string,
    updatedComment: Partial<CommentData>
  ) => void;
}

export interface CommentsProps {
  postId: string;
  currentUser: User | null;
}

export interface FormCreatePostProps {
  name:string;
  handlePostSubmit: (
    values: { title: string; body: string },
    { resetForm }: FormikHelpers<{ title: string; body: string }>
  ) => void;
}

export interface FormSignUpProps {
  handleSignUp: (values: { username: string; email:string; password: string; }) => void;
}

export interface FormLoginProps {
  handleLogin: (values: { email: string; password: string }) => void;
}