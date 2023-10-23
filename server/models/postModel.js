import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    desc: {type: String, required : true},
    likes: [],
    comments: [
      {
          type:  mongoose.Schema.Types.ObjectId,
          ref: 'Comment'
      }
  ],
    createdAt: {
      type: Date,
      default: new Date(),
    },
    image: String,
  },
  {
    timestamps: true,
  }
);

var PostModel = mongoose.model("Post", postSchema);

export default PostModel;
