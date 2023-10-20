import * as UserApi from "../api/UserRequests";


export const updateUser=(id, formData)=> async(dispatch)=> {
    dispatch({type: "UPDATING_START"})
    try{
        const {data} = await UserApi.updateUser(id, formData);
        console.log("Action ko receive hoa hy ye : ",data)
        dispatch({type: "UPDATING_SUCCESS", data: data})
    }   
    catch(error){
        dispatch({type: "UPDATING_FAIL"})
    }
}


export const followUser = (id, data) => async (dispatch, getState) => {
    try {
      // Make the API call to follow the user
      await UserApi.followUser(id, data);
  
      // Update the user's data in the Redux store
      const state = getState();
      const updatedUser = { ...state.authReducer.authData.user };
      updatedUser.following.push(id);
  
      // Dispatch actions to update the user's data and the follow state
      dispatch({ type: "FOLLOW_USER", data: id });
      dispatch({ type: "UPDATE_USER_DATA", data: updatedUser });
    } catch (error) {
      // Handle errors
    }
  };
  
  export const unfollowUser = (id, data) => async (dispatch, getState) => {
    try {
      // Make the API call to unfollow the user
      await UserApi.unfollowUser(id, data);
  
      // Update the user's data in the Redux store
      const state = getState();
      const updatedUser = { ...state.authReducer.authData.user };
      updatedUser.following = updatedUser.following.filter((followedId) => followedId !== id);
  
      // Dispatch actions to update the user's data and the follow state
      dispatch({ type: "UNFOLLOW_USER", data: id });
      dispatch({ type: "UPDATE_USER_DATA", data: updatedUser });
    } catch (error) {
      // Handle errors
    }
  };
  

export const  getUserById = (id) => async (dispatch) => {
    dispatch({ type: "GET_USER_START" });
  
    try {
      const { data } = await UserApi.getUser(id);
      dispatch({ type: "GET_USER_SUCCESS", data });
      return data; // Return the user data
    } catch (error) {
      dispatch({ type: "GET_USER_FAIL" });
      throw error;
    }
  };




