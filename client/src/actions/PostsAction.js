import * as PostsApi from "../api/PostsRequests";
import { deletePost } from "../api/PostsRequests";

export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await PostsApi.getTimelinePosts(id);
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};





export const deletePostById = (postId,userId) => async (dispatch) => {
  try {
    console.log(userId)
    console.log("post deletion started");
    dispatch({ type: "DELETE_POST_START" });
    await deletePost(postId,userId);

    dispatch({ type: "DELETE_POST_SUCCESS", data: postId });
    console.log("post deleted");
  } catch (error) {
    dispatch({ type: "DELETE_POST_FAIL", error });
    console.log("post not deleted",error.message);
  }
};


