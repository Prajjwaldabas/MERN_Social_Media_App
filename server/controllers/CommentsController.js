// create comments 
import CommentModel from '../models/comments.js'
import PostModel from '../models/postModel.js';

export const createComment = async (req, res) => {
    try {
      const { content, userId, postId, parentComment } = req.body;
  
      const comment = new CommentModel({
        content,
        user: userId,
        post: postId,
        parentComment,
      });
  
      const savedComment = await comment.save();
  
      if (parentComment) {
        // If it's a child comment, update the parent comment to include this child comment.
        await CommentModel.findByIdAndUpdate(parentComment, {
          $push: { children: savedComment._id },
        });
      } else {
        // If it's a top-level comment, update the post to include this comment.
        await PostModel.findByIdAndUpdate(postId, {
          $push: { comments: savedComment._id },
        });
      }
  
      res.status(201).json(savedComment);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };
  
  
  
  // get comments
  
  export  const getComments = async (req,res)=>{
    try {
      const postId = req.params.id;
  
      const comments = await CommentModel.find({post:postId}).populate('user');
  
      res.status(200).json(comments);
  
  
  
    } catch (error) {
      res.status(500).json(error);
    }
  }
  
  
  // update a comment
  export const updateComment = async (req, res) => {
    try {
      const commentId = req.params.id;
      const { content } = req.body;
  
      const updatedComment = await CommentModel.findByIdAndUpdate(commentId, { content }, { new: true });
  
      res.status(200).json(updatedComment);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  
  // delete a comment
 export const deleteComment = async (req, res) => {
    const  commentId  = req.params.commentId;
    try {
      await deleteCommentAndChildren(commentId);
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error deleting comment");
    }
  };
  

  //delete child along with parent comment

  const deleteCommentAndChildren = async (commentId) => {
    // Find the comment and its children
    const comment = await CommentModel.findById(commentId);
    if (!comment) return;
  
    // Delete the comment
    await CommentModel.findByIdAndDelete(commentId);
  
    // Recursively delete children
    for (const childId of comment.children) {
        
        
      await deleteCommentAndChildren(childId);
    }
  };

  