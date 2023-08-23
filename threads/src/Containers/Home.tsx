import { User } from "../Utils/types";
import { Navigate } from "react-router-dom";

const Home = ({ currentUser }: { currentUser: User | null }) => {
  if (currentUser) {
    //someone logged in
    return <Navigate to="/posts"></Navigate>;
  } else {
    //no one logged in
    return <Navigate to="/auth"></Navigate>;
  }
};

export default Home;
