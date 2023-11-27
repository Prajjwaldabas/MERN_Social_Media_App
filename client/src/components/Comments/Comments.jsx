
import React, { useState } from 'react';
import { addComment } from '../../api/PostsRequests';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';

const Comments = ({ comment, postComments, isFirstChildOfFirstParent,data }) => {
// console.log(typeof(setParentComment))

const { user } = useSelector((state) => state.authReducer.authData);
    const [showChildComments, setShowChildComments] = useState(false);
    const [showCommentInput,setShowCommentInput] = useState(false)
    const [commentValue,setCommentValue] = useState("")
    const [parentComment,setParentComment] = useState(null);
    const [localComments, setLocalComments] = useState(postComments);
    const[loading,setLoading] = useState(false)

    const commentStyle = isFirstChildOfFirstParent ? { marginLeft: '3rem' } : {};

    const handleReply = ()=>{
        setParentComment(comment?._id)
        setShowCommentInput(!showCommentInput)

    }

    const handlePostComment = async () => {
        setCommentValue("");
        setShowCommentInput(false);
        try {
          setLoading(true);
          const response = await addComment(user._id, data?._id, commentValue, parentComment);
          if (response.status === 201) {
            const newComment = response.data;
      
            // Log the previous and updated localComments
            console.log("Previous localComments:", localComments);
            setLocalComments((prevComments) => [...prevComments, newComment]);
            console.log("Updated localComments:", localComments);
      
            // If it's a child comment, update the parent comment's children array
            if (parentComment) {
              setLocalComments((prevComments) =>
                prevComments.map((comment) =>
                  comment._id === parentComment
                    ? { ...comment, children: [...comment.children, newComment._id] }
                    : comment
                )
              );
            }
      
            setLoading(false);
      
            console.log("Reply comment created");
          }
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      };
      
    
    

      console.log(comment)
      
    return ( 


         loading ? (<Loader/>) : (
        <div>
            <div className="flex g-3px fd-col" style={{ position: "relative" }}>
                <div className="flex fd-col">
                    <div className='flex'>

                 
                    <img
                        className="comment-profile"
                        src={
                            comment?.user.profilePicture
                                ? process.env.REACT_APP_PUBLIC_FOLDER + comment.user.profilePicture
                                : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"
                        }
                        alt=""
                    />
                    <div className="flex fd-col comment">
                        <div className="flex g-3px">
                            <p className="fs-13 fwb">{comment?.user.firstname}</p>
                            <p className="fs-13 fwb">{comment?.user.lastname}</p>
                        </div>
                        <div>
                            <p className="fs-13">{comment?.content}</p>
                        </div>
                        <div className='reply-container'>
                        <span className="fwb fs-13 replyBtn " onClick={handleReply} >Reply</span>
                        {comment?.children ? (
                            <span onClick={() => setShowChildComments(!showChildComments)}>
                               {comment?.children?.length === 1  ? "view 1 more reply" : comment?.children?.length > 1 ? `view ${comment?.children.length} more replies` : ""}
 
                            </span>
                        ) : ""}

{/* {console.log(comment.children)} */}
                        
                        </div>

                    
                       
                    </div>
                    </div>
                    {
                            showCommentInput && 
                            <div className='flex g-10' style={{width:"50%"}}>
                                <input type="text"  
                                 placeholder={`Reply to ${comment?.user.firstname} ${ comment?.user.lastname}...`} 
                                 value={commentValue} 
                                 onChange={(e)=>setCommentValue(e.target.value)}/>
                                <button className='button' onClick={handlePostComment}>Post</button>
                            </div>
                        }
                </div>
            </div>
            {comment?.children && comment?.children.length > 0 && showChildComments && (
                
                <div className="child-comments" style={commentStyle}>

                 
                    {comment?.children.map((childId, index) => {
{console.log(childId)}

{console.log(postComments)}
                        const childComment = localComments.find((item) => item._id === childId);
                        // {console.log(childComment)}
                        return (
                            <Comments
                                key={index}
                                comment={childComment}
                                postComments={postComments}
                                isFirstChildOfFirstParent={isFirstChildOfFirstParent}
                                setParentComment={setParentComment}
                                
                            />
                        );
                    })}
                </div>
            )}
        </div>
         )
                
    );
};

export default Comments;
