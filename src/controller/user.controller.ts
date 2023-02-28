import User from "../models/User.model";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default {
    login: async(req: Request, res: Response) => {
        const { username, password } = req.body;
        const user = await User.findOne({username: username});

        if(!user) {
            return res.status(404).json({message: "Usuário não encontrado!"});
        }
        if(!username) {
            return res.status(404).json({message: "O username é obrigatório!"});
        }
        if(!password) {
            return res.status(401).json({message: "A senha é obrigatória!"});
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if(!checkPassword) {
            return res.status(400).json({message: "Senha incorreta!"});
        }

        try {
            const secret = process.env.SECRET || "defaultSecret";

            const token = jwt.sign({
                id: user._id,
                username: user.username
            }, secret);

            return res.status(200).json({
                message: "Autenticação realizada com sucesso!",
                token: token}
            );
        } catch(err) {
            console.log({user_login_error: err});
            return res.status(500).json({message: "500 - Internal Server Error"});
        }
    },
    deleteUser: async(req: Request, res: Response) => {
        const id = req.params.id;
        const userFinded = await User.findById(id);

        if(!userFinded) {
            return res.status(404).json({message: "Usuário não encontrado!"});
        }

        try {
            await User.deleteOne({id:userFinded._id});

            return res.status(200).json({message: "Usuário deletado com sucesso!"});
        } catch(err) {
            console.log({delete_user_error: err});
            return res.status(500).json({message: "500 - Internal Server Error"});
        }
    },
    registerNewUser: async(req: Request, res: Response) => {
        const { name, username, email, password } = req.body;
        const salt = await bcrypt.genSalt(12);
        const passHash = await bcrypt.hash(password, salt);

        interface iUserInterface {
            name: string;
            username: string;
            email: string;
            password: string;
        }

        const newUser: iUserInterface = {
            name,
            username,
            email,
            password: passHash
        };

        if(!name) {
            return res.status(400).json({message: "O nome é obrigatório!"});
        }
        if(!username) {
            return res.status(400).json({message: "O username é obrigatório!"});
        }
        if(!email) {
            return res.status(400).json({message: "O e-mail é obrigatório!"});
        }
        if(!password) {
            return res.status(400).json({message: "A senha é obrigatória!"});
        }

        try {
            await User.create(newUser);

            return res.status(201).json({message: "Usuário criado com sucesso!"});
        } catch(err) {
            console.log({register_new_user_error: err});
            return res.status(500).json({message: "500 - Internal Server Error"});
        }
    },
    findUserById: async(req: Request, res: Response) => {
        const id = req.params.id;
        const userFinded = await User.findById(id);

        if(!userFinded) {
            return res.status(404).json({message: "Usuário não encontrado!"});
        }

        try {
            return res.status(200).json(userFinded);
        } catch(err) {
            console.log({find_user_by_id_error: err});
            return res.status(500).json({message: "500 - Internal Server Error"});
        }
    },
    getAllUsers: async(req: Request, res: Response) => {
        const allUsers = await User.find();

        try {
            return res.status(200).json(allUsers);
        } catch(err) {
            console.log({find_all_users_error: err});
            return res.status(500).json({message: "500 - Internal Server Error"});
        }
    }
};
