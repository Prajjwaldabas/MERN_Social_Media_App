import * as AuthApi from "../api/AuthRequests";
export const logIn = (formData, navigate) => async (dispatch) => {

 
  dispatch({ type: "AUTH_START" });

  try {
    
    const { data } = await AuthApi.logIn(formData);

    console.log(data)
    dispatch({ type: "AUTH_SUCCESS", data: data });
    navigate("../home", { replace: true });
  } catch (error) {
    
    if (error.response && error.response.status === 400) {
     
      console.log("Wrong email or password");

      dispatch({ type: "LOGIN_FAIL"});
  
    } else {
      console.error(error);
    }
    dispatch({ type: "AUTH_FAIL" ,error:true});
  }
};


export const signUp = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  
  try {
    const { data } = await AuthApi.signUp(formData);
   
   
    dispatch({ type: "AUTH_SUCCESS", data: data });
    navigate("../home", { replace: true });
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAIL" });
  }
};


export const logout = ()=> async(dispatch)=> {
  dispatch({type: "LOG_OUT"})
}




