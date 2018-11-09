const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

module.exports = (req, res, next) => {
    //verificando a autorização do header
    const authHeader = req.headers.authorization;
    //verifica se existe algum token
    if(!authHeader)
        return res.status(401).send({ error: 'Token não informado' });
    //verifica se é um token valido
    //token valido possui duas partes Bearer e um hash
    const parts = authHeader.split(' ');
    //verifica se possui duas partes
    if(!parts.length === 2)
        return res.status(401).send({ erro: 'Token error' });
    //pegando as partes do token
    const [ scheme, token ] =  parts;
    //verifica se existe a parte bearer
    if(!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: 'Token malformatado' });
    //verifica se o token é valido
    jwt.verify(token , authConfig.secret, (err, decoded) => {
        if(err)
            return res.status(401).send({ error: 'Token inválido' });
        //se for um token vlido
        req.userId = decoded.id;
        return next();
    });
};