import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
    content: String,


    user: { type: mongoose.Schema.Types.ObjectId,
         ref: 'Users'
        },

    parentComment: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Comment'
     },

    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts'
    }

},
{
    timestamps:true
}
)



 const Comment = mongoose.model('Comment', commentSchema);

 export default Comment;