import React, { useState, useEffect } from "react";
import { FormikHelpers } from "formik";
import Post from "../Components/Posts/Post";
import FormCreatePost from "../Components/Posts/FormCreatePost";
import { useNavigate } from "react-router-dom";
import { fetchPosts } from "../Services/post";
import { User, PostType } from "../Utils/types";
import { PostSubmit ,PostDelete, Logout, UpdatePost} from "../Utils/Post";
import { v4 as uuidv4 } from 'uuid'

const PostsPage = ({ currentUser }: { currentUser: User | null }) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const navigate = useNavigate();

  //fetching posts and saving them in local storage 
  const fetchData = async () => {
    try {
      const response = await fetchPosts();
      setPosts(response.data);
      localStorage.setItem("posts", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  //if local storage has posts, load from local storage
  //else load posts from api if local storage was empty
  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    } else {
      fetchData();
    }
  }, []);

  const handlePostSubmit = (
    values: { title: string; body: string },
    { resetForm }: FormikHelpers<{ title: string; body: string }>
  ) => {
    const newPost = PostSubmit(currentUser,posts,values);
    setPosts((prevPosts) => [newPost, ...prevPosts]);
    // Clearing after successful posting
    resetForm();
  };

  const handlePostDelete = (postId: string) => {
    const newPostsArray = PostDelete(postId) || [];
    setPosts([...newPostsArray]);
  };

  const handlePostUpdate = (postId: string, updatedPost: Partial<PostType>) => {
    //getting index of post which is to be updated
    const postIndex = posts.findIndex((post) => post.id === postId);
    if (postIndex !== -1) {
      //creating a new updated post object
      const updatedPostsArray = UpdatePost(posts,postIndex,updatedPost);
      //updating the state
      setPosts(updatedPostsArray);
    }
  };

  const handleLogout = () => {
    Logout();
    navigate("/auth");
  };

  return (
    <>
      <div
        className="d-flex align-items-center justify-content-between p-2"
        style={{
          backgroundImage:
            "linear-gradient(to bottom right, rgba(255, 255, 0, 0.397), rgba(247, 11, 216, 0.39))",
        }}
      >
        <div className="mx-4 d-flex align-items-center">
          <i className="bi bi-chat-left-quote fs-4 me-2"></i>
          <h4 className="mx-1">Threads</h4>
        </div>
        <div className="d-flex mx-2">
          {currentUser?.username && (
            <>
              <h4 className="mx-2">Welcome: {currentUser?.username}</h4>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
      <div className="mx-3 p-2 mt-2">
        {currentUser?.username && (
          <FormCreatePost name="Post" handlePostSubmit={handlePostSubmit} />
        )}
        <ul className="list-unstyled">
          {posts.map((post) => (
            <li key={uuidv4()} className="mt-2">
              <Post
                handlePostUpdate={handlePostUpdate}
                post={post}
                handlePostDelete={() => handlePostDelete(post.id)}
                currentUser={currentUser}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PostsPage;
