import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
    content: String,


    user: { type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
        },

    parentComment: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Comment'
     },

    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },

    children: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Comment',
        },
      ],


},
{
    timestamps:true
}
)



 const Comment = mongoose.model('Comment', commentSchema);

 export default Comment;