import {getTodosPosts, criarPost, atualizarPost} from "../models/postsModels.js";
import fs from "fs"
import gerarDescricaoComGemini from "../services/geminiService.js/"
export async function listarPosts(req, res) {
    const posts = await getTodosPosts();
    res.status(200).json(posts);
  };

export async function postarNovoPost(req, res) {
    const novoPost = req.Body;
    try {
      const postCriado = await criarPost(novoPost);
      res.status(200).json(novoCriado);
    } catch {erro} {
      console.error(erro.message);
      res.status(500).json({"Erro":"Falha na requisição"})
    }
  };

export async function uploadImagem(req, res) {
    const novoPost = {
      descricao: "",
      imgUrl: req.file.originalname,
      alt: ""
    }
    try {
      const postCriado = await criarPost(novoPost);
      cosnt imagemAtualizada = `uploads/${postCriado.insertedId}.png`
      fs.renameSync(req.file.path, imagemAtualizada)
      res.status(200).json(novoCriado);
    } catch {erro} {
      console.error(erro.message);
      res.status(500).json({"Erro":"Falha na requisição"})
    }
  };

export async function atulizarNovoPost (req, res) {
  const id = req.params.id;
  const utlImagem = `http://localhost:3000/${id}.png`
  
  try {
    
      const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
      const descricao = await gerarDescricaoComGemini(imgBuffer)

      const post = {
        imgURl: utlImagem,
        descricao: descricao,
        alt: req.boby.alt
      }
      const postCriado = await atualizarPost(id, post)
            res.status(200).json(postCriado)
  } cath(erro) {
      console.error(erro.mesage)
      res.status(500).json({"Erro":"Falha na requisição"})
  }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})

