import axios from "axios";

export const fetchComments = async (postId:string) => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );
      return response;
    } catch (error) {
      throw error;
    }
  };