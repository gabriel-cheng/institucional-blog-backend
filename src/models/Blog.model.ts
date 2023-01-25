import { model, Schema } from "mongoose";

interface iPostSchema {
    title: string,
    nameImage: string,
    shortDescription: string,
    description: string
}

const postSchema = new Schema<iPostSchema>({
    title: {type: String, required: true},
    nameImage: {type: String, required: true},
    shortDescription: {type: String, required: true},
    description: {type: String, required: true}
});

const Post = model("Post", postSchema);

export default Post;
