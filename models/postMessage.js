import mongoose from "mongoose";

//  mongodb create a document look absolutely different have title, message and so on. 
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount:{
        type: Number,
        default: 0
    },
    createdAt:{
        type: Date,
        default: new Date()
    }
});
// why we use model?
// Models are responsible for creating and reading documents from the underlying MongoDB database.
const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;

