import express from "express";
import conectaNoDB from "./config/dbconnect.js";

const conexao = await conectaNoDB();

conexao.on("error", (erro) => {
    console.error("Erro de conexão", erro);
});

conexao.once("open", () => {
    console.log("Conexão com BD conectado com sucesso!");
});

const app = express();

app.use(express.json());

const livros = [
    {
        id: 1,
        titulo: "O senhor dos aneis",
    },
    {
        id: 2,
        titulo: "O Hobbit",
    },

]

function buscaLivro(id) {
    return livros.findIndex(livro => {
        return livro.id === Number(id);
    })
}

app.get("/", (req, res) => {
    res.status(200).send("Curso de node.js");
});

app.get("/livros", (req, res) => {
    res.status(200).json(livros);
});

app.get("/livros/:id", (req, res) => {
    res.status(200).json(livros[buscaLivro(req.params.id)]);
});

app.post("/livros", (req, res) => {
    livros.push(req.body);
    res.status(201).send("Registro criado");
});

app.put("/livros/:id", (req, res) => {
    livros[buscaLivro(req.params.id)].titulo = req.body.titulo;
    res.status(200).send(livros);
})

app.delete("/livros/:id", (req, res) => {
    livros.splice(buscaLivro(req.params.id), 1);
    res.status(200).send(livros);
})

export default app; 