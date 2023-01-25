import { Request, Response } from "express";
import Post from "../models/Blog.model";

export default {
    deleteExistingPost: async(req: Request, res: Response) => {
        const id = req.params.id;

        try {
            const postExists = await Post.findById(id);

            if(!postExists) {
                return res.status(404).json({message: "A postagem não foi encontrada!"});
            }

            await Post.deleteOne({_id: id});

            return res.status(200).json({message: "Postagem deletada com sucesso!"});
        } catch(err) {
            console.log({delete_post_error: err});
            return res.status(500).json({message: "Erro interno de servidor, tente novamente mais tarde!"});
        }
    },
    updateExistingPost: async(req: Request, res: Response) => {
        const id = req.params.id;
        const { title, nameImage, shortDescription, description } = req.body;

        const updatedPost = {
            title,
            nameImage,
            shortDescription,
            description
        };

        try {
            const existingPost = await Post.findById(id);

            if(!existingPost) {
                return res.status(404).json({message: "Postagem não encontrada!"});
            }

            await Post.updateOne({_id: id}, updatedPost);

            return res.status(201).json({message: "Postagem atualizada com sucesso!"});
        } catch(err) {
            console.log({update_post_error: err});
            return res.status(500).json({message: "Erro interno de servidor, tente novamente mais tarde!"});
        }
    },
    registerNewPost: async(req: Request, res: Response) => {
        const { title, nameImage, shortDescription, description } = req.body;
        const titleExist = await Post.findOne({title: title});

        const newPostContains = {
            title,
            nameImage,
            shortDescription,
            description
        };

        if(!title) {
            return res.status(400).json({message: "O título da postagem é obrigatório!"});
        }
        if(titleExist == title) {
            return res.status(400).json({message: "Já existe uma postagem com este título, por favor tente outro!"});
        }
        if(!nameImage) {
            return res.status(400).json({message: "A imagem é obrigatória!"});
        }
        if(!shortDescription) {
            return res.status(400).json({message: "Uma descrição curta da postagem é obrigatória!"});
        }
        if(!description) {
            return res.status(400).json({message: "A descrição da postagem é obrigatória!"});
        }

        try {
            await Post.create(newPostContains);

            return res.status(201).json({message: "Postagem criada com sucesso!"});
        } catch(err) {
            console.log({create_new_post_request_error: err});
            return res.status(500).json({message: "Erro interno de servidor, tente novamente mais tarde!"});
        }
    },
    findPostBtId: async(req: Request, res: Response) => {
        const id = req.params.id;

        try {
            const post = await Post.findById(id);

            return res.status(200).json(post);
        } catch(err) {
            console.log({find_post_by_id_request_error: err});
            return res.status(500).json({message: "Erro interno de servidor, tente novamente mais tarde!"});
        }
    },
    findAllPosts: async(req: Request, res: Response) => {
        try {
            const posts = await Post.find();

            return res.status(200).json(posts);
        } catch(err) {
            console.log({find_all_posts_request_error: err});
            return res.status(500).json({message: "Erro interno de servidor, tente novamente mais tarde!"});
        }
    }
};
