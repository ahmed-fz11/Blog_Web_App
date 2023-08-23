import { User,PostType } from "./types";
import { v4 as uuidv4 } from 'uuid'

export function PostSubmit(currentUser:User|null,posts:PostType[],values: { title: string; body: string })
{
    const newPost = {userId: currentUser?.id || "",id: (uuidv4()).toString(),...values,};
    localStorage.setItem("posts", JSON.stringify([newPost, ...posts]));
    return newPost;
}

export function PostDelete(postId:string,)
{
    const storedPosts = localStorage.getItem("posts");
    if (!storedPosts) {
      return;
    }
    const postsArray: PostType[] = JSON.parse(storedPosts);
    const newPostsArray = postsArray.filter((post) => post.id !== postId);
    localStorage.setItem("posts", JSON.stringify(newPostsArray));
    return newPostsArray;
}

export function UpdatePost(posts:PostType[],postIndex:number,updatedPost: Partial<PostType>)
{
    //creating a new updated post object
    const updatedPostObject = { ...posts[postIndex], ...updatedPost }; //partial updations also catered due to spread operator
    const updatedPostsArray = [...posts]; //copying old posts array
    updatedPostsArray[postIndex] = updatedPostObject; //at index of the post object, updated post object is overwrited
    //updating local storage
    localStorage.setItem("posts", JSON.stringify(updatedPostsArray));
    return updatedPostsArray;
}

export function Logout()
{
    localStorage.removeItem("currentUser");
}