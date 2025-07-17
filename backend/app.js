import express from "express"
import mysql from 'mysql2/promise'
import cors from 'cors'
import bodyParser from "body-parser"

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())

async function conectarDB() {
    try {
        const conexao = await mysql.createConnection({
            host: 'sql10.freesqldatabase.com',
            user: 'sql10790231',
            database: 'sql10790231',
            password: '1nAC3hxA8c'
        });

        return conexao
    } catch (err) {
        console.log(err);
        return "error"
    }
}

async function trazerPostagens(conexao, customquery) {
    try {
        const [results, fields] = await conexao.query(
            customquery || 'SELECT * FROM `postagens`'
        );
        return results
    } catch (error) {
        console.log(error)
    }
}

app.get('/fetch-posts', async (req, res) => {
    var conexao = await conectarDB()
    var query = await trazerPostagens(conexao, 'SELECT id_postagem, titulo, tags FROM `postagens`')

    conexao.end()
    res.send({ body: query })
})

app.get('/fetch-posts/:search', async (req, res) => {
    var conexao = await conectarDB()
    var query = await trazerPostagens(conexao, 'SELECT id_postagem, titulo, tags FROM `postagens` WHERE `titulo` LIKE "%' + req.params.search + '%" or `tags` LIKE "%' + req.params.search + '%"')

    conexao.end()
    res.send({ body: query })
})

app.get('/postagem/:id', async (req, res) => {
    // id -> req.params.id
    var conexao = await conectarDB()
    var query = await trazerPostagens(conexao, "SELECT * FROM `postagens`")
    var encontrado

    query.entries().forEach(postagem => {
        if (postagem[1].id_postagem == req.params.id) {
            encontrado = postagem
        }
    });

    conexao.end()
    res.send(encontrado)
})

app.post('/create-post', async (req, res) => {
    var conexao = await conectarDB()

    var data_hoje = new Date()

    try {
        const [results, fields] = await conexao.execute(
            'INSERT INTO `postagens` (`titulo`, `conteudo`, `data_criacao`, `tags`) VALUES (?, ?, ?, ?)',
            [req.body.titulo, req.body.conteudo, data_hoje, req.body.tags]
        );
    } catch (error) {
        console.log(error)
    }

    conexao.end()
    res.send("ao gumma coisa")
})

app.listen(port, () => {
    console.log(`Express iniciado na porta ${port}`)
})
