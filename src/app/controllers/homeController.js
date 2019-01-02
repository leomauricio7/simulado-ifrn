const express = require('express');
const Question = require('../models/question');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get("/", async (req, res, next) => {
    res.render('/index.html');
})

router.get('/gera-simulado', async (req, res) => {
   try {
    const questions = await Question.aggregate(
        [
            { $match: {} },
            { $sample: { size: 40 } } ,
            { $sort: { _id: -1 } }
    ]);
    res.status(200).json(questions);
    //console.log(questions);
   } catch (err) {
       console.log(err);
    return res.status(400).send({ error: "Erro na geração das questões." });
   }
});

//verifica se está logado
router.get('/isAuth', /*auth,*/ (req, res) => {
    res.status(200).send('Logado!');
});


module.exports = app => app.use('/', router);