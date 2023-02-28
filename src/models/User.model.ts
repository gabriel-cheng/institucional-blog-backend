import { model, Schema } from "mongoose";

interface iUserSchema {
    name: string;
    username: string;
    email: string;
    password: string;
}

const userSchema = new Schema<iUserSchema>({
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const User = model("User", userSchema);

export default User;
