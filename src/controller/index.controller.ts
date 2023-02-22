import { Request, Response } from "express";
import Post from "../models/Blog.model";
import fs from "fs";

export default {
    deleteExistingPost: async(req: Request, res: Response) => {
        const id = req.params.id;
        const postExists = await Post.findById(id);

        if(!postExists) {
            return res.status(404).json({message: "A postagem não foi encontrada!"});
        }

        try {
            await Post.deleteOne({_id: id});
            fs.unlinkSync(postExists.pictureSrc);

            return res.status(200).json({message: "Postagem deletada com sucesso!"});
        } catch(err) {
            console.log({delete_post_error: err});
            return res.status(500).json({message: "Erro interno de servidor, tente novamente mais tarde!"});
        }
    },
    updateExistingPost: async(req: Request, res: Response) => {
        const id = req.params.id;
        const file = req.file;
        const existingPost = await Post.findById(id);

        if(!existingPost) {
            return res.status(404).json({message: "Postagem não encontrada!"});
        }

        interface iPostUpdate {
            title?: string;
            shortDescription?: string;
            description?: string;
            pictureName?: string;
            pictureSrc?: string;
        }

        const {
            title,
            shortDescription,
            description
        } = req.body;

        const updatedPost: iPostUpdate = {
            title,
            shortDescription,
            description,
        };

        if(file) {
            updatedPost.pictureName = file.filename;
            updatedPost.pictureSrc = file.path;

            fs.unlinkSync(existingPost.pictureSrc);
        }

        try {
            await Post.updateOne({_id: id}, updatedPost);

            return res.status(201).json({message: "Postagem atualizada com sucesso!"});
        } catch(err) {
            console.log({update_post_error: err});
            return res.status(500).json({message: "Erro interno de servidor, tente novamente mais tarde!"});
        }
    },
    registerNewPost: async(req: Request, res: Response) => {
        const { title, shortDescription, description, pictureName } = req.body;
        const file = req.file;
        const titleExist = await Post.findOne({title: title});

        if(!file) {
            return res.status(400).json({message: "Você precisa informar uma imagem!"});
        }

        const newPost = {
            title,
            shortDescription,
            description,
            pictureName,
            pictureSrc: file.path
        };

        if(!title) {
            return res.status(400).json({message: "O título da postagem é obrigatório!"});
        }
        if(titleExist == title) {
            return res.status(400).json({message: "Já existe uma postagem com este título, por favor tente outro!"});
        }
        if(!shortDescription) {
            return res.status(400).json({message: "Uma descrição curta da postagem é obrigatória!"});
        }
        if(!description) {
            return res.status(400).json({message: "A descrição da postagem é obrigatória!"});
        }

        try {
            await Post.create(newPost);

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
