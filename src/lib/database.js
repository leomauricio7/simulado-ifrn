const mongoose = require('mongoose');

mongoose.connect('mongodb://teste:teste@ds131963.mlab.com:31963/teste', { useNewUrlParser: true});
mongoose.Promise = global.Promise;

const statusDB = mongoose.connection;

statusDB.on('error', console.error.bind(console, 'connection error:'));
statusDB.once('open', function() {
  console.log('Conectado ao mongoLab com sucesso!');
});


module.exports = mongoose;