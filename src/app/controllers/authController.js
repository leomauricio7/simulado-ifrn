const express = require('express');
//importando a biblioteca de criptografia
const bcrypt = require('bcryptjs');
//importando a biblioteca de geração de token 
const jwt = require('jsonwebtoken');
//importando biblioteca crypto que ja vem instalada com o nodejs para gerar um token na recuperação da senha
const crypto = require('crypto');
//importando o config onde fica o hash da aplicação
const authConfig = require('../../config/auth');
//importando o mailer configurado
const mailer = require('../../modules/mailer');
//importando a model do user
const User = require('../models/users');
//criando a variavel das rotas
const router = express.Router();

//função para gerar token 
function generateToken( params = {} ){
    /*
    * Gerando o Token
    * função sign() recebe parametros o primeiro é o objeto que diferencia cada usuário
    * segundo é um hash unico da aplicação que fica salvo na pasta config no arquivo auth.json
    * terceiro é o tempo de duração do token nesse exemplo demos um dia para expirar
    */
    return jwt.sign( params, authConfig.secret, { expiresIn: '12h', } );
}

//async -> serve para informa que é uma função assincrona
//await -> serve fazer o comando esperar o processo terminar
//OBS: so pode usar a função await em funções async

//rota para cadastrar usuários
router.post('/register', async (req, res) => {
    //pegando o email para verificar se ja existe um email cadastrado
    const { email } = req.body;
    try {
        //verifica se o email ja existe
        if(await User.findOne({ email }))
            return res.status(400).json({error: 'Email duplicado'}); 

        //registrando o usuário
        const user = await User.create(req.body);
        //removendo a senha para não retorna para o usuário
        user.password = undefined;
        return res.json({ 
            user,
            token: generateToken({ id: user._id }),
        });
    }
    catch(err){
        return res.status(400).json({ error: 'Registro Falhou' });
    }
});

//rota para autentificar usuários
router.post('/authenticate', async (req, res) => {
    //pegando os dados de autentificacao
    const { email, password } = req.body;
    //verificar se existe o email no banco de dados
    const user = await User.findOne({ email }).select('+password');
    //verifica se encontrou algum usuário
    if(!user)
        return res.status(400).json('Email inválido');
    //verifica a senha enviada
    if(!await bcrypt.compare(password, user.password))
        return res.status(400).json('Senha inválida');
    //removendo a senha
    user.password = undefined;

    //se logou normalmente
    return res.json({ 
        user,
        token: generateToken({ id: user.id }),
    });
});

//rota pra recuperar senha
router.post('/forgot-password', async (req, res) => {
    //pega o email do user
    const { email } = req.body;
    try {
        //procura pelo o email informado
        const user = await User.findOne({email});
        //verifica se existe o email
        if(!user)
            return res.status(400).json('Email não cadastrado');
        //criando um token aleatorio com o crypto de 20 caracteres e hexadecimal
        const token = crypto.randomBytes(20).toString('hex');
        //tempo de duracao do token de uma hora
        const now = new Date();
        now.setHours(now.getHours() + 1);

        await User.findOneAndUpdate({ _id: user.id }, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        });
        //console.log(token, now);
        //enviando o email de recuperação
        mailer.sendMail({
            to: email,
            from: 'suporte@sif.com.br',
            template: 'auth/forgot-password',
            context: { token },
        }, (err) => {
            if(err)
                return res.status(400).json('Error: Email não enviado, tente novamente!');
            return res.json();
        });
    }
    catch(err){
        return res.status(400).json('Erro no processamento, tente novamente!');
    }
});

//rota de resertar senha
router.post('/reset-password/:token', async (req, res) => {
    const token = req.params.token;
    console.log(token);
    const { email, password } = req.body;  //pegando os dados da requisição
    try {
        const user = await User.findOne({ email }).select('+passwordResetToken passwordResetExpires');//pesquisando o usuário
        if(!user)//verificando se o usuário é valido
            return res.status(400).json("Usuário não existe, verifique seus dados.");
        if(token !== user.passwordResetToken)//verificando se o token é valido
            return res.status(400).json("Token inválido.");
        const now = new Date();//pegando a data atual
        if(now > user.passwordResetExpires)//verificando se o token expirou
            return res.status(400).json("Token expirou.");
        user.password = password;//setando a nova senha enviada pelo usuário
        await user.save();//salvando os novos dados da senha
        res.json();
    } catch(err){
        res.status(400).json("Error na recuperação da senha, tente novamente.");
    }
});
//module.exports recebe o parametro app que repassa para o app.use uma rota
// o primeiro parametro é o prefixo da rota e o segundo é rota criada
module.exports = app => app.use('/auth', router);
