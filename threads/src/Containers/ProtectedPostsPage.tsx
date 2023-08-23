import { User } from "../Utils/types";
import { Navigate } from "react-router-dom";
import PostsPage from "./PostsPage";

const ProtectedPostsPage = ({ currentUser }: { currentUser: User | null }) => {
  if (currentUser) {
    //someone is logged in
    return <PostsPage currentUser={currentUser} />;
  } else {
    //no one is logged in
    return <Navigate to="/auth"></Navigate>;
  }
};

export default ProtectedPostsPage;
