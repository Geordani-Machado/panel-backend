
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const compression = require('compression');
const https = require('https');
const http = require('http');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const db = require('./config/keys').mongoURI;
const CronJob = require('cron').CronJob;
const crons = require('./config/crons');

var Usuario  = require('./models/usuarios');



require('dotenv').config();

// Instantiate express
const app = express();
app.use(compression());

// Passport Config
require('./config/passport')(passport);

// DB Config

// Connect to MongoDB
mongoose
    .connect(
        db, {useNewUrlParser: true,
          useFindAndModify: false,
          useUnifiedTopology: true,
          useCreateIndex: true},
    )
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));

app.use(cors());



// Express body parser
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// REACT BUILD for production
if (process.env.NODE_ENV === 'PROD') {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}


// Initialize routes middleware
app.use('/api/users', require('./routes/users'));

// run at 3:10 AM -> delete old tokens
const tokensCleanUp = new CronJob('10 3 * * *', function() {
  crons.tokensCleanUp();
});
tokensCleanUp.start();

const PORT = process.env.PORT;

app.listen(process.env.PORT || +PORT);

/**
 * @param {int} req req.
 * @param {int} res res.
 * @param {int} next next.
 * @return {void} none.
 */
function requireHTTPS(req, res, next) {
  if (!req.secure) {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}



mongoose.connect('mongodb://Zoe:pbywk%40mb%23123%23@cluster0-shard-00-01.2qyho.mongodb.net:27017/myFirstDatabase?authSource=admin&replicaSet=atlas-h5kba0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'); //via Modulus
//mongoose.connect('mongodb://localhost/node-api'); //aqui caso queira executar de maneira local usando o MongoDb

/** Configuração da variável 'app' para usar o 'bodyParser()'.
 * Ao fazermos isso nos permitirá retornar os dados a partir de um POST
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Rotas da nossa API: 
//==============================================================

/* Aqui o 'router' irá pegar as instâncias das Rotas do Express */
var router = express.Router();

/* Middleware para usar em todos os requests enviados para a nossa API- Mensagem Padrão */
router.use(function(req, res, next) {
    console.log('Algo está acontecendo aqui........');
    next(); //aqui é para sinalizar de que prosseguiremos para a próxima rota. E que não irá parar por aqui!!!
});

/* Rota de Teste para sabermos se tudo está realmente funcionando (acessar através: GET: http://localhost:8000/api) */
router.get('/', function(req, res) {
    res.json({ message: 'YEAH! Seja Bem-Vindo a nossa API' });
});

// Rotas que irão terminar em '/usuarios' - (servem tanto para: GET All & POST)
router.route('/usuarios')

    /* 1) Método: Criar Usuario (acessar em: POST http://localhost:8080/api/usuarios */
    .post(function(req, res) {
        var usuario = new Usuario();

        //aqui setamos os campos do usuario (que virá do request)
        usuario.nome = req.body.nome;
        usuario.numero = req.body.numero;
        usuario.empresa = req.body.empresa;

        usuario.save(function(error) {
            if(error)
                res.send(error);
                        
            res.json({ message: 'Usuário criado!' });
        });
    })

    /* 2) Método: Selecionar Todos (acessar em: GET http://locahost:8080/api/usuarios) */
    .get(function(req, res) {

        //Função para Selecionar Todos os 'usuarios' e verificar se há algum erro:
        Usuario.find(function(err, usuarios) {
            if(err)
                res.send(err);

            res.json(usuarios);
        });
    });

// Rotas que irão terminar em '/usuarios/:usuario_id' - (servem tanto para GET by Id, PUT, & DELETE)
router.route('/usuarios/:usuario_id')

    /* 3) Método: Selecionar Por Id (acessar em: GET http://localhost:8080/api/usuarios/:usuario_id) */
    .get(function(req, res) {

        //Função para Selecionar Por Id e verificar se há algum erro:
        Usuario.findById(req.params.usuario_id, function(error, usuario) {
            if(error) 
                res.send(error);

            res.json(usuario);
        });
    })

    /* 4) Método: Atualizar (acessar em: PUT http://localhost:8080/api/usuarios/:usuario_id) */
    .put(function(req, res) {

        //Primeiro: Para atualizarmos, precisamos primeiro achar o Usuario. Para isso, vamos selecionar por id:
        Usuario.findById(req.params.usuario_id, function(error, usuario) {
            if(error) 
                res.send(error);
            
            //Segundo: Diferente do Selecionar Por Id... a resposta será a atribuição do que encontramos na classe modelo:
            usuario.nome = req.body.nome;
            usuario.numero = req.body.numero;
            usuario.empresa = req.body.empresa;

            //Terceiro: Agora que já atualizamos os campos, precisamos salvar essa alteração....
            usuario.save(function(error) {
                if(error)
                    res.send(error);

                res.json({ message: 'Usuário Atualizado!' });
            });
        });
    })

    /* 5) Método: Excluir (acessar em: http://localhost:8080/api/usuarios/:usuario_id) */
    .delete(function(req, res) {

        //Função para excluir os dados e também verificar se há algum erro no momento da exclusão:
        Usuario.remove({
        _id: req.params.usuario_id
        }, function(error) {
            if(error)
                res.send(error);

            res.json({ message: 'Usuário excluído com Sucesso! '});
        });
    });

/* Todas as nossas rotas serão prefixadas com '/api' */
app.use('/api', router);

//Iniciando o Servidor (Aplicação):
//==============================================================
app.listen(port);
console.log('Iniciando a aplicação na porta ' + port);



