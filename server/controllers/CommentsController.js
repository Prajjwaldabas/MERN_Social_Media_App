// create comments 
export const createComment = async(req,res)=>{

    try {
      const { content, userId, postId, parentCommentId } = req.body;
  
      const comment = new CommentModel(
        {
  content,
  user:userId,
  post:postId,
  parentCommentId:parentCommentId
        }
      )
  
      const savedComment = await comment.save()
  
      await PostModel.findByIdAndUpdate(postId,{$push:{comments:savedComment._id}});
  
      res.status(201).json(savedComment);
      
    } catch (error) {
      res.status(500).json(error);
    }
  
  }
  
  
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
  
      const updatedComment = await Comment.findByIdAndUpdate(commentId, { content }, { new: true });
  
      res.status(200).json(updatedComment);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  
  // delete a comment
  export  const deleteComment = async (req, res) => {
    try {
      const commentId = req.params.id;
      await Comment.findByIdAndDelete(commentId);
  
      res.status(200).json('Comment deleted');
    } catch (error) {
      res.status(500).json(error);
    }
  };