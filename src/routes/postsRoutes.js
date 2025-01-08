import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsControllers.js";
import cors from "cors"

const corsOptions = {origin: "http//localhost:8000",
  optionsSucessStatus: 200
}

const posts = [
    {id: 1, descricao: "Gato curioso", imagUrl: "https://placekitten.com/300/200"},
    {id: 2, descricao: "Cachorro feliz", imagUrl: "https://placekitten.com/300/200"},
    {id: 3, descricao: "Paisagem montanhosa", imagUrl: "https://placekitten.com/300/200"}
  ];

const upload = multer({dest:"./upload"})

const routes = (app) => {
    app.use(express.json())
    app.use(cors(corsOptions))
    app.get("/posts", listarPosts)
    app.post("/posts", postarNovoPost)
    app.post("/upload", upload.single("imagem"), )
    app.put("/upload/:id", atualizarNovoPost)
};

export default routes;
