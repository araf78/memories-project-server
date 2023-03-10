import PostMessage from '../models/postMessage.js'
import mongoose from "mongoose";

export const getPosts = async (req, res) =>{
    // res.send('post this')
    try {
        const postMessages = await PostMessage.find();   
        
        res.status(200).json(postMessages)
    } catch (error) {
        console.log(error.message)
        res.status(404).json({message: error.message})
    }
}

export const createPost =  async (req, res) => {
    // res.send('post creation')
    const post = req.body;

    const newPost = new PostMessage(post);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message: error.message});
        console.log(error.message)
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params; 
    const post = req.body;


    if( !mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatePost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, { new: true})
    
    res.json(updatePost)
}

export const deletePost = async (req, res) => {
    const {id: _id} = req.params;

    if( !mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndRemove(_id);

    res.send({message: 'Post deleted successfully'});   
}

export const likePost = async (req, res) => {
    const { id }  = req.params;

    const post = req.body;

    if( !mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const updatedPost = await PostMessage.findOneAndUpdate(id, { likeCount: post.likeCount + 1}, { new: true});

    res.send(updatedPost);
}