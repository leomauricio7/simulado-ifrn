const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Question = require('../models/question');

const router = express.Router();

//router.use(authMiddleware);

router.get('/', async (req, res) => {
   try {
    const questions = await Question.find().populate('user');
    res.status(200).json(questions);
   } catch (err) {
       console.log(err);
    return res.status(400).send({ error: "Erro na listagem das questões." });
   }
});

router.get('/:questionId', async (req, res) => {
    try {
        const question = await Question.findById(req.params.questionId).populate('user');
        res.status(200).json(question);
    } catch (err) {
        return res.status(400).send({ error: "Erro na listagem da questão." });
    }
});

router.post('/', async (req, res) => {
    try {
        const data = req.body;//capturando os dados enviados na requisicao
        const question = await Question.create(data);//passando os dados do projeto

        await question.save();//so executa depois que todas as promisses forem realizadas

        return res.status(200).json(question);
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: "Falha no cadastro da questão."});
    }
});

router.put('/:questionId', async (req, res) => {
    try {
        const data = req.body;//capturando os dados enviados na requisicao
        const question = await Question.findByIdAndUpdate(req.params.questionId, data, { new: true });//passando os dados do projeto, o params *new: true* serve para retorna o objeto atualizado

        question.save();//so executa depois que todas as promisses forem realizadas

        return res.status(200).json(question);
    } catch (err) {
        return res.status(400).send({ error: "Falha no atualização da questão."});
    }
});

router.delete('/:questionId', async (req, res) => {
    try {
        await Question.findByIdAndRemove(req.params.questionId);
        res.status(200).json({});
    } catch (err) {
        return res.status(400).send({ error: "Erro na remoção da questão." });
    }
});

module.exports = app => app.use('/questions', router);