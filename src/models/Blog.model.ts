import { model, Schema } from "mongoose";

interface iPostSchema {
    title: string,
    shortDescription: string,
    description: string,
    pictureName: string,
    pictureSrc: string,
    date: Date
}

const postSchema = new Schema<iPostSchema>({
    title: {type: String, required: true},
    shortDescription: {type: String, required: true},
    description: {type: String, required: true},
    pictureName: {type: String, required: true},
    pictureSrc: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

const Post = model("Post", postSchema);

export default Post;
